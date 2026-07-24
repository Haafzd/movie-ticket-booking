import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3.5,
        px: 2,
        backgroundColor: '#06080F',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 0.8,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            © 2026 CineVerse - Movie Ticket Booking Experience. Data provided by TVMaze API.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
            Project PRD v1.0 | Telkom University
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
