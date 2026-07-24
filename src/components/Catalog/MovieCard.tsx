import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Link as RouterLink } from 'react-router-dom';
import type { Show } from '../../types';

interface MovieCardProps {
  show: Show;
}

export const MovieCard: React.FC<MovieCardProps> = ({ show }) => {
  const posterUrl = show.image?.medium || show.image?.original || 'https://via.placeholder.com/300x420/121726/FFFFFF?text=No+Poster';
  const ratingValue = show.rating?.average ? show.rating.average / 2 : null;

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
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'rgba(229, 9, 20, 0.6)',
          boxShadow: '0 16px 40px rgba(229, 9, 20, 0.25)',
          '& .movie-poster': {
            transform: 'scale(1.05)',
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
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Rating Badge Overlay */}
        {show.rating?.average && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(9, 12, 21, 0.85)',
              backdropFilter: 'blur(8px)',
              px: 1.2,
              py: 0.4,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              border: '1px solid rgba(255, 215, 0, 0.4)',
            }}
          >
            <StarIcon sx={{ color: '#FFD700', fontSize: 16 }} />
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
            background: 'linear-gradient(to top, rgba(9, 12, 21, 0.95) 0%, rgba(9, 12, 21, 0.4) 60%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            pb: 3,
            px: 2,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: '#E50914',
              color: '#FFF',
              py: 1,
              px: 2.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '0.875rem',
              boxShadow: '0 4px 14px rgba(229, 9, 20, 0.5)',
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 18 }} />
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
            fontSize: '1.05rem',
            lineHeight: 1.3,
            mb: 1,
            color: '#F8FAFC',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {show.name}
        </Typography>

        {ratingValue && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Rating value={ratingValue} precision={0.5} readOnly size="small" sx={{ color: '#FFD700' }} />
          </Box>
        )}

        {/* Genre Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
          {show.genres.slice(0, 2).map((genre) => (
            <Chip
              key={genre}
              label={genre}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 22,
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
