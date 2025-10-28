import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Play, Headphones } from "lucide-react";
import Lottie from "lottie-react";
import homePagePodcastAnimation from "./shared/Animations/homePagePodcastAnimation.json";
import TrendingNow from "./NewTrendSection";
import ExploreCategories from "./ExploreCategories";

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
           

          <ExploreCategories />

          <TrendingNow />

          {/* Trending Section */}
        </Box>
      </Box>
    </Box>
  );
}
