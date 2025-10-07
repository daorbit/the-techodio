import React, { useCallback } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  isLoading: boolean;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  buffered,
  isLoading,
  onSeek,
  formatTime,
}) => {
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    onSeek(time);
  }, [onSeek]);

  // Ensure we don't show progress when there's no valid duration
  const safeDuration = duration > 0 ? duration : 100;
  const safeCurrentTime = duration > 0 ? currentTime : 0;
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <>
      <div className="progress-container">
        <div 
          className="progress-buffer" 
          style={{ width: `${bufferedPercentage}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min="0"
          max={safeDuration}
          value={safeCurrentTime}
          onChange={handleSeek}
          onInput={handleSeek}
          className="progress-slider"
          disabled={isLoading}
          step="0.1"
          aria-label="Seek audio position"
          style={{
            background: `linear-gradient(to right, #20B2AA 0%, #20B2AA ${progressPercentage}%, rgba(255, 255, 255, 0.3) ${progressPercentage}%, rgba(255, 255, 255, 0.3) 100%)`
          }}
        />
      </div>
      <div className="time-display-container">
        <span className="current-time" aria-label="Current time">
          {formatTime(safeCurrentTime) || "0:00"} / {formatTime(duration) || "0:00"}
        </span>
      </div>
    </>
  );
};