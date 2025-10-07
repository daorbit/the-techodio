import React from "react";
import Lottie from "lottie-react";
import animationData from "../../shared/Animations/twoPeoplePodcast.json";

export const AlbumArt: React.FC = () => {
  return (
    <div style={{ width: '90%' }}>
      <Lottie animationData={animationData} />
    </div>
  );
};
