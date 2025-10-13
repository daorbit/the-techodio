import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Playlist } from '../utils/playlistData';
import { fetchPlaylists, type PaginationInfo } from '../services/playlistApiService';

interface PlaylistsState {
  playlists: Playlist[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: PlaylistsState = {
  playlists: [],
  pagination: null,
  loading: false,
  error: null,
  loaded: false,
};

export const fetchPlaylistsAsync = createAsyncThunk(
  'playlists/fetchPlaylists',
  async ({ page, limit }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const result = await fetchPlaylists(page, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch playlists');
    }
  }
);

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistsAsync.fulfilled, (state, action: PayloadAction<{ playlists: Playlist[]; pagination: PaginationInfo }>) => {
        state.loading = false;
        state.playlists = action.payload.playlists;
        state.pagination = action.payload.pagination;
        state.loaded = true;
      })
      .addCase(fetchPlaylistsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.loaded = true;
      });
  },
});

export default playlistsSlice.reducer;