import { Play, Clock, Heart, Music, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  useTheme,
  Skeleton,
} from "@mui/material";
import { useThemeContext } from "../hooks/useThemeContext";
import { usePlaylists } from "../hooks/usePlaylists";

const Playlists = () => {
  const navigate = useNavigate();
  const { themeMode } = useThemeContext();
  const { playlists, loading, error } = usePlaylists();

  const theme = useTheme();

  const renderSkeletonCard = () => (
    <Box
      sx={{
        background:
          themeMode === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          themeMode === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.08)"
        }`,
      }}
    >
      <Skeleton variant="rectangular" height={200} />
      <CardContent sx={{ p: 3 }}>
        <Skeleton variant="text" height={28} width="80%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={20} width="100%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} width="60%" sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="text" height={16} width={60} />
            <Skeleton variant="text" height={16} width={80} />
          </Box>
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </CardContent>
    </Box>
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Skeleton variant="text" height={40} width={150} />
        </Box>

        {/* Skeleton Grid */}
        <Box
          sx={{
            display: "grid",
            flexDirection: "column",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 3,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>{renderSkeletonCard()}</div>
          ))}
        </Box>
      </Box>
    );
  }

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background:
              themeMode === "dark"
                ? "linear-gradient(90deg,#00e5ff,#ff9800)"
                : "none",
            WebkitBackgroundClip: themeMode === "dark" ? "text" : "initial",
            WebkitTextFillColor:
              themeMode === "dark" ? "transparent" : "initial",
            color: themeMode === "dark" ? "transparent" : "#333",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          }}
        >
          {"Playlist"}
        </Typography>
      </Box>

      {/* Playlists Grid/List */}
      <Box
        sx={{
          display: "grid",
          flexDirection: "column",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 3,
        }}
      >
        {error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          playlists.map((playlist) => (
          <Box
            key={playlist.id}
            onClick={() => handlePlaylistClick(playlist.id)}
            sx={{
              background:
                themeMode === "dark"
                  ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                themeMode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)"
              }`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              position: "relative",
              "&:hover": {
                boxShadow:
                  themeMode === "dark"
                    ? "0 20px 40px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.1)"
                    : "0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(25,118,210,0.08)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  themeMode === "dark"
                    ? "linear-gradient(90deg, #00e5ff, #ff9800)"
                    : "linear-gradient(90deg, #1976d2, #42a5f5)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
          >
            <Box sx={{ position: "relative", height: "200px" }}>
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
                  sx={{
                    background: "rgba(0,229,255,0.9)",
                    color: "#000",
                    border: "2px solid rgba(255,255,255,0.2)",
                    "&:hover": {
                      background: "#00e5ff",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(0,229,255,0.4)",
                    },
                    transition: "all 0.2s ease",
                  }}
                  size="large"
                >
                  <Play size={28} />
                </IconButton>
              </Box>

              {/* Tags overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                }}
              >
                {playlist.tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: "20px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </Box>
            </Box>

            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: themeMode === "dark" ? "#fff" : "#000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "1.1rem",
                }}
              >
                {playlist.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color:
                    themeMode === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.6)",
                  mb: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.4,
                }}
              >
                {playlist.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        themeMode === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontSize: "0.8rem",
                    }}
                  >
                    <Music size={14} />
                    {playlist.trackCount} tracks
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        themeMode === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontSize: "0.8rem",
                    }}
                  >
                    <Clock size={14} />
                    {playlist.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {playlist.isPublic && (
                    <Users
                      size={16}
                      style={{
                        color:
                          themeMode === "dark"
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                      }}
                    />
                  )}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle favorite toggle
                    }}
                    sx={{
                      color:
                        themeMode === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      "&:hover": {
                        color: "#ff4081",
                      },
                      p: 0.5,
                    }}
                  >
                    <Heart size={18} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Box>
        )))}

        {playlists.length === 0 && !loading && !error && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
            sx={{
              color:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              mb: 2,
            }}
          >
            No playlists yet
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
            }}
          >
            Create your first playlist to get started
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
  );
};

export default Playlists;
