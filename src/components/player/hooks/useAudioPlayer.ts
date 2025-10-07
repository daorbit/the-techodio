import { useRef, useEffect, useCallback, useState } from 'react';
import type { AudioTrack, AudioPlayerState } from '../types';

interface UseAudioPlayerProps {
  track: AudioTrack | undefined;
}

export const useAudioPlayer = ({ track }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoading: true,
    buffered: 0,
  });

  // Debounced time update to improve performance for large files
  const updateCurrentTime = useCallback((time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const formatTime = useCallback((time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (state.isPlaying) {
        audioRef.current.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
      } else {
        await audioRef.current.play();
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.isPlaying]);

  const handleSeek = useCallback((time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    updateCurrentTime(time);
  }, [updateCurrentTime]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    const newMutedState = !state.isMuted;
    audioRef.current.volume = newMutedState ? 0 : state.volume;
    setState(prev => ({ ...prev, isMuted: newMutedState }));
  }, [state.isMuted, state.volume]);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;

    const clampedVolume = Math.max(0, Math.min(1, volume));
    audioRef.current.volume = clampedVolume;
    setState(prev => ({ 
      ...prev, 
      volume: clampedVolume,
      isMuted: clampedVolume === 0
    }));
  }, []);

  const skipForward = useCallback((seconds: number = 15) => {
    console.log('Skip forward called', seconds);
    if (!audioRef.current) {
      console.log('Skip forward blocked: no audio ref');
      return;
    }
    
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || state.duration;
    const newTime = Math.min(currentTime + seconds, duration);
    console.log('Skip forward: from', currentTime, 'to', newTime, 'duration:', duration);
    
    audioRef.current.currentTime = newTime;
    updateCurrentTime(newTime);
  }, [state.duration, updateCurrentTime]);

  const skipBackward = useCallback((seconds: number = 15) => {
    console.log('Skip backward called', seconds);
    if (!audioRef.current) {
      console.log('Skip backward blocked: no audio ref');
      return;
    }
    
    const currentTime = audioRef.current.currentTime;
    const newTime = Math.max(currentTime - seconds, 0);
    console.log('Skip backward: from', currentTime, 'to', newTime);
    
    audioRef.current.currentTime = newTime;
    updateCurrentTime(newTime);
  }, [updateCurrentTime]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;

    // Reset audio element and state when track changes
    audio.currentTime = 0;
    setState(prev => ({
      ...prev,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      isLoading: true,
      buffered: 0,
    }));

    const handleLoadedMetadata = () => {
      setState(prev => ({ 
        ...prev, 
        duration: audio.duration,
        currentTime: 0, // Ensure we start from 0
        isLoading: false 
      }));
    };

    const handleTimeUpdate = () => {
      updateCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setState(prev => ({ 
        ...prev, 
        isPlaying: false,
        currentTime: 0 
      }));
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setState(prev => ({ ...prev, isLoading: false }));
    };

    const handleLoadStart = () => {
      console.log('Audio loading started');
      setState(prev => ({ 
        ...prev, 
        isLoading: true,
        currentTime: 0 // Reset to 0 when loading starts
      }));
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setState(prev => ({ ...prev, isLoading: false }));
    };

    const handleWaiting = () => {
      console.log('Audio waiting/buffering');
      setState(prev => ({ ...prev, isLoading: true }));
    };

    const handleCanPlayThrough = () => {
      console.log('Audio can play through');
      setState(prev => ({ ...prev, isLoading: false }));
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const buffered = audio.buffered.end(audio.buffered.length - 1);
        setState(prev => ({ ...prev, buffered }));
      }
    };

    // Add event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("progress", handleProgress);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("progress", handleProgress);
    };
  }, [track, updateCurrentTime]);

  return {
    audioRef,
    state,
    actions: {
      togglePlayPause,
      handleSeek,
      toggleMute,
      setVolume,
      skipForward,
      skipBackward,
    },
    utils: {
      formatTime,
    },
  };
};