import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Track } from '../utils/playlistData';
import { fetchTracks, type PaginationInfo } from '../services/tracksApiService';

interface TracksState {
  tracks: Track[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: TracksState = {
  tracks: [],
  pagination: null,
  loading: false,
  error: null,
  loaded: false,
};

export const fetchTracksAsync = createAsyncThunk(
  'tracks/fetchTracks',
  async ({ page, limit }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const result = await fetchTracks(page, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tracks');
    }
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracksAsync.fulfilled, (state, action: PayloadAction<{ tracks: Track[]; pagination: PaginationInfo }>) => {
        state.loading = false;
        state.tracks = action.payload.tracks;
        state.pagination = action.payload.pagination;
        state.loaded = true;
      })
      .addCase(fetchTracksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tracksSlice.reducer;