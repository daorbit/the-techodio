// API service for fetching tracks from the backend

import type { Track } from '../utils/playlistData';

export interface ApiTrack {
  _id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  trending: boolean;
  audioUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    tracks: ApiTrack[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Mapper function
export const mapApiTrackToTrack = (apiTrack: ApiTrack): Track => ({
  id: apiTrack._id,
  title: apiTrack.title,
  author: apiTrack.author,
  description: apiTrack.description,
  duration: apiTrack.duration,
  listeners: apiTrack.listeners,
  date: apiTrack.date,
  thumbnail: apiTrack.thumbnail,
  category: apiTrack.category,
  audioUrl: apiTrack.audioUrl,
  trending: apiTrack.trending,
});

const API_BASE_URL = 'https://da-pages-be.vercel.app/api';

export const fetchTracks = async (page: number = 1, limit: number = 10): Promise<{ tracks: Track[], pagination: PaginationInfo }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    if (!data.success || !data.data) {
      throw new Error('API returned invalid response');
    }
    return {
      tracks: data.data.tracks.map(mapApiTrackToTrack),
      pagination: data.data.pagination
    };
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

export const fetchTrackById = async (id: string): Promise<Track | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: { success: boolean; data: { track: ApiTrack } } = await response.json();
    if (!data.success || !data.data.track) {
      return null;
    }
    return mapApiTrackToTrack(data.data.track);
  } catch (error) {
    console.error('Error fetching track:', error);
    throw error;
  }
};