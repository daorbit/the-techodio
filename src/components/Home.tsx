import { Box, Button, Typography, Card, Avatar, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Play, Headphones, TrendingUp } from "lucide-react";
import Lottie from "lottie-react";
import homePagePodcastAnimation from "./shared/Animations/homePagePodcastAnimation.json";
import TrendingNow from "./NewTrendSection";

export default function NeuralNetworksHero() {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box>
          <Box
            sx={{
              mx: "auto",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontSize: { xs: "2.25rem", md: "4rem" },
                }}
              >
                The Future of{" "}
                <Box component="span" sx={{ color: theme.palette.info.main }}>
                  Tech
                </Box>
                {"\n"}
                <Box component="span" display="block">
                  Education
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  maxWidth: 760,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Immerse yourself in cutting-edge technology through expertly
                crafted audio experiences and insights from industry leaders.
                Learn at your own pace, anywhere, anytime.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                  // flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Play size={18} />}
                  sx={{
                    px: 3,
                    borderRadius: "10px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: theme.palette.info.main,
                    color: theme.palette.info.main,
                    fontSize: { xs: "0.8rem", md: "1rem" },
                    "&:hover": {
                      backgroundColor: "rgba(6,182,212,0.06)",
                      color: theme.palette.info.light,
                      borderColor: theme.palette.info.light,
                    },
                  }}
                >
                  Start Exploring
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Headphones size={18} />}
                  sx={{
                    px: 4,
                    borderRadius: "10px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: theme.palette.info.main,
                    color: theme.palette.info.main,
                    fontSize: { xs: "0.8rem", md: "1rem" },

                    "&:hover": {
                      backgroundColor: "rgba(6,182,212,0.06)",
                      color: theme.palette.info.light,
                      borderColor: theme.palette.info.light,
                    },
                  }}
                >
                  Browse Library
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: { md: "600px" },
              }}
            >
              <Lottie
                animationData={homePagePodcastAnimation}
                loop={true}
                autoplay={true}
                style={{ width: "600px", height: "auto" }}
              />
            </Box>
          </Box>
           

          <Box sx={{ paddingTop: 4 }}>
            <Box sx={{ mx: "auto" }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="left"
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
                    title: "System Design",
                    description:
                      "Architecting scalable and efficient systems",
                  },
                  {
                    title: "Web Development",
                    description:
                      "Modern frameworks and full-stack technologies",
                  },
                  {
                    title: "Cybersecurity",
                    description:
                      "Protecting digital assets in the modern world",
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
          <TrendingNow />

          {/* Trending Section */}
        </Box>
      </Box>
    </Box>
  );
}
