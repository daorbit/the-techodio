import React, { useState } from "react";
import { Box, Typography, IconButton, Fab } from "@mui/material";
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

const AISuggestions: React.FC = () => {
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
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
      setShowSuggestions(true); // Show panel after getting suggestions
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      setError("No suggestions from AI. Try again.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (suggestions.length === 0 && !showSuggestions) {
      // No suggestions yet, fetch them
      handleGetSuggestions();
    } else {
      // Toggle visibility
      setShowSuggestions(!showSuggestions);
    }
  };

  const handleRemoveSuggestion = (trackId: string) => {
    setSuggestions((prev) => prev.filter((track) => track.id !== trackId));
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
    <>
      {/* Floating Action Button */}
      <Fab
        onClick={handleButtonClick}
        disabled={loading}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: loading
            ? "rgba(0,229,255,0.7)"
            : "linear-gradient(135deg, #00e5ff 0%, #1976d2 50%, #ff6b6b 100%)",
          color: "#fff",
          "&:hover": {
            background: loading
              ? "rgba(0,229,255,0.7)"
              : "linear-gradient(135deg, #00e5ff 0%, #4ecdc4 50%, #f093fb 100%)",
            animation: loading ? "none" : "pulse 0.6s ease-in-out",
          },
          boxShadow: "0 4px 20px rgba(0,229,255,0.3)",
          width: 56,
          height: 56,
          transition: "all 0.3s ease",
        }}
        aria-label="AI Suggestions"
      >
        {loading ? (
          <Box
            sx={{
              width: 24,
              height: 24,
              border: "2px solid rgba(255,255,255,0.3)",
              borderTop: "2px solid #fff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : showSuggestions ? (
          <X size={24} />
        ) : (
          <Sparkles size={24} />
        )}
      </Fab>

      {/* Suggestions Panel */}
      {showSuggestions && (
        <Box
          sx={{
            position: "absolute",
            bottom: 90,
            right: 30,
            width: 320,
            maxHeight: 400,
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.95)"
              : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            overflow: "hidden",
            zIndex: 1001,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: `1px solid ${
                isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sparkles size={20} color={isDarkMode ? "#00e5ff" : "#1976d2"} />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                AI Suggestions
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => {
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              sx={{
                color: isDarkMode ? "#666" : "#999",
                "&:hover": {
                  color: isDarkMode ? "#ff6b6b" : "#d32f2f",
                  backgroundColor: "transparent",
                },
              }}
            >
              <X size={16} />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ maxHeight: 320, overflowY: "auto" }}>
            {/* Loading Animation */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <Lottie
                  animationData={audioSearchingAnimation}
                  loop={true}
                  style={{ width: 120, height: 120 }}
                />
                <Typography sx={{ mt: 2, textAlign: "center" }}>
                  Getting AI suggestions...
                </Typography>
              </Box>
            )}

            {/* Error Message */}
            {error && !loading && (
              <Box sx={{ textAlign: "center", py: 4 }}>
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
            {!loading && !error && suggestions.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  maxHeight: 400,
                  overflowY: "auto",
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
                        p: 1.5,
                        borderRadius: 2,
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
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => handleSelectTrack(track)}
                    >
                      <Box sx={{ position: "relative", mr: 2 }}>
                        <img
                          src={track.thumbnail}
                          alt={track.title}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 24,
                            height: 24,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.9)",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                          onClick={(e) => handlePlayPause(track, e)}
                        >
                          {showPauseIcon ? (
                            <Pause size={12} />
                          ) : (
                            <Play size={12} />
                          )}
                        </IconButton>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDarkMode ? "#fff" : "#000",
                            fontSize: "0.9rem",
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
                            fontSize: "0.75rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            lineHeight: 1.2,
                          }}
                        >
                          {track.author}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        sx={{
                          ml: 1,
                          color: isDarkMode ? "#666" : "#999",
                          "&:hover": {
                            color: isDarkMode ? "#ff6b6b" : "#d32f2f",
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSuggestion(track.id);
                        }}
                      >
                        <X size={16} />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AISuggestions;
