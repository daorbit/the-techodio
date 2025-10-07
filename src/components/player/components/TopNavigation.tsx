/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "@mui/material";
import { TrackInfo } from "./TrackInfo";

interface TopNavigationProps {
  onBack: () => void;
  track: any;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onBack,
  track,
}) => {
  return (
    <div className="top-navigation">
      <IconButton onClick={onBack} className="back-btn" aria-label="Go back">
        <ArrowLeft size={22} />
      </IconButton>
      <div className="right-content">
        <TrackInfo track={track} />
      </div>
    </div>
  );
};
