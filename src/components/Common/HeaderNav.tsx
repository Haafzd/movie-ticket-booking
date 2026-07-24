import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, Container, Box } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const HeaderNav: React.FC = () => {
  const location = useLocation();
  const bookings = useAppSelector((state) => state.booking.bookings);
  const totalTickets = bookings.reduce((sum, b) => sum + b.quantity, 0);

  return (
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
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(229, 9, 20, 0.6)',
              }}
            >
              <LocalMoviesIcon sx={{ color: '#FFF', fontSize: 26 }} />
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

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<MovieFilterIcon />}
              sx={{
                color: location.pathname === '/' ? '#E50914' : '#94A3B8',
                fontWeight: location.pathname === '/' ? 700 : 500,
                backgroundColor: location.pathname === '/' ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                '&:hover': {
                  color: '#FFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
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
                color: location.pathname === '/my-tickets' ? '#E50914' : '#94A3B8',
                fontWeight: location.pathname === '/my-tickets' ? 700 : 500,
                backgroundColor: location.pathname === '/my-tickets' ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                '&:hover': {
                  color: '#FFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              Tiket Saya
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
