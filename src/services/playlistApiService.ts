// API service for fetching playlists from the backend

import type { Playlist, Track } from '../utils/playlistData';

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
  audioUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiPlaylist {
  _id: string;
  title: string;
  description: string;
  trackCount: number;
  duration: string;
  thumbnail: string;
  createdBy: string;
  tracks: ApiTrack[];
  isPublic: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    playlists: ApiPlaylist[];
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

// Mapper functions
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
});

export const mapApiPlaylistToPlaylist = (apiPlaylist: ApiPlaylist): Playlist => ({
  id: apiPlaylist._id,
  title: apiPlaylist.title,
  description: apiPlaylist.description,
  trackCount: apiPlaylist.tracks ? apiPlaylist.tracks.length : 0,
  duration: apiPlaylist.duration,
  thumbnail: apiPlaylist.thumbnail,
  createdBy: apiPlaylist.createdBy,
  createdAt: apiPlaylist.createdAt,
  tracks: apiPlaylist.tracks ? apiPlaylist.tracks.map(mapApiTrackToTrack) : [],
  isPublic: apiPlaylist.isPublic,
  tags: apiPlaylist.tags || [],
});

const API_BASE_URL = 'https://da-pages-be.vercel.app/api';

export const fetchPlaylists = async (page: number = 1, limit: number = 10): Promise<{ playlists: Playlist[], pagination: PaginationInfo }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    if (!data.success || !data.data) {
      throw new Error('API returned invalid response');
    }
    return {
      playlists: data.data.playlists.map(mapApiPlaylistToPlaylist),
      pagination: data.data.pagination
    };
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const fetchPlaylistById = async (id: string): Promise<Playlist | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    if (!data.success || data.data.playlists.length === 0) {
      return null;
    }
    return mapApiPlaylistToPlaylist(data.data.playlists[0]);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};