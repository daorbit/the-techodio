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
      @keyframes slideIn {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
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
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(52, 211, 153, 0.5))"
            : "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(30,30,30,0.9))",
          color: "#fff",
          "&:hover": {
            background: loading
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(52, 211, 153, 0.6))"
              : "linear-gradient(135deg, #00e676, #00aa55)",
            animation: loading ? "none" : "pulse 0.6s ease-in-out infinite",
          },
          "&:not(:hover)": {
            animation: loading ? "none" : "sparkle 2s ease-in-out infinite",
          },
          boxShadow:
            "0 4px 16px rgba(0,255,136,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
          width: 64,
          height: 64,
          transition: "all 0.3s ease",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
        aria-label="AI Suggestions"
      >
        {loading ? (
          <Lottie
            animationData={audioSearchingAnimation}
            loop={true}
            style={{ width: 26, height: 26 }}
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
            position: "fixed",
            bottom: 100,
            right: 35,
            width: 320,
            maxHeight: 400,
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.98)"
              : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
            }`,
            overflow: "hidden",
            zIndex: 1001,
            animation: "slideIn 0.4s ease-out",
            transformOrigin: "top right",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2.5,
              borderBottom: `1px solid ${
                isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isDarkMode
                ? "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(30,30,30,0.9))"
                : "linear-gradient(135deg, rgba(76,175,80,0.1), rgba(255,255,255,0.9))",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Sparkles size={24} color="#00ff88" />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: isDarkMode ? "#fff" : "#000",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
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
                color: isDarkMode ? "#aaa" : "#666",
                "&:hover": {
                  color: isDarkMode ? "#ff6b6b" : "#d32f2f",
                  backgroundColor: "rgba(255,0,0,0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <X size={18} />
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
                  gap: 1.5,
                  maxHeight: 350,
                  overflowY: "auto",
                  p: 1,
                }}
              >
                {suggestions.map((track, index) => {
                  const isCurrentTrack = currentTrack?.id === track.id;
                  const showPauseIcon = isCurrentTrack && isPlaying;

                  return (
                    <Box
                      key={track.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        borderRadius: 3,
                        cursor: "pointer",
                        backgroundColor: isCurrentTrack
                          ? isDarkMode
                            ? "rgba(0,255,136,0.15)"
                            : "rgba(76,175,80,0.15)"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                        transition: "all 0.3s ease",
                        border: isCurrentTrack
                          ? `1px solid ${
                              isDarkMode
                                ? "rgba(0,255,136,0.3)"
                                : "rgba(76,175,80,0.3)"
                            }`
                          : "none",
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
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
