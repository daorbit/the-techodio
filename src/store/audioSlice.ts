import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AudioTrack } from '../components/player/types';

export interface AudioPlayerState {
  // Current track
  currentTrack: AudioTrack | null;
  // Playback state
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  buffered: number;
  // Mini player visibility
  showMiniPlayer: boolean;
  // Pending play for when audio is ready
  pendingPlay: boolean;
}

const initialState: AudioPlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isLoading: true,
  buffered: 0,
  showMiniPlayer: false,
  pendingPlay: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<AudioTrack | null>) => {
      state.currentTrack = action.payload;
      // Reset playback state when track changes
      if (action.payload) {
        state.currentTime = 0;
        state.duration = 0;
        state.isPlaying = false;
        state.isLoading = true;
        state.buffered = 0;
        state.pendingPlay = false;
      }
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
      state.isLoading = false;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      state.isMuted = action.payload === 0;
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBuffered: (state, action: PayloadAction<number>) => {
      state.buffered = action.payload;
    },
    setShowMiniPlayer: (state, action: PayloadAction<boolean>) => {
      state.showMiniPlayer = action.payload;
    },
    setPendingPlay: (state, action: PayloadAction<boolean>) => {
      state.pendingPlay = action.payload;
    },
    resetAudioState: (state) => {
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
      state.isLoading = true;
      state.buffered = 0;
    },
    resetAllAudioState: (state) => {
      // Reset all audio state to initial values
      state.currentTrack = null;
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
      state.volume = 1;
      state.isMuted = false;
      state.isLoading = true;
      state.buffered = 0;
      state.showMiniPlayer = false;
      state.pendingPlay = false;
    },
  },
});

export const {
  setCurrentTrack,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setMuted,
  setLoading,
  setBuffered,
  setShowMiniPlayer,
  setPendingPlay,
  resetAudioState,
  resetAllAudioState,
} = audioSlice.actions;

export default audioSlice.reducer;