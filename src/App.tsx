import "./styles/layout.css";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AudioLibrary from "./components/AudioLibrary";
import VideoLibrary from "./components/VideoLibrary";
import Playlists from "./components/Playlists";
import PlaylistDetail from "./components/PlaylistDetail";
import AudioPlayer from "./components/player/AudioPlayer";
import VideoPlayer from "./components/player/VideoPlayer";
import MiniAudioPlayer from "./components/player/components/MiniAudioPlayer";
import { useThemeContext } from "./hooks/useThemeContext";
import { useAppDispatch } from "./store/hooks";
import { setShowMiniPlayer } from "./store/audioSlice";
import { useGlobalAudioPlayer } from "./hooks/useGlobalAudioPlayer";
import { useAppSelector } from "./store/hooks";
import NeuralNetworksHero from "./components/Home";
import AISuggestions from "./components/AISuggestions";

function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width:639px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeMode } = useThemeContext();
  const dispatch = useAppDispatch();
  const { currentTrack } = useAppSelector((state) => state.audio);

  useGlobalAudioPlayer();

  const isPlayerPage =
    location.pathname.startsWith("/audio-player") ||
    location.pathname.startsWith("/video-player");

  useEffect(() => {
    if (isPlayerPage) {
      dispatch(setShowMiniPlayer(false));
    } else if (currentTrack) {
      dispatch(setShowMiniPlayer(true));
    } else {
      dispatch(setShowMiniPlayer(false));
    }
  }, [isPlayerPage, dispatch, currentTrack]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const rootStyle: React.CSSProperties = {
    fontFamily:
      "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    minHeight: "100vh",
    width: "100%",
    color: themeMode === "dark" ? "#f1f5f9" : "#1e293b",
    transition: "all 0.3s ease",
  };

  const bodyStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const headerWrapperStyle: React.CSSProperties = {
    display: isMobile && !isPlayerPage ? "block" : "none",
  };

  const contentContainerStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
    minHeight: 0,
    marginTop: isMobile && !isPlayerPage ? "0px" : 0,
  };

  const sidebarWrapperStyle: React.CSSProperties = {
    width: isPlayerPage ? 0 : isMobile ? 0 : collapsed ? 64 : 240,
    transition: "width 0.25s ease",
    flex: "0 0 auto",
    overflow: "hidden",
  };

  const mainAreaStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: isPlayerPage ? "0" : "24px",
    overflowX: "hidden" as const,
    overflowY: "auto",
    background:
      themeMode === "dark"
        ? "radial-gradient(ellipse at top, #1a1a1a 0%, #0a0a0a 100%)"
        : "radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 100%)",
    minHeight: "100vh",
  };

  return (
    <>
      <CssBaseline />
      <div style={rootStyle}>
        <div style={headerWrapperStyle}>
          <Header
            isMobile={isMobile}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        </div>

        <div style={bodyStyle}>
          <div style={contentContainerStyle}>
            {!isPlayerPage && (
              <div style={sidebarWrapperStyle}>
                <Sidebar
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  isMobile={isMobile}
                  drawerOpen={drawerOpen}
                  setDrawerOpen={setDrawerOpen}
                />
              </div>
            )}

            <div style={mainAreaStyle}>
              <main style={contentStyle}>
                <Routes>
                  <Route path="/" element={<NeuralNetworksHero />} />
                  <Route path="/audio-library" element={<AudioLibrary />} />
                  <Route path="/video-library" element={<VideoLibrary />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:id" element={<PlaylistDetail />} />
                  <Route path="/audio-player/:id" element={<AudioPlayer />} />
                  <Route path="/video-player/:id" element={<VideoPlayer />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>

        <MiniAudioPlayer />

        <AISuggestions />
      </div>
    </>
  );
}

export default App;
