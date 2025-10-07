import { IconButton, Box } from "@mui/material";
import { Menu, Sun, Moon } from "lucide-react";
import { useThemeContext } from "../../hooks/useThemeContext";

interface HeaderProps {
  isMobile: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const Header = ({ isMobile, drawerOpen, setDrawerOpen }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  if (!isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: "100%",
        background: isDarkMode
          ? "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
          : "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
        color: "#fff",
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
        backdropFilter: "blur(10px)",
        boxShadow: isDarkMode 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)' 
          : '0 4px 6px -1px rgba(30, 41, 59, 0.1)',
      }}
    >
      <IconButton
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{
          color: "#fff",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)",
            transform: "scale(1.05)",
          },
        }}
      >
        <Menu size={24} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: "#fff",
            borderRadius: "8px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.05)",
            },
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
