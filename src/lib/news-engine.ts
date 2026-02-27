import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Types

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Summarize this news in 1 sentence. Return JSON only:
{ "summary": "...", "sentiment": "BULLISH" | "BEARISH", "topic": "Technology" | "Energy" | "Market" | "General" }`,
        },
        { role: "user", content: article.headline },
      ],
      response_format: { type: "json_object" },
    });

    const aiRes: AIResponse = JSON.parse(
      completion.choices[0].message.content ?? "{}"
    );

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