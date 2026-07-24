import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#090C15',
      paper: '#121726',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
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
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#090C15',
          color: '#F8FAFC',
          scrollbarColor: '#1E2640 #090C15',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#090C15',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#1E2640',
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
          backgroundColor: '#121726',
          backgroundImage: 'none',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 22px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.25s ease-in-out',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
        filled: {
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});
