import React, { useState } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { Sparkles, Play, Pause, X } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";
import { getTrackSuggestions } from "../services/geminiService";
import type { Track } from "../utils/playlistData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setCurrentTrack,
  setShowMiniPlayer,
  setPendingPlay,
  setPlaying,
} from "../store/audioSlice";
import Lottie from "lottie-react";
import audioSearchingAnimation from "../components/shared/Animations/audioSearchingAnimation.json";

interface AISuggestionsProps {
  collapsed?: boolean;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ collapsed = false }) => {
  const { isDarkMode } = useThemeContext();
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.audio);
  const [suggestions, setSuggestions] = useState<Track[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add sparkle animation styles
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sparkle {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const suggestedTracks = await getTrackSuggestions();
      setSuggestions(suggestedTracks);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      setError("No suggestions from AI. Try again.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (showSuggestions) {
      setShowSuggestions(false);
      setError(null);
    } else {
      handleGetSuggestions();
    }
  };

  const handleSelectTrack = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setPendingPlay(true));
    dispatch(setShowMiniPlayer(true));
  };

  const handlePlayPause = (track: Track, event: React.MouseEvent) => {
    event.stopPropagation();
    if (currentTrack?.id === track.id) {
      dispatch(setPlaying(!isPlaying));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setPendingPlay(true));
      dispatch(setShowMiniPlayer(true));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #00e5ff 0%, #1976d2 50%, #ff6b6b 100%)",
          p: "1px",
          "&:hover": {
            background:
              "linear-gradient(135deg, #00e5ff 0%, #4ecdc4 50%, #f093fb 100%)",
          },
          transition: "all 0.3s ease",
          mt: 8,
        }}
      >
        <Box
          onClick={handleButtonClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : 2,
            opacity: loading ? 0.6 : 1,
            borderRadius: 3,
            p: 1.5,
            cursor: "pointer",
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.9)"
              : "rgba(255,255,255,0.95)",

            transition: "all 0.3s ease",
          }}
        >
          {showSuggestions ? (
            <X size={20} color={isDarkMode ? "#fff" : "#000"} />
          ) : (
            <Sparkles size={20} />
          )}
          {!collapsed && (
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? "#fff" : "#000",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {loading
                ? "Getting suggestions..."
                : showSuggestions
                ? "Close suggestions"
                : "AI Suggestions"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Loading Animation */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Lottie
            animationData={audioSearchingAnimation}
            loop={true}
            style={{ width: 90, height: 90 }}
          />
        </Box>
      )}

      {/* Error Message */}
      {error && !loading && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#ff6b6b" : "#d32f2f",
              fontSize: 14,
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <Collapse in={showSuggestions} timeout="auto" unmountOnExit>
          <Box
            sx={{
              my: 3,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {suggestions.map((track) => {
                const isCurrentTrack = currentTrack?.id === track.id;
                const showPauseIcon = isCurrentTrack && isPlaying;

                return (
                  <Box
                    key={track.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      backgroundColor: isCurrentTrack
                        ? isDarkMode
                          ? "rgba(0,229,255,0.1)"
                          : "rgba(25,118,210,0.1)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      },
                    }}
                    onClick={() => handleSelectTrack(track)}
                  >
                    <Box sx={{ position: "relative", mr: 1.5 }}>
                      <img
                        // component="img"
                        src={track.thumbnail}
                        alt={track.title}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          objectFit: "cover",
                          marginTop: 2,
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 20,
                          height: 20,
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.9)",
                          },
                        }}
                        onClick={(e) => handlePlayPause(track, e)}
                      >
                        {showPauseIcon ? (
                          <Pause size={10} />
                        ) : (
                          <Play size={10} />
                        )}
                      </IconButton>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? "#fff" : "#000",
                          fontSize: "0.8rem",
                          fontWeight: isCurrentTrack ? 600 : 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineHeight: 1.2,
                        }}
                      >
                        {track.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode ? "#ccc" : "#666",
                          fontSize: "0.7rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineHeight: 1.2,
                        }}
                      >
                        {track.author}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default AISuggestions;
