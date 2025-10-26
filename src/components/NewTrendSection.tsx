import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clock, Eye, Play, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const topics = [
  "All Topics",
  "Tech History",
  "Web Development",
  "AI/ML",
  "React",
  "JavaScript",
  "CSS",
];

const trendingData = [
  // Audio data
  {
    id: "1",
    category: "Tech History",
    image: "/assets/Internet.png",
    audio: "INTERNET_AUDIO",
    title: "Introduction to Internet",
    author: "DPK",
    duration: "25:30",
    views: "12.4K",
    type: "audio",
  },
  {
    id: "2",
    category: "Web Development",
    image: "/assets/web-d.png",
    audio: "WEB_DEVELOPMENT",
    title: "Web Development Essentials",
    author: "AJ",
    duration: "18:42",
    views: "8.9K",
    type: "audio",
  },
  {
    id: "3",
    category: "AI/ML",
    image: "/assets/ml.png",
    audio:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    title: "Machine Learning Basics",
    author: "Sarah Chen",
    duration: "3:30",
    views: "15.2K",
    type: "audio",
  },
  // Video data
  {
    id: "1",
    category: "React",
    image: "https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg",
    youtubeId: "Ke90Tje7VS0",
    title: "React Tutorial for Beginners",
    author: "Traversy Media",
    duration: "1:45:30",
    views: "2.5M",
    type: "video",
  },
  {
    id: "2",
    category: "JavaScript",
    image: "https://img.youtube.com/vi/PkZNo7MFNFg/0.jpg",
    youtubeId: "PkZNo7MFNFg",
    title: "JavaScript Fundamentals",
    author: "freeCodeCamp",
    duration: "3:20:15",
    views: "5.1M",
    type: "video",
  },
];

export default function TrendingNow() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);

  // Filter cards by topic
  const filteredCards =
    activeTab === 0
      ? trendingData
      : trendingData.filter((card) => card.category === topics[activeTab]);

  return (
    <Box sx={{ paddingTop: 5 }}>
      <Box sx={{ mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 2, color: theme.palette.text.primary }}
          >
            Trending Now
          </Typography>

          {/* Filter Tabs */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {topics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                onClick={() => setActiveTab(index)}
                variant={activeTab === index ? "filled" : "outlined"}
                sx={{
                  borderRadius: "6px",
                  fontWeight: 500,
                  cursor: "pointer",
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
          {filteredCards.map((item) => (
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
              onClick={() =>
                navigate(
                  item.type === "audio"
                    ? `/audio-player/${item.id}`
                    : `/video-player/${item.id}`
                )
              }
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

                {/* Type Badge */}
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
                  {item.type === "audio" ? (
                    <Play size={12} />
                  ) : (
                    <Video size={12} />
                  )}
                  <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
                    {item.type}
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
