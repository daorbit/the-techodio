import React from 'react';

interface ErrorStateProps {
  onBack: () => void;
  error?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  onBack, 
  error = "Track Not Found" 
}) => {
  return (
    <div className="audio-player-error">
      <h2>{error}</h2>
      <button onClick={onBack}>
        Back to Library
      </button>
    </div>
  );
};