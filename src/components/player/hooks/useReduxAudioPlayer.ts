import { useRef, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  setPlaying,
  setCurrentTime,
  setDuration,
  setLoading,
  setBuffered,
  resetAudioState,
} from '../../../store/audioSlice';

export const useReduxAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    isMuted,
  } = useAppSelector((state) => state.audio);

  // Sync audio element with Redux state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sync playing state
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        dispatch(setLoading(false));
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, dispatch]);

  // Sync volume and mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Sync current time (for seeking)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || Math.abs(audio.currentTime - currentTime) > 1) {
      if (audio) {
        audio.currentTime = currentTime;
      }
    }
  }, [currentTime]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audioUrl) return;

    // Reset when track changes
    dispatch(resetAudioState());

    // Set a timeout to stop loading after 10 seconds as fallback
    const loadingTimeout = setTimeout(() => {
      console.log('Loading timeout reached, stopping loading state');
      dispatch(setLoading(false));
    }, 10000);

    const handleLoadedMetadata = () => {
      console.log('Audio loaded metadata, duration:', audio.duration);
      dispatch(setDuration(audio.duration));
      dispatch(setLoading(false));
      clearTimeout(loadingTimeout);
    };

    const handleTimeUpdate = () => {
      // Only update Redux if there's a significant difference to avoid loops
      if (Math.abs(audio.currentTime - currentTime) > 0.5) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    };

    const handleEnded = () => {
      console.log('Audio ended');
      dispatch(setPlaying(false));
      dispatch(setCurrentTime(0));
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      dispatch(setLoading(false));
      clearTimeout(loadingTimeout);
    };

    const handleLoadStart = () => {
      console.log('Audio load start');
      dispatch(setLoading(true));
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      dispatch(setLoading(false));
      clearTimeout(loadingTimeout);
    };

    const handleWaiting = () => {
      console.log('Audio waiting');
      dispatch(setLoading(true));
    };

    const handleCanPlayThrough = () => {
      console.log('Audio can play through');
      dispatch(setLoading(false));
      clearTimeout(loadingTimeout);
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const buffered = audio.buffered.end(audio.buffered.length - 1);
        dispatch(setBuffered(buffered));
      }
    };

    const handleStalled = () => {
      console.log('Audio stalled');
      dispatch(setLoading(true));
    };

    const handleSuspend = () => {
      console.log('Audio suspended');
    };

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('suspend', handleSuspend);

    return () => {
      clearTimeout(loadingTimeout);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('suspend', handleSuspend);
    };
  }, [currentTrack, currentTime, dispatch]);

  const formatTime = useCallback((time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return {
    audioRef,
    formatTime,
  };
};