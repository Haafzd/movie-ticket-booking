import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';
import type { Show } from '../../types';

interface MovieCardProps {
  show: Show;
}

export const MovieCard: React.FC<MovieCardProps> = ({ show }) => {
  const posterUrl = show.image?.medium || show.image?.original || 'https://via.placeholder.com/300x420/121726/FFFFFF?text=No+Poster';

  return (
    <Card
      component={RouterLink}
      to={`/show/${show.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '8px',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: '#E50914',
          boxShadow: '0 12px 28px rgba(229, 9, 20, 0.2)',
          '& .movie-poster': {
            transform: 'scale(1.04)',
          },
          '& .booking-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Poster Media */}
      <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '140%' }}>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={show.name}
          className="movie-poster"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />

        {/* Rating Badge Overlay */}
        {show.rating?.average && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(9, 12, 21, 0.85)',
              px: 1,
              py: 0.3,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              border: '1px solid rgba(255, 215, 0, 0.4)',
            }}
          >
            <StarIcon sx={{ color: '#FFD700', fontSize: 14 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#FFF' }}>
              {show.rating.average.toFixed(1)}
            </Typography>
          </Box>
        )}

        {/* Quick Booking Overlay */}
        <Box
          className="booking-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(9, 12, 21, 0.9) 0%, transparent 80%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            pb: 2,
            px: 2,
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#E50914',
              color: '#FFF',
              py: 0.8,
              px: 2,
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            Pesan Tiket
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.3,
            mb: 1.5,
            color: '#F8FAFC',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {show.name}
        </Typography>

        {/* Genre Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
          {show.genres.slice(0, 2).map((genre) => (
            <Chip
              key={genre}
              label={genre}
              size="small"
              sx={{
                fontSize: '0.68rem',
                height: 22,
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#94A3B8',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            />
          ))}
          {show.genres.length > 2 && (
            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center', ml: 0.5 }}>
              +{show.genres.length - 2}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
