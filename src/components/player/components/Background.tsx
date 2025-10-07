import React from 'react';
import type { AudioTrack } from '../types';

interface BackgroundProps {
  track?: AudioTrack;
}

export const Background: React.FC<BackgroundProps> = ({ track }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "data:image/svg+xml," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#667eea"/>
          <circle cx="200" cy="150" r="60" fill="white" opacity="0.8"/>
          <polygon points="180,120 180,180 220,150" fill="#667eea"/>
        </svg>
      `);
  };

  return (
    <div className="background-container">
      <img
        src={track?.thumbnail || "data:image/svg+xml," +
          encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
              <rect width="400" height="300" fill="#667eea"/>
              <circle cx="200" cy="150" r="60" fill="white" opacity="0.8"/>
              <polygon points="180,120 180,180 220,150" fill="#667eea"/>
            </svg>
          `)}
        alt={track?.title || "Loading..."}
        className="background-image"
        onError={handleImageError}
      />
      <div className="background-overlay"></div>
    </div>
  );
};