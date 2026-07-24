import React from 'react';
import { Box, Typography, Chip, Rating, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { Show } from '../../types';

interface MovieHeroProps {
  show: Show;
}

export const MovieHero: React.FC<MovieHeroProps> = ({ show }) => {
  const posterUrl = show.image?.original || show.image?.medium || 'https://via.placeholder.com/400x600/121726/FFFFFF?text=No+Poster';
  const ratingValue = show.rating?.average ? show.rating.average / 2 : null;

  // Clean HTML tags from TVMaze summary string safely
  const cleanSummary = show.summary
    ? show.summary.replace(/<[^>]*>?/gm, '')
    : 'Tidak ada sinopsis yang tersedia untuk film ini.';

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        borderRadius: 6,
        overflow: 'hidden',
        mb: 5,
        backgroundColor: '#121726',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Blurred Backdrop Accent */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) brightness(0.25)',
          transform: 'scale(1.1)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 5 },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Poster Container */}
        <Box
          sx={{
            width: { xs: 240, sm: 280, md: 320 },
            flexShrink: 0,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <Box
            component="img"
            src={posterUrl}
            alt={show.name}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Movie Info & Summary */}
        <Box sx={{ flexGrow: 1, color: '#F8FAFC' }}>
          {/* Status & Genres */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, alignItems: 'center' }}>
            {show.status && (
              <Chip
                label={show.status}
                size="small"
                sx={{
                  backgroundColor: '#E50914',
                  color: '#FFF',
                  fontWeight: 700,
                }}
              />
            )}
            {show.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#CBD5E1',
                }}
              />
            ))}
          </Box>

          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.1,
              mb: 2,
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '1px',
            }}
          >
            {show.name}
          </Typography>

          {/* Rating & Quick Metrics */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center', mb: 3 }}>
            {show.rating?.average && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ color: '#FFD700', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFD700' }}>
                  {show.rating.average.toFixed(1)} / 10
                </Typography>
                {ratingValue && <Rating value={ratingValue} precision={0.5} readOnly size="small" />}
              </Box>
            )}

            {show.runtime && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#94A3B8' }}>
                <AccessTimeIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">{show.runtime} Menit</Typography>
              </Box>
            )}

            {show.language && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#94A3B8' }}>
                <LanguageIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">{show.language}</Typography>
              </Box>
            )}

            {show.premiered && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#94A3B8' }}>
                <CalendarMonthIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">{show.premiered.slice(0, 4)}</Typography>
              </Box>
            )}
          </Box>

          {/* Synopsis */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#FFF' }}>
            Sinopsis Film
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#CBD5E1',
              lineHeight: 1.7,
              fontSize: '1rem',
            }}
          >
            {cleanSummary}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
