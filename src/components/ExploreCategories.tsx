import { Box, Typography, Card, Avatar, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExploreCategories() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle: string) => {
    const categoryPlaylists = {
      "System Design": "69006a5ac5f5d2ed24c2e5b8",
      "Web Development": "69006a5ac5f5d2ed24c2e5b9",
      Cybersecurity: "69006a5ac5f5d2ed24c2e5ba",
      "Cloud Computing": "69006a5ac5f5d2ed24c2e5bb",
    };

    const playlistId =
      categoryPlaylists[categoryTitle as keyof typeof categoryPlaylists];
    if (playlistId) {
      navigate(`/playlists/${playlistId}`);
    }
  };

  return (
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
              description: "Architecting scalable and efficient systems",
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
              description: "Scalable infrastructure and deployment strategies",
            },
          ].map((category, index) => (
            <Card
              key={index}
              onClick={() => handleCategoryClick(category.title)}
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
  );
}
