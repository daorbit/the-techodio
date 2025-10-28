import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clock, Eye, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTracksAsync } from "../store/tracksSlice";
import { setCurrentTrack, setShowMiniPlayer } from "../store/audioSlice";
import type { Track } from "../utils/playlistData";

interface CardData {
  id: string;
  category: string;
  image: string;
  audio: string;
  title: string;
  author: string;
  duration: string;
  views: string;
  type: "audio";
}

export default function TrendingNow() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { tracks, loading, loaded } = useAppSelector((state) => state.tracks);
  const [activeTab, setActiveTab] = React.useState(0);
  const [categories, setCategories] = React.useState<string[]>([]);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(fetchTracksAsync({ page: 1, limit: 50 }));
    }
  }, [dispatch, loaded, loading]);

  useEffect(() => {
    if (tracks.length > 0) {
      const uniqueCategories = Array.from(new Set(tracks.map(t => t.category)));
      setCategories(uniqueCategories);
    }
  }, [tracks]);

  // Filter tracks by category
  const filteredTracks: Track[] = categories.length > 0 ? tracks.filter((track: Track) => track.category === categories[activeTab]) : [];

  // Map tracks to card data
  const filteredCards: CardData[] = filteredTracks.map((track: Track) => ({
    id: track.id,
    category: track.category,
    image: track.thumbnail,
    audio: track.audioUrl,
    title: track.title,
    author: track.author,
    duration: track.duration,
    views: track.listeners,
    type: "audio",
  }));

  return (
    <Box sx={{ paddingTop: { xs: 6, sm: 5 }, px: { xs: 0, sm: 0 } }}>
      <Box sx={{ mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ 
              mb: 2, 
              color: theme.palette.text.primary,
              fontSize: { xs: "1.5rem", sm: "2.125rem" }
            }}
          >
            Trending Now
          </Typography>

          {/* Filter Tabs */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.length > 0 && categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onClick={() => setActiveTab(index)}
                variant={activeTab === index ? "filled" : "outlined"}
                sx={{
                  borderRadius: "6px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  height: { xs: 28, sm: 32 },
                  "&:hover": {
                    backgroundColor:
                      activeTab === index
                        ? theme.palette.primary.main
                        : theme.palette.action.hover,
                  },
                }}
                color={activeTab === index ? "primary" : "default"}
              />
            ))}
          </Box>
        </Box>

        {/* Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {loading
            ? // Show skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={`skeleton-${index}`}
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Skeleton variant="rectangular" height={160} />
                  <CardContent sx={{ p: 2 }}>
                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" sx={{ mb: 1.5 }} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Skeleton variant="text" width="30%" />
                      <Skeleton variant="text" width="30%" />
                    </Box>
                  </CardContent>
                </Card>
              ))
            : // Show actual cards
              filteredCards.map((item) => (
            <Card
              key={item.id}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: theme.shadows[2],
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={() => {
                // Set the current track and show mini player with auto-play
                const trackData = {
                  id: item.id,
                  title: item.title,
                  author: item.author,
                  description: item.category,
                  duration: item.duration,
                  listeners: item.views,
                  date: new Date().toISOString(),
                  thumbnail: item.image,
                  category: item.category,
                  audioUrl: item.audio,
                };
                dispatch(setCurrentTrack({ track: trackData, autoPlay: true }));
                dispatch(setShowMiniPlayer(true));
              }}
            >
              {/* Media */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: "cover" }}
                />

                {/* Play Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Play size={12} />
                  <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
                    Audio
                  </Typography>
                </Box>
              </Box>

              {/* Content */}
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, fontSize: "0.75rem" }}
                >
                  {item.category}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "1rem",
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, fontSize: "0.875rem" }}
                >
                  by {item.author}
                </Typography>

                {/* Stats */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Clock size={14} />
                    <Typography variant="caption" color="text.secondary">
                      {item.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Eye size={14} />
                    <Typography variant="caption" color="text.secondary">
                      {item.views}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
