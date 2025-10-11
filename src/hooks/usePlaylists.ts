import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPlaylistsAsync } from '../store/playlistsSlice';

export const usePlaylists = (page: number = 1, limit: number = 10) => {
  const dispatch = useAppDispatch();
  const { playlists, pagination, loading, error, loaded } = useAppSelector((state) => state.playlists);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(fetchPlaylistsAsync({ page, limit }));
    }
  }, [dispatch, loaded, loading, page, limit]);

  return { playlists, pagination, loading, error };
};

export const usePlaylist = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const { playlists, loading, error, loaded } = useAppSelector((state) => state.playlists);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(fetchPlaylistsAsync({ page: 1, limit: 100 })); // Fetch all to find by id
    }
  }, [dispatch, loaded, loading]);

  const playlist = id ? playlists.find(p => p.id === id) || null : null;

  return { playlist, loading, error };
};