import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Slider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Play, Pause, SkipBack, SkipForward, Maximize2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useThemeContext } from "../../../hooks/useThemeContext";
import {
  setPlaying,
  setCurrentTime,
  setShowMiniPlayer,
  resetAllAudioState,
} from "../../../store/audioSlice";
import { useDraggable } from "../../../hooks/useDraggable";
import MobileMiniAudioPlayer from "./MobileMiniAudioPlayer";

const MiniAudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDarkMode } = useThemeContext();
  const { currentTrack, isPlaying, currentTime, duration, showMiniPlayer } =
    useAppSelector((state) => state.audio);

  const { position, isDragging, dragRef, handleMouseDown } = useDraggable({
    initialX: window.innerWidth - 460, 
    initialY: window.innerHeight - 300,
    playerWidth: 360,
    playerHeight: 200,
  });

  if (!showMiniPlayer || !currentTrack) {
    return null;
  }

  if (isMobile) {
    return <MobileMiniAudioPlayer />;
  }

  const formatTime = (time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 15, duration);
    dispatch(setCurrentTime(newTime));
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 15, 0);
    dispatch(setCurrentTime(newTime));
  };

  return (
    <Box
      ref={dragRef}
      onMouseDown={handleMouseDown}
      sx={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: 340,
        background: isDarkMode
          ? "rgba(30, 30, 30, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(18px)",
        borderRadius: "18px",
        border: `1px solid ${
          isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)"
        }`,
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0,0,0,0.7)"
          : "0 8px 32px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        padding: "18px 18px 10px 18px",
        zIndex: 1200,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "all 0.3s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            Mini Player
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              navigate(`/audio-player/${currentTrack.id}`);
              dispatch(setShowMiniPlayer(false));
            }}
            sx={{ color: isDarkMode ? "#fff" : "#222" }}
          >
            <Maximize2 size={16} />
          </IconButton>
          {/* Close */}
          <IconButton
            size="small"
            onClick={() => {
              localStorage.removeItem("miniPlayerPosition");
              dispatch(resetAllAudioState());
            }}
            sx={{ color: isDarkMode ? "#fff" : "#222" }}
          >
            <X size={16} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1, mt: 2 }}>
        <Avatar
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        />
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: isDarkMode ? "#fff" : "#222",
              fontWeight: 600,
              fontSize: "16px",
              // lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentTrack.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#b3b3b3" : "#555",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            By: {currentTrack.author || "Unknown Artist"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 1,
        }}
      >
        <IconButton
          onClick={handleSkipBackward}
          sx={{
            color: isDarkMode ? "#fff" : "#222",
            background: "none",
            borderRadius: "50%",
            p: 1,
          }}
        >
          <SkipBack size={22} />
        </IconButton>
        <IconButton
          onClick={handlePlayPause}
          sx={{
            color: "#fff",
            background: "linear-gradient(90deg,#1db954 60%,#1ed760 100%)",
            borderRadius: "50%",
            p: 2,
            boxShadow: "0 2px 8px #1db95455",
          }}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </IconButton>
        <IconButton
          onClick={handleSkipForward}
          sx={{
            color: isDarkMode ? "#fff" : "#222",
            background: "none",
            borderRadius: "50%",
            p: 1,
          }}
        >
          <SkipForward size={22} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 0 }}>
        <Typography
          variant="caption"
          sx={{
            color: isDarkMode ? "#b3b3b3" : "#888",
            fontSize: "12px",
            fontFamily: "monospace",
            minWidth: 36,
            textAlign: "center",
          }}
        >
          {formatTime(currentTime)}
        </Typography>
        <Slider
          value={currentTime}
          max={duration}
          onChange={(_, newValue) =>
            dispatch(setCurrentTime(newValue as number))
          }
          sx={{
            flex: 1,
            color: "#1db954",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              backgroundColor: "#1db954",
              border: "2px solid #fff",
              boxShadow: "0 2px 8px #1db95455",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#1db954",
              height: 4,
            },
            "& .MuiSlider-rail": {
              backgroundColor: isDarkMode ? "#444" : "#ddd",
              height: 4,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: isDarkMode ? "#b3b3b3" : "#888",
            fontSize: "12px",
            fontFamily: "monospace",
            minWidth: 36,
            textAlign: "center",
          }}
        >
          {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniAudioPlayer;
