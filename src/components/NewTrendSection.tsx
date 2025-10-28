import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clock, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTracksAsync } from "../store/tracksSlice";
import { setCurrentTrack, setShowMiniPlayer } from "../store/audioSlice";
import type { Track } from "../utils/playlistData";
import {
  CardsWrapper,
  StyledCard,
  AudioContainer,
  OverlayGradient,
  StyledChip,
  PlayButton,
  ActionsRow,
} from "./AudioLibrary.styled";

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
      const uniqueCategories = Array.from(
        new Set(tracks.map((t) => t.category))
      );
      setCategories(uniqueCategories);
    }
  }, [tracks]);

  const getDefaultAudioThumbnail = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="300" height="200" fill="url(#grad)"/>
        <circle cx="150" cy="100" r="30" fill="rgba(255,255,255,0.2)"/>
        <polygon points="140,85 140,115 165,100" fill="white"/>
        <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Audio Track</text>
      </svg>
    `)}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getDefaultAudioThumbnail();
  };

  const filteredTracks: Track[] =
    categories.length > 0
      ? tracks.filter(
          (track: Track) => track.category === categories[activeTab]
        )
      : [];

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
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.length > 0 &&
              categories.map((category, index) => (
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
                  }}
                  color={activeTab === index ? "primary" : "default"}
                />
              ))}
          </Box>
        </Box>

        <CardsWrapper
          sx={{
            gridTemplateColumns: "repeat(4, 1fr)",
            [theme.breakpoints.down("lg")]: {
              gridTemplateColumns: "repeat(3, 1fr)",
            },
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StyledCard key={`skeleton-${index}`}>
                  <AudioContainer>
                    <Skeleton
                      variant="rectangular"
                      height={180}
                      sx={{ width: "100%" }}
                    />
                    <OverlayGradient />
                    <Skeleton
                      variant="rectangular"
                      width={60}
                      height={24}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        borderRadius: 1,
                      }}
                    />
                    <Skeleton
                      variant="circular"
                      width={48}
                      height={48}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </AudioContainer>
                  <CardContent
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Box sx={{ width: "100%" }}>
                        <Skeleton variant="text" width="80%" height={24} />
                        <Skeleton variant="text" width="60%" height={20} />
                      </Box>
                    </Box>
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={20}
                      sx={{ mt: 1 }}
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                      sx={{ mt: 1 }}
                    >
                      <Skeleton variant="circular" width={16} height={16} />
                      <Skeleton variant="text" width="40%" height={16} />
                    </Box>
                  </CardContent>
                </StyledCard>
              ))
            : // Show actual cards
              filteredCards.map((item) => (
                <StyledCard
                  key={item.id}
                  onClick={() => {
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
                    dispatch(
                      setCurrentTrack({ track: trackData, autoPlay: true })
                    );
                    dispatch(setShowMiniPlayer(true));
                  }}
                >
                  <AudioContainer>
                    <CardMedia
                      component="img"
                      height={180}
                      image={item.image}
                      alt={item.title}
                      onError={handleImageError}
                      sx={{ filter: "blur(1px)" }}
                    />
                    <OverlayGradient />
                    <StyledChip label={item.category} color="primary" />
                    <PlayButton aria-label="play" size="large">
                      <Play size={22} />
                    </PlayButton>
                  </AudioContainer>
                  <CardContent
                    sx={{
                      textAlign: "left",
                      flex: undefined,
                      p: undefined,
                      [theme.breakpoints.down("sm")]: {
                        p: undefined,
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: "0.9rem",
                              whiteSpace: "normal",
                              overflow: "visible",
                              textOverflow: "clip",
                            },
                          }}
                          noWrap
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: "0.75rem",
                            },
                          }}
                        >
                          {item.author} • {item.views} views
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        [theme.breakpoints.down("sm")]: {
                          whiteSpace: "normal",
                          overflow: "visible",
                          textOverflow: "clip",
                        },
                      }}
                      noWrap
                    >
                      {item.category}
                    </Typography>

                    <ActionsRow>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Clock size={16} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            [theme.breakpoints.down("sm")]: {
                              fontSize: "0.75rem",
                            },
                          }}
                        >
                          {item.duration}
                        </Typography>
                      </Box>
                    </ActionsRow>
                  </CardContent>
                </StyledCard>
              ))}
        </CardsWrapper>
      </Box>
    </Box>
  );
}
