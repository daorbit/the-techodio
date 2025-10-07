import { useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  setPlaying,
  setCurrentTime,
  setDuration,
  setLoading,
  setBuffered,
  resetAudioState,
  setPendingPlay,
} from '../store/audioSlice';

export const useGlobalAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    isMuted,
    pendingPlay,
  } = useAppSelector((state) => state.audio);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
      audioRef.current.crossOrigin = 'anonymous';
    }

    return () => {
      // Don't destroy the audio element on unmount
    };
  }, []);

  // Sync audio source with current track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audioUrl) return;

    if (audio.src !== currentTrack.audioUrl) {
      console.log('Setting audio source:', currentTrack.audioUrl);
      audio.src = currentTrack.audioUrl;
      dispatch(resetAudioState());
    }
  }, [currentTrack, dispatch]);

  // Sync playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
      
      // If we were supposed to be playing, start playing now that metadata is loaded
      if (isPlaying || pendingPlay) {
        dispatch(setPlaying(true));
        dispatch(setPendingPlay(false));
        audio.play().catch((error) => {
          console.error('Error playing audio after metadata loaded:', error);
        });
      }
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
      
      // If we were supposed to be playing, start playing now that audio is ready
      if (isPlaying || pendingPlay) {
        dispatch(setPlaying(true));
        dispatch(setPendingPlay(false));
        audio.play().catch((error) => {
          console.error('Error playing audio after can play:', error);
        });
      }
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
  }, [currentTrack, currentTime, dispatch, isPlaying, pendingPlay]);

  return audioRef;
};