import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
  IconButton,
  type ListItemButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import {
  Home,
  // LayoutList,
  PanelLeftOpen,
  PanelLeftClose,
  Music,
  // Video,
  Sun,
  Moon,
  ListMusic,
} from "lucide-react";

import { useThemeContext } from "../../hooks/useThemeContext";

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  drawerOpen?: boolean;
  setDrawerOpen?: (open: boolean) => void;
}

interface StyledListItemButtonProps extends ListItemButtonProps {
  $active?: boolean;
}

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: "none",
  width: "100%",
  display: "block",
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "$active" && prop !== "$isDarkMode",
})<StyledListItemButtonProps & { $isDarkMode?: boolean }>(
  ({ $active, $isDarkMode }) => ({
    marginBottom: 12,
    padding: "0.4em",
    paddingLeft: "10px",
    borderRadius: 10,
    transition: "background 0.2s, color 0.2s",
    background: $active
      ? $isDarkMode
        ? "rgba(16,185,129,0.1)"
        : "rgba(5,150,105,0.15)"
      : "inherit",
    color: $active
      ? $isDarkMode
        ? "#10b981"
        : "#000"
      : $isDarkMode
      ? "#fff"
      : "#000",

    "&:hover": {
      background: $active
        ? $isDarkMode
          ? "rgba(16,185,129,0.15)"
          : "rgba(5,150,105,0.25)"
        : $isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.04)",
      color: $active
        ? $isDarkMode
          ? "#10b981"
          : "#000"
        : $isDarkMode
        ? "#fff"
        : "#000",
    },

    "& .MuiListItemIcon-root": {
      color: $active
        ? $isDarkMode
          ? "#10b981"
          : "#000"
        : $isDarkMode
        ? "#fff"
        : "#000",
      transition: "color 0.2s",
    },
  })
);

const NAV_ITEMS = [
  { text: "Home", icon: <Home size={18} />, path: "/" },
  // { text: "Dashboard", icon: <LayoutList size={18} />, path: "/dashboard" },
  { text: "Audio Library", icon: <Music size={18} />, path: "/audio-library" },
  // { text: "Video Library", icon: <Video size={18} />, path: "/video-library" },
  { text: "Playlists", icon: <ListMusic size={18} />, path: "/playlists" },
];

const ThemeToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "$isDarkMode" && prop !== "$collapsed",
})<{ $isDarkMode?: boolean; $collapsed?: boolean }>(
  ({ $isDarkMode, $collapsed }) => ({
    width: $collapsed ? 40 : "100%",
    height: $collapsed ? 40 : 48,
    borderRadius: $collapsed ? "50%" : 12,
    background: $isDarkMode ? "rgba(16,185,129,0.1)" : "rgba(5,150,105,0.1)",
    border: `1px solid ${
      $isDarkMode ? "rgba(16,185,129,0.3)" : "rgba(5,150,105,0.3)"
    }`,
    color: $isDarkMode ? "#10b981" : "#059669",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: $collapsed ? 0 : 12,
    padding: $collapsed ? 8 : "12px 16px",
    margin: $collapsed ? "0 auto" : 0,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(255,152,0,0.1) 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },

    "&:hover": {
      background: $isDarkMode ? "rgba(0,229,255,0.2)" : "rgba(0,229,255,0.2)",
      borderColor: $isDarkMode ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.5)",
      transform: "translateY(0px)",

      "&::before": {
        opacity: 1,
      },
    },

    "&:active": {
      transform: "translateY(0)",
    },
  })
);

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  setCollapsed,
  isMobile = false,
  drawerOpen = false,
  setDrawerOpen,
}) => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const drawerWidth = isMobile ? 240 : collapsed ? 64 : 240;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? drawerOpen : true}
      onClose={isMobile ? () => setDrawerOpen?.(false) : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          borderRadius: "0px 16px 16px 0px",
          width: drawerWidth,
          boxSizing: "border-box",
          background: isDarkMode
            ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          color: isDarkMode ? "#fff" : "#1a1a1a",
          padding: "0px 12px",
          borderRight: isDarkMode ? "1px solid #333" : "1px solid #e1e5e9",
          boxShadow: isDarkMode
            ? "2px 0 8px rgba(0,0,0,0.3)"
            : "2px 0 8px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          my: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            background: isDarkMode
              ? "linear-gradient(90deg,#00e5ff,#ff9800)"
              : "none",
            WebkitBackgroundClip: isDarkMode ? "text" : "initial",
            WebkitTextFillColor: isDarkMode ? "transparent" : "initial",
            color: isDarkMode ? "transparent" : "#1a1a1a",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "" : "The Techodio"}
        </Typography>
        <Box
          onClick={() =>
            isMobile ? setDrawerOpen?.(false) : setCollapsed(!collapsed)
          }
          sx={{ color: isDarkMode ? "#fff" : "#666", cursor: "pointer" }}
        >
          {isMobile ? (
            <PanelLeftClose size={22} />
          ) : collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </Box>
      </Box>

      <List sx={{ mt: 4 }}>
        {NAV_ITEMS.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <StyledNavLink to={path} end={path === "/"}>
              {({ isActive }) => (
                <StyledListItemButton
                  $active={isActive}
                  $isDarkMode={isDarkMode}
                  onClick={isMobile ? () => setDrawerOpen?.(false) : undefined}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : 1,
                    px: collapsed ? "8px" : undefined,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 1 }}>
                    {icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={text} />}
                </StyledListItemButton>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </List>

      {/* Theme Toggle - only show on desktop */}
      {!isMobile && (
        <Box
          sx={{
            mt: "auto",
            mb: 2,
            px: 2,
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <ThemeToggleButton
            $isDarkMode={isDarkMode}
            $collapsed={collapsed}
            onClick={toggleTheme}
            disableRipple
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            {!collapsed && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
            )}
          </ThemeToggleButton>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;
