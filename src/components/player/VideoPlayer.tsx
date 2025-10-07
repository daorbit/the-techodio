import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, CircularProgress, useTheme } from "@mui/material";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { styled } from "@mui/material/styles";

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

// Mock video data - in a real app, this would come from an API
const mockVideos: VideoItem[] = [
  {
    id: "1",
    title: "React Tutorial for Beginners",
    author: "Traversy Media",
    description: "Learn React from scratch with this comprehensive tutorial covering all the fundamentals you need to build modern web applications.",
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
    description: "Master the fundamentals of JavaScript programming with this in-depth course covering variables, functions, objects, and more.",
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
    description: "Learn CSS Grid with practical examples and projects. Perfect for modern web layout techniques.",
    duration: "45:22",
    views: "1.8M",
    date: "2024-09-22",
    youtubeId: "0-DYpTmF7Dk",
    category: "CSS",
  },
];

const PlayerContainer = styled(Box)(() => ({
  minHeight: "100vh",
  backgroundColor: "#000",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
}));

const Header = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  [theme.breakpoints.down("sm")]: {
    padding: "12px 16px",
    gap: "12px",
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "rgba(255,255,255,0.1)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px 120px 24px", // Account for header and footer
  [theme.breakpoints.down("sm")]: {
    padding: "60px 16px 100px 16px",
  },
}));

const VideoFrame = styled(Box)(() => ({
  width: "100%",
  maxWidth: "1200px",
  aspectRatio: "16/9",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
}));

const Footer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)",
  padding: "24px",
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

const VideoInfo = styled(Box)(() => ({
  maxWidth: "1200px",
  margin: "0 auto",
}));

const LoadingContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  gap: "24px",
}));

const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id) {
        setError("No video ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        const foundVideo = mockVideos.find(v => v.id === id);
        if (!foundVideo) {
          setError("Video not found");
          setLoading(false);
          return;
        }

        setVideo(foundVideo);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load video:", err);
        setError("Failed to load video. Please try again.");
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenInYouTube = () => {
    if (video) {
      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={60} sx={{ color: "#fff" }} />
        <Typography variant="h6" sx={{
          color: "#fff",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
        }}>
          Loading video...
        </Typography>
      </LoadingContainer>
    );
  }

  if (error || !video) {
    return (
      <PlayerContainer>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <Typography variant="h6"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Video Player
          </Typography>
        </Header>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{
            color: "#fff",
            textAlign: "center",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          }}>
            {error || "Video not found"}
          </Typography>
          <Typography variant="body1" sx={{
            color: "#ccc",
            textAlign: "center",
            maxWidth: 400,
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.875rem",
              px: 2,
            },
          }}>
            The video you're looking for doesn't exist or has been removed.
          </Typography>
        </Box>
      </PlayerContainer>
    );
  }

  return (
    <PlayerContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            {video.title}
          </Typography>
          <Typography variant="body2" sx={{
            color: "#ccc",
            opacity: 0.8,
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.75rem",
            },
          }}>
            {video.author}
          </Typography>
        </Box>
        <IconButton
          onClick={handleOpenInYouTube}
          sx={{
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <ExternalLink size={20} />
        </IconButton>
      </Header>

      <VideoContainer>
        <VideoFrame>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ border: "none" }}
          />
        </VideoFrame>
      </VideoContainer>

      <Footer>
        <VideoInfo>
          <Typography variant="h5" fontWeight={600} gutterBottom
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.25rem",
              },
            }}
          >
            {video.title}
          </Typography>
          <Typography variant="body1" sx={{
            color: "#ccc",
            mb: 2,
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.875rem",
            },
          }}>
            {video.author} • {video.views} views
          </Typography>
          <Typography variant="body2" sx={{
            color: "#ccc",
            lineHeight: 1.6,
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.75rem",
            },
          }}>
            {video.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Typography variant="body2" sx={{
              color: "#999",
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.75rem",
              },
            }}>
              Duration: {video.duration}
            </Typography>
            <Typography variant="body2" sx={{
              color: "#999",
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.75rem",
              },
            }}>
              Category: {video.category}
            </Typography>
          </Box>
        </VideoInfo>
      </Footer>
    </PlayerContainer>
  );
};

export default VideoPlayer;