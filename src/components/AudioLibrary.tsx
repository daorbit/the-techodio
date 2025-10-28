import React, { useEffect } from "react";
import { Play, Clock, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  SectionContainer,
  CardsWrapper,
  StyledCard,
  StyledChip,
  PlayButton,
  ActionsRow,
  HeaderRow,
  Controls,
  SearchInput,
  ContentHeader,
  AudioContainer,
  OverlayGradient,
} from "./AudioLibrary.styled";
import { useThemeContext } from "../hooks/useThemeContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTracksAsync } from "../store/tracksSlice";
import type { Track } from "../utils/playlistData";

const AudioLibrary = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (tracks.length === 0 && !loading) {
      dispatch(fetchTracksAsync({ page: 1, limit: 50 }));
    }
  }, [dispatch, tracks.length, loading]);
  const [view, setView] = React.useState<"grid" | "list">("grid");

  React.useEffect(() => {
    if (isMobile && view !== "grid") {
      setView("grid");
    }
  }, [isMobile, view]);

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: "grid" | "list" | null
  ) => {
    if (next) setView(next);
  };

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

  const handleTrackClick = (track: Track) => {
    navigate(`/audio-player/${track.id}`);
  };

  return (
    <SectionContainer>
      <ContentHeader>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: isDarkMode
              ? "linear-gradient(90deg,#00e5ff,#ff9800)"
              : "none",
            WebkitBackgroundClip: isDarkMode ? "text" : "initial",
            WebkitTextFillColor: isDarkMode ? "transparent" : "initial",
            color: isDarkMode ? "transparent" : "#333",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          }}
        >
          Audio Library
        </Typography>
      </ContentHeader>

      <HeaderRow>
        <Controls>
          <SearchInput
            placeholder="Search audio tracks..."
            inputProps={{ "aria-label": "search audio tracks" }}
          />
          <Select
            defaultValue="all"
            size="small"
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00e5ff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00bcd4",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00e5ff",
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="web-security">Web Security</MenuItem>
            <MenuItem value="ai-ml">AI/ML</MenuItem>
          </Select>
        </Controls>

        <Controls
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{
              background: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              padding: 0.5,
              "& .MuiToggleButton-root": {
                color: (t) => t.palette.text.secondary,
                border: "none",
                borderRadius: "8px !important",
                px: 2,
                py: 1,
                "&.Mui-selected": {
                  background: "#00e5ff",
                  color: (t) => (t.palette.mode === "dark" ? "#000" : "#fff"),
                  "&:hover": {
                    background: "#00bcd4",
                  },
                },
                "&:hover": {
                  background: (t) => t.palette.action.hover,
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <Grid size={16} />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <List size={16} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Controls>
      </HeaderRow>

      <CardsWrapper view={view}>
        {tracks.map((track) => (
          <StyledCard
            key={track.id}
            view={view}
            onClick={() => handleTrackClick(track)}
          >
            <AudioContainer view={view}>
              <CardMedia
                component="img"
                height={view === "list" ? 120 : 180}
                image={track.thumbnail}
                alt={track.title}
                onError={handleImageError}
                sx={{ filter: "blur(3px)" }}
              />
              <OverlayGradient />
              <StyledChip label={track.category} color="primary" />
              <PlayButton aria-label="play" size="large">
                <Play size={22} />
              </PlayButton>
            </AudioContainer>
            <CardContent
              sx={{
                textAlign: "left",
                flex: view === "list" ? 1 : undefined,
                p: view === "list" ? 2 : undefined,
                [theme.breakpoints.down("sm")]: {
                  p: view === "list" ? 1 : undefined,
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
                    {track.title}
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
                    {track.author} • {new Date(track.date).toLocaleDateString()}
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
                {track.description}
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
                    {track.duration}
                  </Typography>
                </Box>
              </ActionsRow>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default AudioLibrary;
