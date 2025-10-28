import type { AudioTrack } from "../types";
import { fetchTracks } from "../../../services/tracksApiService";
import type { Track } from "../../../utils/playlistData";

let tracksCache: Track[] | null = null;
 
export class AudioTrackService {
  static async getAllTracksFromAPI(): Promise<Track[]> {
    if (!tracksCache) {
      try {
        const { tracks } = await fetchTracks(1, 100);
        tracksCache = tracks;
      } catch (error) {
        console.error("Error fetching tracks from API:", error);
        return [];
      }
    }
    return tracksCache;
  }

  static async getTrackById(id: string): Promise<AudioTrack | undefined> {
    const tracks = await this.getAllTracksFromAPI();
    const track = tracks.find((t) => t.id === id);
    if (!track) return undefined;

    return {
      id: track.id,
      title: track.title,
      author: track.author,
      description: track.description,
      duration: track.duration,
      listeners: track.listeners,
      date: track.date,
      thumbnail: track.thumbnail,
      category: track.category,
      audioUrl: track.audioUrl,
    };
  }

  static async getAllTracks(): Promise<AudioTrack[]> {
    const tracks = await this.getAllTracksFromAPI();
    return tracks.map(track => ({
      id: track.id,
      title: track.title,
      author: track.author,
      description: track.description,
      duration: track.duration,
      listeners: track.listeners,
      date: track.date,
      thumbnail: track.thumbnail,
      category: track.category,
      audioUrl: track.audioUrl,
    }));
  }
}
