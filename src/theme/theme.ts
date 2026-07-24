import { createTheme } from '@mui/material/styles';

export const getCustomTheme = (mode: 'dark' | 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#E50914',
        light: '#FF2E4D',
        dark: '#B20710',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFD700',
        light: '#FFE44D',
        dark: '#C7A600',
        contrastText: '#000000',
      },
      background: {
        default: isDark ? '#090C15' : '#F8FAFC',
        paper: isDark ? '#121726' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
      error: {
        main: '#EF4444',
      },
      success: {
        main: '#10B981',
      },
      warning: {
        main: '#F59E0B',
      },
      info: {
        main: '#3B82F6',
      },
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontFamily: '"Bebas Neue", "Plus Jakarta Sans", sans-serif',
        letterSpacing: '0.05em',
        fontWeight: 700,
      },
      h2: {
        fontFamily: '"Bebas Neue", "Plus Jakarta Sans", sans-serif',
        letterSpacing: '0.04em',
        fontWeight: 700,
      },
      h3: {
        fontFamily: '"Bebas Neue", "Plus Jakarta Sans", sans-serif',
        letterSpacing: '0.03em',
        fontWeight: 700,
      },
      h4: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
      },
      button: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#090C15' : '#F8FAFC',
            color: isDark ? '#F8FAFC' : '#0F172A',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            scrollbarColor: isDark ? '#1E2640 #090C15' : '#CBD5E1 #F8FAFC',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? '#090C15' : '#F8FAFC',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? '#1E2640' : '#CBD5E1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#E50914',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#121726' : '#FFFFFF',
            backgroundImage: 'none',
            borderRadius: 8,
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 4px 20px 0 rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 20px',
            fontSize: '0.95rem',
            boxShadow: 'none',
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
          },
          filled: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
};
