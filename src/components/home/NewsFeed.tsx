import {  ChevronDown, ChevronUp, Loader2, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge";
import type { NewsItem } from "../../Trenchboard";


const INITIAL_VISIBLE = 6;

interface NewsFeedProp {
    loading: boolean,
   news: NewsItem[],
   searchQuery: string,
    showAll:boolean,
    setShowAll: (value: boolean)=> void,
    setSearchQuery: (value: string)=> void
   
}
const NewsFeed=({loading,searchQuery,news,showAll, setShowAll,setSearchQuery }: NewsFeedProp)=>{
      
       
    const filteredNews = news.filter((item) =>
    item.headline.toLowerCase().includes(searchQuery.toLowerCase()) || item.topic.toLowerCase().includes(searchQuery.toLowerCase()))

    const visibleNews = showAll ? filteredNews : filteredNews.slice(0, INITIAL_VISIBLE);
      const hasMore = filteredNews.length > INITIAL_VISIBLE;

    

    
  ;
    return(
        <div className="lg:col-span-3">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-[#22C55E]" size={48} />
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Processing Market Data</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleNews.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-[#1E293B]/30 border border-white/5 p-6 rounded-2xl hover:bg-[#1E293B]/50 hover:border-[#22C55E]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border-0">
                        {item.topic}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.sentiment === "BULLISH"
                              ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                              : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-bold tracking-widest uppercase ${
                            item.sentiment === "BULLISH" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-white transition-colors">
                      {item.headline}
                    </h3>

                    <p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed italic">
                      "{item.summary}"
                    </p>

                    <div className="pt-4 border-t border-white/5">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-[#22C55E] hover:text-[#4ade80] transition-colors flex items-center gap-1 uppercase tracking-tighter"
                      >
                        Original Filing Data <span className="text-lg leading-none">→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

             
              {hasMore && (
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2 h-12 font-bold uppercase tracking-widest text-xs"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      See More ({filteredNews.length - INITIAL_VISIBLE} more) <ChevronDown size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
              <Search className="text-slate-700 mb-4" size={48} />
              <p className="text-slate-500 text-lg">
                No matches for <span className="text-white font-bold">"{searchQuery}"</span>
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#22C55E] text-sm font-bold uppercase hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
    )
}

export default NewsFeed