import React from "react";
import { Box, Button, Typography, Card, CardContent, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Star, Clock, Eye, Star as StarIcon, Play, Pause, X } from "lucide-react";
import TrendingNow from "./NewTrendSection";

export default function NeuralNetworksHero() {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(true);

  React.useEffect(() => {
    const bannerClosed = localStorage.getItem('welcomeBannerClosed');
    if (bannerClosed === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleStartListening = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem('welcomeBannerClosed', 'true');
  };
  return (
    <>
      {/* Welcome Banner */}
      {showBanner && (
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            py: { xs: 2, md: 3 },
            px: { xs: 2, md: 0 },
            mb: { xs: 3, md: 4 },
            // mx: { xs: 2, md: 0 },
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,152,0,0.1))'
              : 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(255,152,0,0.05))',
            borderRadius: '12px',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <IconButton
            onClick={handleCloseBanner}
            sx={{
              position: 'absolute',
              top: { xs: -8, md: -10 },
              right: { xs: -8, md: -10 },
              color: 'text.secondary',
              borderRadius: '50%',
              width: { xs: 28, md: 32 },
              height: { xs: 28, md: 32 },
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <X size={20} />
          </IconButton>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.125rem' },
              background: 'linear-gradient(90deg, #00e5ff, #ff9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Welcome to Funnel
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Discover the latest in Frontend Development through our curated audio content
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
            mb: 2,
          }}
        >
          <Star size={16} style={{ marginRight: 6 }} />
          <Typography variant="body2" fontWeight={500}>
            Featured Audiobook
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 0.5,
                background: "linear-gradient(90deg,#00e5ff,#ff9800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Deep Learning
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Audiobook Series
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 500 }}
            >
              Immerse yourself in the world of AI through our comprehensive
              audiobook series. Listen to expert insights, real-world
              applications, and cutting-edge research narrated by industry
              professionals.
            </Typography>

            {/* Meta Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Clock size={18} />
                <Typography variant="body2">25 episodes</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Eye size={18} />
                <Typography variant="body2">1.2M listens</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <StarIcon size={18} />
                <Typography variant="body2">4.8 rating</Typography>
              </Box>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleStartListening}
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? "#424242" : "black",
                  color: "white",
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 3,
                  "&:hover": {
                    bgcolor: theme.palette.mode === "dark" ? "#616161" : "#111",
                  },
                }}
              >
                {isPlaying ? (
                  <Pause size={18} style={{ marginRight: 8 }} />
                ) : (
                  <Play size={18} style={{ marginRight: 8 }} />
                )}
                {isPlaying ? "Stop Listening" : "Start Listening"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#00e5ff",
                  color: "#00e5ff",
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 3,
                  "&:hover": {
                    borderColor: "#00bcd4",
                    color: "#00bcd4",
                  },
                }}
              >
                Preview Audiobook
              </Button>
            </Box>
          </Box>

          {/* RIGHT */}
          <Box>
            <iframe
              width="100%"
              height="320"
              src={`https://www.youtube.com/embed/aircAruvnKk${
                isPlaying ? "?autoplay=1" : "?autoplay=0"
              }`}
              title="Deep Learning Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(0,229,255,0.7)",
                boxShadow: "0 0 25px rgba(0,229,255,0.5)",
              }}
            ></iframe>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mt: 6,
          }}
        >
          {[
            { value: "500K+", label: "Active Listeners" },
            { value: "97%", label: "Completion Rate" },
            { value: "10K+", label: "Hours of Content" },
            { value: "200+", label: "Expert Narrators" },
          ].map((stat, i) => (
            <Card
              key={i}
              sx={{
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(255,152,0,0.08))",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#00c4d6" }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <TrendingNow />
    </>
  );
}
