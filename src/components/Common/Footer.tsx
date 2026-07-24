import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 2,
        backgroundColor: '#06080F',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justify: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalMoviesIcon sx={{ color: '#E50914', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              © 2026 CineVerse - Movie Ticket Booking Experience. Data provided by TVMaze API.
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Project PRD v1.0 | Telkom University
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
