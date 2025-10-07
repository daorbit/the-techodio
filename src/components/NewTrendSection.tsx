import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clock, Eye } from "lucide-react";
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
  {
    id: "3",
    category: "CSS",
    image: "https://img.youtube.com/vi/0-DYpTmF7Dk/0.jpg",
    youtubeId: "0-DYpTmF7Dk",
    title: "CSS Grid Tutorial",
    author: "Kevin Powell",
    duration: "45:22",
    views: "1.8M",
    type: "video",
  },
];

// Styled Components
const SectionWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const TabsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
}));

const PillTab = styled("button")<{
  $active?: boolean;
}>(({ $active }) => ({
  border: $active ? "2px solid #00e5ff" : "1px solid #e0e0e0",
  outline: "none",
  background: $active ? "rgba(0,229,255,0.1)" : "#fff",
  color: $active ? "#00e5ff" : "#333",
  padding: "7px 18px",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: $active ? "0 2px 8px rgba(0,229,255,0.2)" : "none",
  transition: "all 0.2s",
  "&:hover": {
    border: $active ? "2px solid #00e5ff" : "1px solid #e0e0e0",
    background: $active ? "rgba(0,229,255,0.1)" : "#fff",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  background: "linear-gradient(90deg,#00e5ff,#ff9800)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const CardGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
}));

const StyledCard = styled(Card)(() => ({
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
    transform: "scale(1.01)",
  },
}));

const OverlayContent = styled(CardContent)(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "rgba(0,0,0,0.6)",
  color: "white",
}));

export default function TrendingNow() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);

  // Filter cards by topic
  const filteredCards =
    tab === 0
      ? trendingData
      : trendingData.filter((card) => card.category === topics[tab]);

  return (
    <SectionWrapper>
      {/* Header and Tabs in one row */}
      <HeaderRow>
        <Title variant="h5">Trending Now</Title>
        <TabsWrapper>
          {topics.map((topic, i) => (
            <PillTab key={i} $active={tab === i} onClick={() => setTab(i)}>
              {topic}
            </PillTab>
          ))}
        </TabsWrapper>
      </HeaderRow>

      {/* Cards */}
      <CardGrid>
        {filteredCards.map((card, i) => (
          <StyledCard
            key={i}
            onClick={() =>
              navigate(
                card.type === "audio"
                  ? `/audio-player/${card.id}`
                  : `/video-player/${card.id}`
              )
            }
          >
            {/* Image */}
            <CardMedia
              component="img"
              height="220"
              image={card.image}
              alt={card.title}
              style={{ filter: "brightness(0.9)" }}
            />

            {/* Overlay */}
            <OverlayContent>
              <Typography variant="body2" color="lightgray">
                {card.type.charAt(0).toUpperCase() + card.type.slice(1)} -{" "}
                {card.category}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {card.title}
              </Typography>
              <Typography variant="body2">{card.author}</Typography>

              {/* Info row */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Clock size={18} style={{ marginRight: 4 }} />
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {card.duration}
                </Typography>
                <Eye size={18} style={{ marginRight: 4 }} />
                <Typography variant="caption">{card.views}</Typography>
              </Box>
            </OverlayContent>
          </StyledCard>
        ))}
      </CardGrid>
    </SectionWrapper>
  );
}
