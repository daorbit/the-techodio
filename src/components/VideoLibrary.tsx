import React from "react";
import { Clock, Heart, DownloadCloud, Grid, List, Play } from "lucide-react";
import {
  Box,
  Typography,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ContentHeader } from "./AudioLibrary.styles";
import { useNavigate } from "react-router-dom";
import {
  SectionContainer,
  CardsWrapper,
  StyledCard,
  StyledChip,
  VideoContainer,
  ThumbnailImage,
  OverlayGradient,
  DurationBadge,
  PlayButton,
  ActionsRow,
  HeaderRow,
  Controls,
  SearchInput,
} from "./VideoLibrary.styled";
import { useThemeContext } from "../hooks/useThemeContext";

interface VideoItem {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  youtubeId: string;
  category: string;
}

const VideoLibrary = () => {
  const navigate = useNavigate();
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const { themeMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const iconSize = isMobile ? 18 : 16;

  React.useEffect(() => {
    if (window.innerWidth <= theme.breakpoints.values.md && view !== "grid") {
      setView("grid");
    }
  }, [theme.breakpoints.values.md, view]);

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: "grid" | "list" | null
  ) => {
    if (next) setView(next);
  };

  const handleVideoClick = (video: VideoItem) => {
    navigate(`/video-player/${video.id}`);
  };

  const videoItems: VideoItem[] = [
    {
      id: "1",
      title: "React Tutorial for Beginners",
      author: "Traversy Media",
      description: "Learn React from scratch with this comprehensive tutorial.",
      duration: "1:45:30",
      views: "2.5M",
      date: "2024-09-20",
      youtubeId: "Ke90Tje7VS0",
      category: "React",
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      author: "freeCodeCamp",
      description: "Master the fundamentals of JavaScript programming.",
      duration: "3:20:15",
      views: "5.1M",
      date: "2024-09-21",
      youtubeId: "PkZNo7MFNFg",
      category: "JavaScript",
    },
    {
      id: "3",
      title: "CSS Grid Tutorial",
      author: "Kevin Powell",
      description: "Learn CSS Grid with practical examples and projects.",
      duration: "45:22",
      views: "1.8M",
      date: "2024-09-22",
      youtubeId: "0-DYpTmF7Dk",
      category: "CSS",
    },
  ];

  return (
    <SectionContainer>
      <ContentHeader>
        <Box>
          <Typography
            variant="h5"
            sx={{
              background: themeMode === 'dark'
                ? "linear-gradient(90deg,#00e5ff,#ff9800)"
                : "none",
              WebkitBackgroundClip: themeMode === 'dark' ? "text" : "initial",
              WebkitTextFillColor: themeMode === 'dark' ? "transparent" : "initial",
              color: themeMode === 'dark' ? "transparent" : "#333",
              fontWeight: "bold",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.5rem",
              },
            }}
          >
            {"Video Library"}
          </Typography>
        </Box>
      </ContentHeader>

      <HeaderRow>
        <Controls>
          <SearchInput
            placeholder="Search videos..."
            inputProps={{ "aria-label": "search videos" }}
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
            <MenuItem value="react">React</MenuItem>
            <MenuItem value="js">JavaScript</MenuItem>
            <MenuItem value="css">CSS</MenuItem>
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
        {videoItems.map((video) => (
          <StyledCard
            key={video.id}
            view={view}
            sx={{ cursor: "pointer" }}
            onClick={() => handleVideoClick(video)}
          >
            <VideoContainer view={view}>
              <ThumbnailImage
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
              />
              <OverlayGradient />
              <StyledChip label={video.category} color="primary" />
              <PlayButton aria-label="play video" size="large">
                <Play size={22} />
              </PlayButton>
              <DurationBadge>{video.duration}</DurationBadge>
            </VideoContainer>

            <CardContent
              sx={{
                textAlign: "left",
                flex: view === "list" ? 1 : undefined,
                p: view === "list" ? 2 : undefined,
                [theme.breakpoints.down("sm")]: {
                  p: 1,
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} noWrap
                    sx={{
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "0.9rem",
                        whiteSpace: "normal",
                        overflow: "visible",
                        textOverflow: "clip",
                      },
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary"
                    sx={{
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "0.75rem",
                      },
                    }}
                  >
                    {video.author} • {new Date(video.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <IconButton size="small" aria-label="like video">
                    <Heart size={iconSize} />
                  </IconButton>
                  <IconButton size="small" aria-label="download video">
                    <DownloadCloud size={iconSize} />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "text.secondary",
                  [theme.breakpoints.down("sm")]: {
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "clip",
                    fontSize: "0.75rem",
                  },
                }}
                noWrap
              >
                {video.description}
              </Typography>

              <ActionsRow>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={16} />
                  <Typography variant="body2" color="text.secondary"
                    sx={{
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "0.75rem",
                      },
                    }}
                  >
                    {video.duration}
                  </Typography>
                </Box>
                <Typography color="#00c4d6" fontWeight={600}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "0.75rem",
                    },
                  }}
                >
                  {video.views} views
                </Typography>
              </ActionsRow>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default VideoLibrary;
