import { styled } from "@mui/material/styles";
import { Box, Card, Chip, IconButton, InputBase } from "@mui/material";

export const SectionContainer = styled(Box)(() => ({
  textAlign: "left",
}));

export const CardsWrapper = styled(Box)<{ view?: "grid" | "list" }>(
  ({ theme, view = "grid" }) => ({
    marginTop: theme.spacing(4),
    display: view === "grid" ? "grid" : "flex",
    flexDirection: view === "list" ? "column" : undefined,
    gridTemplateColumns:
      view === "grid" ? "repeat(auto-fit, minmax(300px, 1fr))" : undefined,
    gap: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: view === "grid" ? "1fr" : undefined,
      gap: theme.spacing(2),
    },
    "& .MuiPaper-root": {
      boxShadow: "none",
    },
  })
);

export const StyledCard = styled(Card)<{ view?: "grid" | "list" }>(
  ({ theme, view = "grid" }) => ({
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: view === "list" ? "row" : "column",
    width: view === "list" ? "100%" : undefined,
    justifyContent: "space-between",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, rgba(0,229,255,0.05), rgba(255,152,0,0.05))"
        : "",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  })
);

export const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.25),
  left: theme.spacing(1.25),
  fontWeight: 600,
  fontSize: "0.7rem",
  zIndex: 4,
  background: "rgba(0,229,255,0.9)",
  color: theme.palette.mode === "dark" ? "#000" : "#fff",
  boxShadow: theme.shadows[1],
}));

export const VideoContainer = styled(Box)<{ view?: "grid" | "list" }>(
  ({ theme, view = "grid" }) => ({
    position: "relative",
    width: view === "list" ? 200 : "100%",
    height: view === "list" ? 120 : 180,
    overflow: "hidden",
    background: theme.palette.action.hover,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: view === "list" ? 120 : "100%",
      height: view === "list" ? 80 : 140,
    },
  })
);

export const ThumbnailImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  filter: "blur(3px)",
}));

export const OverlayGradient = styled(Box)(() => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "40%",
  background:
    "linear-gradient(180deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.2) 100%)",
  zIndex: 2,
}));

export const DurationBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1.25),
  bottom: theme.spacing(1.25),
  background: "rgba(0,229,255,0.9)",
  color: theme.palette.mode === "dark" ? "#000" : "#fff",
  padding: theme.spacing(0.4, 0.9),
  borderRadius: 6,
  fontSize: "0.72rem",
  zIndex: 5,
  boxShadow: "0 2px 6px rgba(0,229,255,0.3)",
}));

export const PlayButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  zIndex: 3,
  "&:hover": {
    background: "rgba(0,0,0,0.55)",
  },
}));

export const ActionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: theme.spacing(1),
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing(1),
  },
}));

export const Controls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 8,
  border: `1px solid #00e5ff`,
  width: 360,
  "&:hover": {
    borderColor: "#00bcd4",
  },
  "&.Mui-focused": {
    borderColor: "#00e5ff",
    boxShadow: "0 0 0 2px rgba(0,229,255,0.2)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
