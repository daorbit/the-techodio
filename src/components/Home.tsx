import { Box, Button, Typography, Card, Avatar, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Play, Headphones, TrendingUp, Users, Clock, Star } from "lucide-react";
import TrendingNow from "./NewTrendSection";

export default function NeuralNetworksHero() {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          textAlign: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? 'backgroundColor: "linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(45, 45, 45) 100%)"'
              : "#f8f9fa",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ mx: "auto" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            The Future of Tech Education
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Immerse yourself in cutting-edge technology through audio
            experiences and expert insights
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              <Play size={20} style={{ marginRight: 8 }} />
              Start Exploring
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              <Headphones size={20} style={{ marginRight: 8 }} />
              Browse Library
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 4 }}>
        <Box sx={{ mx: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 3,
            }}
          >
            {[
              { icon: Users, value: "2.5M+", label: "Active Users" },
              { icon: Headphones, value: "15K+", label: "Audio Episodes" },
              { icon: Clock, value: "500K+", label: "Hours Listened" },
              { icon: Star, value: "4.9", label: "Average Rating" },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: "8px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                  <stat.icon size={32} />
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 4 }}>
        <Box sx={{ mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{
              mb: 3,
              color: theme.palette.text.primary,
            }}
          >
            Explore Categories
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {[
              {
                title: "AI & Machine Learning",
                description:
                  "Dive into artificial intelligence and neural networks",
              },
              {
                title: "Web Development",
                description: "Modern frameworks and full-stack technologies",
              },
              {
                title: "Cybersecurity",
                description: "Protecting digital assets in the modern world",
              },
              {
                title: "Cloud Computing",
                description:
                  "Scalable infrastructure and deployment strategies",
              },
            ].map((category, index) => (
              <Card
                key={index}
                sx={{
                  p: 2,
                  borderRadius: "8px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <TrendingUp size={16} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="600">
                    {category.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label="Explore"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.75rem",
                      height: 24,
                    }}
                  />
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Trending Section */}
      <TrendingNow />
    </Box>
  );
}
