import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, Container, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import { AuthModal } from '../Auth/AuthModal';

export const HeaderNav: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const totalTickets = bookings.reduce((sum, b) => sum + b.quantity, 0);

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

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'rgba(9, 12, 21, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
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
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #E50914 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CineVerse
              </Typography>
            </Box>

            {/* Navigation Links & User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              <Button
                component={RouterLink}
                to="/"
                startIcon={<MovieFilterIcon />}
                sx={{
                  borderRadius: '6px',
                  color: location.pathname === '/' ? '#E50914' : '#94A3B8',
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
                  <Badge badgeContent={totalTickets} color="primary" max={99}>
                    <ConfirmationNumberIcon />
                  </Badge>
                }
                sx={{
                  borderRadius: '6px',
                  color: location.pathname === '/my-tickets' ? '#E50914' : '#94A3B8',
                  fontWeight: location.pathname === '/my-tickets' ? 700 : 500,
                  backgroundColor: location.pathname === '/my-tickets' ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                }}
              >
                Tiket Saya
              </Button>

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
                      color: '#FFF',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
                          backgroundColor: '#121726',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F8FAFC',
                        },
                      },
                    }}
                  >
                    <MenuItem disabled sx={{ opacity: 1, color: '#94A3B8', fontSize: '0.8rem' }}>
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
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
