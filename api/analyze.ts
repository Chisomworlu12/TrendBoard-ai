export interface RawArticle {
  id: number;
  headline: string;
  summary: string;
  url: string;
}

type Sentiment = "BULLISH" | "BEARISH";
type Topic = "Technology" | "Energy" | "Market" | "General";

export interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  sentiment: Sentiment;
  topic: Topic;
  url: string;
}

interface AIResponse {
  summary?: string;
  sentiment?: Sentiment;
  topic?: Topic;
}

export async function processTrendNews(article: RawArticle): Promise<NewsItem> {
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headline: article.headline, summary: article.summary }),
    });

    const aiRes: AIResponse = await res.json();

    return {
      id: article.id,
      headline: article.headline,
      url: article.url,
      summary: aiRes.summary ?? article.summary,
      sentiment: aiRes.sentiment ?? "BULLISH",
      topic: aiRes.topic ?? "General",
    };
  } catch (e) {
    console.error("AI processing failed:", e);

    return {
      id: article.id,
      headline: article.headline,
      summary: article.summary,
      sentiment: "BULLISH",
      topic: "General",
      url: article.url,
    };
  }
}