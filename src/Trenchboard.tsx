import { useEffect, useState } from "react";
import { processTrendNews } from "./lib/news-engine";
import Header from "./components/home/Header";
import NewsFeed from "./components/home/NewsFeed";
import SideChart from "./components/home/SideChart";

const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;

// Types
export interface NewsItem {
  id: string | number;
  headline: string;
  topic: string;
  sentiment: "BULLISH" | "BEARISH";
  summary: string;
  url: string;
  related?: string;
}

export interface ChartDataItem {
  name: string;
  count: number;
}

export default function TrendBoard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

      
        const res = await fetch(
          `https://finnhub.io/api/v1/news?category=merger&token=${FINNHUB_KEY}`
        );
        
        let raw = await res.json();
        
       
        if (!raw || raw.length === 0) {
          const fallbackRes = await fetch(
            `https://finnhub.io/api/v1/news?category=top news&token=${FINNHUB_KEY}`
          );
          raw = await fallbackRes.json();
        }

        const processed: NewsItem[] = await Promise.all(
          raw.slice(0, 15).map(processTrendNews)
        );

        setNews(processed);

       
        const counts = processed.reduce<Record<string, number>>((acc, item) => {
          const key = item.topic || "General Market";
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        setChartData(
          Object.keys(counts).map((key) => ({ 
            name: key, 
            count: counts[key] 
          }))
        );
      } catch (error) {
        console.error("Dashboard topic fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <div className="min-h-screen bg-[#090E1A] text-white p-6 selection:bg-[#22C55E]/30">
      <Header 
        searchQuery={searchQuery} 
        setShowAll={setShowAll} 
        setSearchQuery={setSearchQuery} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <NewsFeed 
          news={news} 
          loading={loading} 
          setSearchQuery={setSearchQuery} 
          setShowAll={setShowAll} 
          searchQuery={searchQuery} 
          showAll={showAll} 
        />

        <SideChart chartData={chartData} />
      </div>
    </div>
  );
}