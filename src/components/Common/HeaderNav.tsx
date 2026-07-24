import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Container,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import { useThemeMode } from '../../hooks/useThemeMode';
import { AuthModal } from '../Auth/AuthModal';

export const HeaderNav: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { mode, toggleThemeMode } = useThemeMode();

  const user = useAppSelector((state) => state.auth.user);
  const bookings = useAppSelector((state) => state.booking.bookings);

  // Tickets count belongs only to logged in user
  const userBookings = user ? bookings.filter((b) => b.userId === user.id) : [];
  const totalTickets = userBookings.reduce((sum, b) => sum + b.quantity, 0);

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
  };

  const isDark = mode === 'dark';

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: isDark ? 'rgba(9, 12, 21, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 4px 30px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 70 }}>
            {/* Brand Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(229, 9, 20, 0.5)',
                }}
              >
                <LocalMoviesIcon sx={{ color: '#FFF', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  letterSpacing: '1px',
                  background: isDark
                    ? 'linear-gradient(90deg, #FFFFFF 0%, #E50914 100%)'
                    : 'linear-gradient(90deg, #0F172A 0%, #E50914 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CineVerse
              </Typography>
            </Box>

            {/* Navigation Links & Control Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
              <Button
                component={RouterLink}
                to="/"
                startIcon={<MovieFilterIcon />}
                sx={{
                  borderRadius: '6px',
                  color: location.pathname === '/' ? '#E50914' : isDark ? '#94A3B8' : '#475569',
                  fontWeight: location.pathname === '/' ? 700 : 500,
                  backgroundColor: location.pathname === '/' ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                }}
              >
                Katalog Film
              </Button>

              <Button
                component={RouterLink}
                to="/my-tickets"
                startIcon={
                  <Badge badgeContent={user ? totalTickets : 0} color="primary" max={99}>
                    <ConfirmationNumberIcon />
                  </Badge>
                }
                sx={{
                  borderRadius: '6px',
                  color: location.pathname === '/my-tickets' ? '#E50914' : isDark ? '#94A3B8' : '#475569',
                  fontWeight: location.pathname === '/my-tickets' ? 700 : 500,
                  backgroundColor: location.pathname === '/my-tickets' ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                }}
              >
                Tiket Saya
              </Button>

              {/* Theme Mode Toggle Switcher */}
              <Tooltip title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}>
                <IconButton
                  onClick={toggleThemeMode}
                  sx={{
                    color: isDark ? '#FFD700' : '#0F172A',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  {isDark ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>

              {/* User Account / Auth Control */}
              {user ? (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    startIcon={
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: '0.85rem',
                          backgroundColor: '#E50914',
                          fontWeight: 700,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{
                      borderRadius: '6px',
                      color: isDark ? '#FFF' : '#0F172A',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {user.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    slotProps={{
                      paper: {
                        style: {
                          backgroundColor: isDark ? '#121726' : '#FFFFFF',
                          borderRadius: '8px',
                          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                          color: isDark ? '#F8FAFC' : '#0F172A',
                        },
                      },
                    }}
                  >
                    <MenuItem disabled sx={{ opacity: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                      Signed in as {user.email}
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: '#EF4444', gap: 1 }}>
                      <LogoutIcon fontSize="small" /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  variant="contained"
                  size="small"
                  startIcon={<PersonIcon />}
                  sx={{ borderRadius: '6px', fontWeight: 700 }}
                >
                  Masuk / Daftar
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
