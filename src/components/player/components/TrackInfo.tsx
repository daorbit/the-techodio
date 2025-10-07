import React from "react";
import type { AudioTrack } from "../types";

interface TrackInfoProps {
  track: AudioTrack;
  className?: string;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({
  track,
  className = "",
}) => {
  return (
    <div className={`track-details ${className}`}>
      <h1 className="track-title">{track?.title}</h1>
    </div>
  );
};

interface MobileTrackInfoProps {
  track: AudioTrack;
}

export const MobileTrackInfo: React.FC<MobileTrackInfoProps> = ({ track }) => {
  return (
    <div className="mobile-track-info">
      <h2 className="mobile-track-title">{track?.title}</h2>
    </div>
  );
};
