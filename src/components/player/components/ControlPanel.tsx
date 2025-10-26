import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CircularProgress } from '@mui/material';
import type { AudioPlayerState } from '../types';

interface ControlPanelProps {
  state: AudioPlayerState;
  onTogglePlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onToggleMute: () => void;
  disabled?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  onTogglePlayPause,
  onSkipBackward,
  onSkipForward,
  onToggleMute,
  disabled = false,
}) => {
  const { isPlaying, isLoading, isMuted } = state;

  return (
    <div className="control-panel">
      <div className="left-controls">
        <button 
          onClick={onToggleMute} 
          className="volume-btn"
          aria-label={isMuted ? "Unmute" : "Mute"}
          disabled={disabled}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <div className="main-controls">
        <button 
          onClick={() => {
            console.log('Skip backward button clicked');
            onSkipBackward();
          }}
          className="skip-btn"
          aria-label="Skip backward 15 seconds"
          disabled={disabled}
        >
          <SkipBack size={20} />
        </button>
        
        <button
          onClick={onTogglePlayPause}
          className="play-pause-btn"
          disabled={isLoading || disabled}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} />
          )}
        </button>
        
        <button 
          onClick={() => {
            console.log('Skip forward button clicked');
            onSkipForward();
          }}
          className="skip-btn"
          aria-label="Skip forward 15 seconds"
          disabled={disabled}
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};