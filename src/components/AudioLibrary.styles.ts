import {
  styled,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

export const AudioLibraryContainer = styled(Box)(() => ({
  minHeight: "100vh",

  fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  transition: "background 0.3s ease",
}));

export const LibraryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  gap: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const TabNavigation = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(0.5),
  backdropFilter: "blur(10px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(255,255,255,0.3)"
  }`,
}));

export const TabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2.5),
  background: isActive ? theme.palette.primary.main : "transparent",
  color: isActive
    ? theme.palette.primary.contrastText
    : theme.palette.text.secondary,
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: 500,
  fontSize: "0.875rem",
  textTransform: "none",
  border: "none",
  "&:hover": {
    background: isActive
      ? theme.palette.primary.main
      : theme.palette.action.hover,
    color: isActive
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minWidth: 300,
  [theme.breakpoints.down("md")]: {
    minWidth: "unset",
    order: 1,
  },
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    paddingLeft: theme.spacing(3.5),
    borderRadius: 25,
    background: theme.palette.background.paper,
    backdropFilter: "blur(10px)",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.3)"
    }`,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&.Mui-focused": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}40`,
    },
  },
  "& .MuiOutlinedInput-input": {
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

export const ContentHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
  },
}));

export const ContentTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

export const TrackCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: "0.875rem",
}));

export const ContentSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  marginTop: theme.spacing(1),
}));

export const AudioGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}));

export const AudioCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  transition: "all 0.3s ease",
   
  position: "relative",
  cursor: "pointer",
  background: theme.palette.background.paper,
  "&:hover": {
    // transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
 
}));

export const CardThumbnail = styled(Box)(() => ({
  position: "relative",
  height: 200,
  overflow: "hidden",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ThumbnailImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  ".audio-card:hover &": {
    transform: "scale(1.05)",
  },
});

export const PlayOverlay = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 60,
  height: 60,
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  opacity: 0,
  transition: "all 0.3s ease",
  cursor: "pointer",
  boxShadow: theme.shadows[4],
  "&:hover": {
    background: "rgba(255, 255, 255, 0.95)",
    transform: "translate(-50%, -50%) scale(1.05)",
  },
  ".audio-card:hover &": {
    opacity: 1,
  },
}));

export const CategoryBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  background: "rgba(255, 255, 255, 0.9)",
  color: theme.palette.primary.main,
  fontSize: "0.6875rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  boxShadow: theme.shadows[2],
}));

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const TrackTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  lineHeight: 1.3,
  transition: "color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const TrackAuthor = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: "0.8125rem",
  marginBottom: theme.spacing(1.5),
  textTransform: "uppercase",
  letterSpacing: "0.3px",
}));

export const TrackDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.8125rem",
  lineHeight: 1.4,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontWeight: 400,
}));

export const VideoFeatured = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: theme.spacing(3.75),
  marginTop: theme.spacing(2.5),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
    "& .video-sidebar": {
      order: -1,
    },
  },
}));

export const FeaturedVideo = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: theme.shadows[4],
}));

export const VideoEmbed = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 400,
  [theme.breakpoints.down("sm")]: {
    height: 250,
  },
  "& iframe": {
    borderRadius: theme.spacing(2),
  },
}));

export const VideoSidebar = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[4],
  height: "fit-content",
}));

export const VideoSidebarTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.125rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2.5),
}));

export const VideoCardSmall = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.action.hover,
  },
  "&:focus-within": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

export const VideoThumbnailSmall = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 120,
  height: 68,
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 120,
  },
}));

export const VideoThumbnailImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const VideoDuration = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(0.5),
  right: theme.spacing(0.5),
  background: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: theme.spacing(0.25, 0.75),
  borderRadius: theme.spacing(0.5),
  fontSize: "0.6875rem",
  fontWeight: 600,
}));

export const VideoInfoSmall = styled(Box)({});

export const VideoTitleSmall = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  lineHeight: 1.3,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const VideoChannel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.75rem",
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
}));

export const VideoViews = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.6875rem",
}));

export const LoadingSkeleton = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.grey[300]} 25%, transparent 37%, ${theme.palette.grey[300]} 63%)`,
  backgroundSize: "400px 100%",
  animation: "shimmer 1.5s ease-in-out infinite",
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-200px 0",
    },
    "100%": {
      backgroundPosition: "calc(200px + 100%) 0",
    },
  },
}));
