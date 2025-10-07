import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { AudioTrackService } from "./services/audioTrackService";
import type { AudioTrack } from "./types";
import {
  setCurrentTrack,
  setPlaying,
  setCurrentTime,
  setMuted,
} from "../../store/audioSlice";

// Lazy load components for better performance
const TopNavigation = React.lazy(() =>
  import("./components/TopNavigation").then((m) => ({
    default: m.TopNavigation,
  }))
);
const AlbumArt = React.lazy(() =>
  import("./components/AlbumArt").then((m) => ({ default: m.AlbumArt }))
);

const ProgressBar = React.lazy(() =>
  import("./components/ProgressBar").then((m) => ({ default: m.ProgressBar }))
);
const ControlPanel = React.lazy(() =>
  import("./components/ControlPanel").then((m) => ({ default: m.ControlPanel }))
);
const ErrorState = React.lazy(() =>
  import("./components/ErrorState").then((m) => ({ default: m.ErrorState }))
);

import "./AudioPlayer.css";

const AudioPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [track, setTrack] = useState<AudioTrack | undefined>(undefined);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(true);

  const { isPlaying, currentTime, duration, volume, isMuted, isLoading, buffered, currentTrack } = useAppSelector(
    (state) => state.audio
  );

  const formatTime = (time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Load track data
  useEffect(() => {
    const loadTrack = async () => {
      if (!id) {
        setTrackError("No track ID provided");
        setIsLoadingTrack(false);
        return;
      }

      // If currentTrack is already loaded and matches the ID, use it directly
      if (currentTrack && currentTrack.id === id) {
        setTrack(currentTrack);
        setIsLoadingTrack(false);
        return;
      }

      try {
        setIsLoadingTrack(true);
        setTrackError(null);

        const foundTrack = await AudioTrackService.getTrackById(id);
        if (!foundTrack) {
          setTrackError("Track not found in library");
          setIsLoadingTrack(false);
          return;
        }

        // For direct URL access, we'll validate the audio URL but be more lenient
        if (foundTrack.audioUrl) {
          try {
            const isValidUrl = await AudioTrackService.validateAudioUrl(
              foundTrack.audioUrl
            );
            if (!isValidUrl) {
              console.warn(
                "Audio URL validation failed, but proceeding with track load"
              );
              // We'll still proceed to load the track and let the audio element handle errors
            }
          } catch (validationError) {
            console.warn(
              "Audio URL validation threw error, but proceeding:",
              validationError
            );
            // Continue with track loading even if validation fails
          }
        }

        setTrack(foundTrack);
        dispatch(setCurrentTrack(foundTrack));
        setIsLoadingTrack(false);
      } catch (error) {
        console.error("Failed to load track:", error);
        setTrackError("Failed to load track. Please try again.");
        setIsLoadingTrack(false);
      }
    };

    loadTrack();
  }, [id, dispatch, currentTrack]);

  const handleSeek = (time: number) => {
    dispatch(setCurrentTime(time));
  };

  const togglePlayPause = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const skipForward = () => {
    const newTime = Math.min(currentTime + 15, duration);
    dispatch(setCurrentTime(newTime));
  };

  const skipBackward = () => {
    const newTime = Math.max(currentTime - 15, 0);
    dispatch(setCurrentTime(newTime));
  };

  const toggleMute = () => {
    dispatch(setMuted(!isMuted));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoadingTrack) {
    return (
      <div className="fullscreen-audio-player">
        <Suspense fallback={<div>Loading navigation...</div>}>
          <TopNavigation onBack={handleBack} track={track} />
        </Suspense>

        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading audio track...</p>
          <p className="loading-subtext">
            Preparing audio player for direct access
          </p>
        </div>
      </div>
    );
  }

  if (trackError) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorState onBack={handleBack} error={trackError} />
      </Suspense>
    );
  }

  // Safety check - if no track and not loading, show error
  if (!track) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorState onBack={handleBack} error="Track data unavailable" />
      </Suspense>
    );
  }

  return (
    <div className="fullscreen-audio-player">
      <div
        className="blurred-background"
        style={{
          backgroundImage: `url(${track.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <Suspense fallback={<div>Loading navigation...</div>}>
        <TopNavigation onBack={handleBack} track={track} />
      </Suspense>

      <div className="content-overlay">
        <div className="left-content">
          <Suspense fallback={<div>Loading album art...</div>}>
            <AlbumArt />
          </Suspense>
        </div>
      </div>

      <div className="bottom-controls">
        <Suspense fallback={<div>Loading progress...</div>}>
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            buffered={buffered}
            isLoading={isLoading}
            onSeek={handleSeek}
            formatTime={formatTime}
          />
        </Suspense>

        <Suspense fallback={<div>Loading controls...</div>}>
          <ControlPanel
            state={{
              isPlaying,
              currentTime,
              duration,
              volume,
              isMuted,
              isLoading,
              buffered,
            }}
            onTogglePlayPause={togglePlayPause}
            onSkipBackward={skipBackward}
            onSkipForward={skipForward}
            onToggleMute={toggleMute}
            disabled={isLoading || !track?.audioUrl}
          />
        </Suspense>
      </div>

      {isLoading && (
        <div className="audio-loading-overlay">
          <div className="audio-loading-content">
            <div className="loading-spinner"></div>
            <p className="loading-text">Preparing audio...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
