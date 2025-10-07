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
          ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
          : "linear-gradient(180deg, #4440cc 0%, #3733b3 100%)",
        color: "#fff",
      }}
    >
      <IconButton
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{
          color: "#fff",
        }}
      >
        <Menu size={24} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: "#fff",
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
