import { TrendData } from "../types";

const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || "";
const API_URL = "https://api.perplexity.ai/chat/completions";

export const fetchGamingTrends = async (): Promise<TrendData[]> => {
  if (!API_KEY) {
      console.error("Perplexity API Key missing. Please set VITE_PERPLEXITY_API_KEY in .env");
      return [];
  }

  try {
    const prompt = `
      Search for current online discussions (last 7 days) on Reddit, Discord public servers (if accessible), and gaming forums regarding:
      1. Young gamers (12-25) complaining about V-Bucks prices, Clash Royale Gems, or looking for free in-game currency.
      2. New scams targeting Fortnite or Clash Royale players (e.g., "free skins", "gem generators").
      3. Trends in "whale" behavior among teenagers or high spending reports.

      Return a summary of 3 distinct, real topics/threads found.
      Format the output strictly as a JSON array of objects with keys: "title", "source" (e.g., "Reddit r/FortNiteBR"), "snippet" (a brief summary of the discussion), "url" (link to the source if available, otherwise a search link).
      Ensure the response is valid raw JSON. Do not include markdown formatting or backticks.
    `;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-large-128k-online",
        messages: [
          {
            role: "system",
            content: "You are a data extraction agent for V-PURGE. You find real-time intelligence on gamer spending habits and scams. You output strictly valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
        throw new Error(`Perplexity API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let text = data.choices[0].message.content;

    if (!text) return [];

    // Clean up potential markdown formatting
    text = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed as TrendData[];
      }
      return [];
    } catch (e) {
      console.error("JSON Parse error in Perplexity response", e);
      console.log("Raw text:", text);
      return [];
    }

  } catch (error) {
    console.error("Perplexity Search Error:", error);
    return [
      {
        title: "Connection Error: V-PURGE Perplexity Link Offline",
        source: "System Internal",
        snippet: "Unable to retrieve live intelligence from Perplexity Swarm.",
        url: "#"
      }
    ];
  }
};

export const analyzeTargetCraving = async (profileText: string): Promise<string> => {
    if (!API_KEY) return "Configuration Error: API Key Missing";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "llama-3.1-sonar-small-128k-online",
              messages: [
                {
                    role: "system",
                    content: "You are a psychological profiler analyzing gamer text for spending addiction."
                },
                {
                    role: "user",
                    content: `Analyze this chat snippet from a target (12-25yo gamer): "${profileText}".
                    Identify the level of craving for in-game currency (Low/Medium/High/Extreme) and psychological vulnerability. Keep it brief, technical, and clinical.`
                }
              ]
            })
        });

        if (!response.ok) return "Analysis Failed: API Error";

        const data = await response.json();
        return data.choices[0].message.content || "Analysis Failed";

    } catch (e) {
        return "Perplexity Analysis Offline";
    }
}
