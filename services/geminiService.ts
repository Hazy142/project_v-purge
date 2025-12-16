import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TrendData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchGamingTrends = async (): Promise<TrendData[]> => {
  try {
    // Phase 1 A.1 Simulation: Using Google Search to find ACTUAL relevant target data
    // to populate the dashboard with real-world context for the Master's study.
    const model = 'gemini-2.5-flash';
    const prompt = `
      Search for current online discussions (last 7 days) on Reddit and gaming forums regarding:
      1. Young gamers (12-25) complaining about V-Bucks prices or looking for free in-game currency.
      2. New scams targeting Fortnite or Clash Royale players.
      3. Trends in "whale" behavior among teenagers.
      
      Return a summary of 3 distinct, real topics found. 
      Format the output strictly as a JSON array of objects with keys: "title", "source", "snippet", "url".
      Ensure the response is valid raw JSON. Do not include markdown formatting or backticks.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType cannot be used with tools in the current API version
      },
    });

    let text = response.text;
    if (!text) return [];

    // Clean up potential markdown formatting if the model adds it despite instructions
    text = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

    try {
      const parsed = JSON.parse(text);
      // Validate structure loosely
      if (Array.isArray(parsed)) {
        return parsed as TrendData[];
      }
      return [];
    } catch (e) {
      console.error("JSON Parse error in Gemini response", e);
      return [];
    }

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [
      {
        title: "Connection Error: V-PURGE Network Offline",
        source: "System Internal",
        snippet: "Unable to retrieve live intelligence from surface web.",
        url: "#"
      }
    ];
  }
};

export const analyzeTargetCraving = async (profileText: string): Promise<string> => {
    // Simulating Phase A.3 Intelligence
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this chat snippet from a target (12-25yo gamer): "${profileText}". 
            Identify the level of craving for in-game currency (Low/Medium/High/Extreme) and psychological vulnerability. Keep it brief, technical, and clinical.`
        });
        return response.text || "Analysis Failed";
    } catch (e) {
        return "Gemini Analysis Offline";
    }
}