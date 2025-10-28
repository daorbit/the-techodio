import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Track } from "../utils/playlistData";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY not found in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const getTrackSuggestions = async (tracks: Track[]): Promise<Track[]> => {
  if (!API_KEY) {
    throw new Error(
      "Gemini API key not available. Unable to generate AI suggestions."
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const tracksList = tracks
      .map((track) => `${track.title} by ${track.author} (${track.category})`)
      .join("\n");

    const prompt = `Based on the following list of tracks, suggest exactly 3 tracks that would make a great listening sequence. Consider variety in genres and artists. Return ONLY a JSON array of the exact track titles from the list, like: ["Track Title 1", "Track Title 2", "Track Title 3"]

Available tracks:
${tracksList}

Return only the JSON array, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    let suggestedTitles: string[] = [];
    try {
      suggestedTitles = JSON.parse(text);
      if (!Array.isArray(suggestedTitles)) {
        throw new Error("Response is not an array");
      }
    } catch (parseError) {
      console.warn(
        "Failed to parse AI response as JSON, falling back to text parsing:",
        parseError
      );
      suggestedTitles = text
        .split(",")
        .map((title: string) => title.trim().replace(/["[\]]/g, ""));
    }

    const suggestions: Track[] = [];
    for (const title of suggestedTitles) {
      const track = tracks.find(
        (t: Track) =>
          t.title.toLowerCase().includes(title.toLowerCase()) ||
          title.toLowerCase().includes(t.title.toLowerCase())
      );
      if (track && !suggestions.find((s) => s.id === track.id)) {
        suggestions.push(track);
      }
      if (suggestions.length >= 3) break;
    }

    while (suggestions.length < 3) {
      const remaining = tracks.filter(
        (t: Track) => !suggestions.find((s) => s.id === t.id)
      );
      if (remaining.length === 0) break;
      const randomTrack =
        remaining[Math.floor(Math.random() * remaining.length)];
      suggestions.push(randomTrack);
    }

    return suggestions.slice(0, 3);
  } catch (error) {
    console.error("Error getting AI suggestions with gemini-1.5-flash:", error);
    throw new Error("Failed to generate AI suggestions. Please try again.");
  }
};
