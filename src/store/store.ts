import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './audioSlice';
import playlistsReducer from './playlistsSlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    playlists: playlistsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable state check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;