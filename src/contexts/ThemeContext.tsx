import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };
export type { ThemeContextType };

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: isDarkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: isDarkMode ? '#121212' : '#fafafa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDarkMode ? '#2a2a2a' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDarkMode ? '#555555' : '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: isDarkMode ? '#777777' : '#a8a8a8',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            '&:hover': {
              boxShadow: 'none !important',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            '&:hover': {
              boxShadow: 'none !important',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: 'none !important',
            borderRight: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};