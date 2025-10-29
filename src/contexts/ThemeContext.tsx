import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  themeMode: 'light' | 'dark';
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
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('techodio-theme');
    return saved ? JSON.parse(saved) : 'dark';
  });

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('techodio-theme', JSON.stringify(themeMode));
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'dark' ? '#10b981' : '#059669',
        light: themeMode === 'dark' ? '#34d399' : '#10b981',
        dark: themeMode === 'dark' ? '#047857' : '#065f46',
        contrastText: '#ffffff',
      },
      secondary: {
        main: themeMode === 'dark' ? '#f59e0b' : '#db2777',
        light: themeMode === 'dark' ? '#fbbf24' : '#ec4899',
        dark: themeMode === 'dark' ? '#d97706' : '#9f1239',
        contrastText: '#ffffff',
      },
      background: {
        default: themeMode === 'dark' ? '#0a0a0a' : '#f8fafc',
        paper: themeMode === 'dark' ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: themeMode === 'dark' ? '#ffffff' : '#1e293b',
        secondary: themeMode === 'dark' ? '#d1d5db' : '#475569',
        disabled: themeMode === 'dark' ? '#9ca3af' : '#94a3b8',
      },
      divider: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.12)',
      action: {
        active: themeMode === 'dark' ? '#ffffff' : '#1e293b',
        hover: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(30, 41, 59, 0.04)',
        selected: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.08)',
        disabled: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(30, 41, 59, 0.26)',
        disabledBackground: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(30, 41, 59, 0.12)',
      },
      success: {
        main: themeMode === 'dark' ? '#10b981' : '#059669',
        light: themeMode === 'dark' ? '#34d399' : '#10b981',
        dark: themeMode === 'dark' ? '#047857' : '#065f46',
      },
      error: {
        main: themeMode === 'dark' ? '#ef4444' : '#dc2626',
        light: themeMode === 'dark' ? '#f87171' : '#ef4444',
        dark: themeMode === 'dark' ? '#b91c1c' : '#991b1b',
      },
      warning: {
        main: themeMode === 'dark' ? '#f59e0b' : '#d97706',
        light: themeMode === 'dark' ? '#fbbf24' : '#f59e0b',
        dark: themeMode === 'dark' ? '#b45309' : '#92400e',
      },
      info: {
        main: themeMode === 'dark' ? '#06b6d4' : '#0891b2',
        light: themeMode === 'dark' ? '#22d3ee' : '#06b6d4',
        dark: themeMode === 'dark' ? '#0e7490' : '#0c4a6e',
      },
    },
    typography: {
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none' as const,
        letterSpacing: '0.025em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: themeMode === 'dark' ? '#1a1a1a' : '#f1f5f9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: themeMode === 'dark' ? '#6366f1' : '#cbd5e1',
              borderRadius: '3px',
              '&:hover': {
                background: themeMode === 'dark' ? '#818cf8' : '#94a3b8',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeMode === 'dark' ? '#1a1a1a' : '#ffffff',
            border: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.1)'}`,
            borderRadius: '12px',
            boxShadow: themeMode === 'dark' 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)' 
              : '0 4px 6px -1px rgba(30, 41, 59, 0.1), 0 2px 4px -1px rgba(30, 41, 59, 0.06)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: themeMode === 'dark' 
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4)' 
                : '0 10px 15px -3px rgba(30, 41, 59, 0.1), 0 4px 6px -2px rgba(30, 41, 59, 0.05)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: themeMode === 'dark' ? '#1a1a1a' : '#ffffff',
            border: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.1)'}`,
            borderRadius: '8px',
            boxShadow: themeMode === 'dark' 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)' 
              : '0 1px 3px 0 rgba(30, 41, 59, 0.1), 0 1px 2px 0 rgba(30, 41, 59, 0.06)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: '0.025em',
            transition: 'all 0.2s ease-in-out',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            background: themeMode === 'dark' 
              ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
              : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
            '&:hover': {
              background: themeMode === 'dark' 
                ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' 
                : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            },
          },
          outlined: {
            borderColor: themeMode === 'dark' ? '#6366f1' : '#4f46e5',
            color: themeMode === 'dark' ? '#6366f1' : '#4f46e5',
            '&:hover': {
              borderColor: themeMode === 'dark' ? '#818cf8' : '#6366f1',
              backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: themeMode === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.1)'}`,
            boxShadow: themeMode === 'dark' 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.4)' 
              : '0 1px 3px 0 rgba(30, 41, 59, 0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: themeMode === 'dark' ? '#0a0a0a' : '#f8fafc',
            borderRight: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.1)'}`,
            boxShadow: themeMode === 'dark' 
              ? '4px 0 8px rgba(0, 0, 0, 0.5)' 
              : '4px 0 8px rgba(30, 41, 59, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            fontWeight: 500,
          },
          filled: {
            backgroundColor: themeMode === 'dark' ? '#2a2a2a' : '#e2e8f0',
            color: themeMode === 'dark' ? '#ffffff' : '#1e293b',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: themeMode === 'dark' ? 'rgba(26, 26, 26, 0.5)' : 'rgba(248, 250, 252, 0.5)',
              '& fieldset': {
                borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 41, 59, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: themeMode === 'dark' ? '#6366f1' : '#4f46e5',
              },
              '&.Mui-focused fieldset': {
                borderColor: themeMode === 'dark' ? '#6366f1' : '#4f46e5',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, isDarkMode: themeMode === 'dark', toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};