import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { ArrowLeft, Play, Pause, Clock, Music, Users } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";
import { getPlaylistById, type Track } from "../utils/playlistData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setCurrentTrack,
  setPlaying,
  setShowMiniPlayer,
  setPendingPlay,
} from "../store/audioSlice";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themeMode } = useThemeContext();
  const dispatch = useAppDispatch();

  // Get audio state from Redux
  const currentTrack = useAppSelector((state) => state.audio.currentTrack);
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);

  const playlist = id ? getPlaylistById(id) : null;

  if (!playlist) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: themeMode === 'dark'
            ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h6" sx={{ color: themeMode === 'dark' ? "#fff" : "#000" }}>
          Playlist not found
        </Typography>
      </Box>
    );
  }

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      dispatch(setShowMiniPlayer(true));
      dispatch(setPlaying(!isPlaying));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setPendingPlay(true));
      dispatch(setShowMiniPlayer(true));
    }
  };

  const handleBack = () => {
    navigate("/playlists");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Header with back button */}
      <Box sx={{ mb: { xs: 2, md: 4 }, px: { xs: 2, md: 0 } }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          sx={{
            color: themeMode === 'dark' ? "#00e5ff" : "#1976d2",
            mb: 2,
            "&:hover": {
              background: themeMode === 'dark'
                ? "rgba(0,229,255,0.1)"
                : "rgba(25,118,210,0.1)",
            },
          }}
        >
          Back to Playlists
        </Button>
      </Box>

      {/* Playlist Header */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 4 },
          mb: { xs: 2, md: 4 },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Playlist Cover */}
        <Box
          sx={{
            width: { xs: 250, md: 300 },
            height: { xs: 250, md: 300 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: themeMode === 'dark'
              ? "0 20px 40px rgba(0,229,255,0.2)"
              : "0 20px 40px rgba(0,0,0,0.15)",
            position: "relative",
            mb: { xs: 2, md: 0 },
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={playlist.thumbnail}
            alt={playlist.title}
            sx={{
              objectFit: "cover",
              filter: "brightness(0.9) contrast(1.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              onClick={() => handlePlayTrack(playlist.tracks[0])}
              sx={{
                background: "rgba(0,229,255,0.9)",
                color: "#000",
                width: 80,
                height: 80,
                border: "3px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  background: "#00e5ff",
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 24px rgba(0,229,255,0.5)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Play size={40} />
            </IconButton>
          </Box>
        </Box>

        {/* Playlist Info */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: 300 },
            maxWidth: { xs: "100%", md: "none" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              background: themeMode === 'dark'
                ? "linear-gradient(90deg, #00e5ff, #ff9800)"
                : "linear-gradient(90deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {playlist.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: themeMode === 'dark' ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
              mb: 3,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {playlist.description}
          </Typography>

          {/* Stats */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              mb: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Music
                size={18}
                style={{ color: themeMode === 'dark' ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: themeMode === 'dark' ? "#fff" : "#000" }}
              >
                {playlist.trackCount} tracks
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Clock
                size={18}
                style={{ color: themeMode === 'dark' ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: themeMode === 'dark' ? "#fff" : "#000" }}
              >
                {playlist.duration}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users
                size={18}
                style={{ color: themeMode === 'dark' ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: themeMode === 'dark' ? "#fff" : "#000" }}
              >
                {playlist.isPublic ? "Public" : "Private"}
              </Typography>
            </Box>
          </Box>

          {/* Tags */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {playlist.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  background: themeMode === 'dark'
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(25,118,210,0.1)",
                  color: themeMode === 'dark' ? "#00e5ff" : "#1976d2",
                  border: `1px solid ${
                    themeMode === 'dark' ? "rgba(0,229,255,0.3)" : "rgba(25,118,210,0.3)"
                  }`,
                }}
              />
            ))}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          ></Box>
        </Box>
      </Box>

      {/* Tracks List */}
      <Box sx={{ px: { xs: 1, md: 0 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: themeMode === 'dark' ? "#fff" : "#000",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Tracks
        </Typography>

        <Card
          sx={{
            background: themeMode === 'dark'
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              themeMode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
            }`,
            borderRadius: 3,
            mx: { xs: -1, md: 0 },
          }}
        >
          <List sx={{ py: 0 }}>
            {playlist.tracks.map((track: Track, index: number) => (
              <ListItem
                key={track.id}
                sx={{
                  borderBottom:
                    index < playlist.tracks.length - 1
                      ? `1px solid ${
                          themeMode === 'dark'
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.08)"
                        }`
                      : "none",
                  "&:hover": {
                    background: themeMode === 'dark'
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                  },
                  px: { xs: 2, md: 3 },
                  py: { xs: 1.5, md: 2 },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={track.thumbnail}
                    sx={{
                      width: { xs: 40, md: 50 },
                      height: { xs: 40, md: 50 },
                      mr: { xs: 1.5, md: 2 },
                      border: `2px solid ${
                        themeMode === 'dark' ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
                      }`,
                    }}
                  >
                    <Music size={24} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        color: themeMode === 'dark' ? "#fff" : "#000",
                        mb: 0.5,
                      }}
                    >
                      {track.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: themeMode === 'dark'
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        {track.author}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: themeMode === 'dark'
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Clock size={12} />
                        {track.duration}
                      </Typography>
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.5, md: 1 },
                    }}
                  >
                    <IconButton
                      onClick={() => handlePlayTrack(track)}
                      sx={{
                        color:
                          currentTrack?.id === track.id && isPlaying
                            ? themeMode === 'dark'
                              ? "#00e5ff"
                              : "#1976d2"
                            : themeMode === 'dark'
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                        "&:hover": {
                          color: themeMode === 'dark' ? "#00e5ff" : "#1976d2",
                        },
                        p: { xs: 0.5, md: 1 },
                      }}
                    >
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause size={18} />
                      ) : (
                        <Play size={18} />
                      )}
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </Box>
  );
};

export default PlaylistDetail;
