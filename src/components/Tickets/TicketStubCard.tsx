import React from 'react';
import { Card, Box, Typography, Button, Chip, useTheme } from '@mui/material';
import type { TicketBooking } from '../../types';

interface TicketStubCardProps {
  booking: TicketBooking;
  onCancelRequest: (booking: TicketBooking) => void;
}

export const TicketStubCard: React.FC<TicketStubCardProps> = ({ booking, onCancelRequest }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const posterUrl = booking.posterUrl || 'https://via.placeholder.com/200x300/121726/FFFFFF?text=No+Poster';
  const formattedDate = new Date(booking.bookingDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const seatDisplay = booking.seats && booking.seats.length > 0 ? booking.seats.join(', ') : 'Umum';

  return (
    <Card
      className="ticket-stub"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '1px solid rgba(229, 9, 20, 0.3)',
        boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'visible',
        mb: 2.5,
        borderRadius: '8px',
        backgroundColor: 'background.paper',
        transition: 'transform 0.25s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: '#E50914',
        },
        /* Perforation circle notches match page background in both Dark and Light modes */
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          width: '20px',
          height: '20px',
          backgroundColor: 'background.default',
          borderRadius: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
        },
        '&::before': {
          left: '-10px',
          boxShadow: isDark
            ? 'inset -2px 0 4px rgba(0, 0, 0, 0.5)'
            : 'inset -2px 0 4px rgba(0, 0, 0, 0.08)',
          borderRight: isDark ? '1px solid rgba(229, 9, 20, 0.3)' : '1px solid rgba(229, 9, 20, 0.2)',
        },
        '&::after': {
          right: '-10px',
          boxShadow: isDark
            ? 'inset 2px 0 4px rgba(0, 0, 0, 0.5)'
            : 'inset 2px 0 4px rgba(0, 0, 0, 0.08)',
          borderLeft: isDark ? '1px solid rgba(229, 9, 20, 0.3)' : '1px solid rgba(229, 9, 20, 0.2)',
        },
      }}
    >
      {/* Left Section: Movie Info & Details */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexGrow: 1,
          p: { xs: 2, sm: 2.5 },
          gap: 2,
          alignItems: 'center',
        }}
      >
        {/* Poster Thumbnail */}
        <Box
          component="img"
          src={posterUrl}
          alt={booking.showTitle}
          sx={{
            width: 90,
            height: 130,
            borderRadius: '6px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            flexShrink: 0,
          }}
        />

        {/* Info */}
        <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 0.8 }}>
            <Chip
              label="E-TICKET BIOSKOP"
              size="small"
              sx={{
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                color: '#FF2E4D',
                fontWeight: 700,
                fontSize: '0.7rem',
                borderRadius: '4px',
                border: '1px solid rgba(229, 9, 20, 0.3)',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              ID: {booking.id}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: 'text.primary',
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            {booking.showTitle}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
            Jadwal: {booking.schedule}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Kursi: <span style={{ color: '#E50914', fontWeight: 700 }}>{seatDisplay}</span> | Jumlah: {booking.quantity} Tiket
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Tanggal Pesan: {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Perforation Line Separator */}
      <Box
        sx={{
          borderLeft: { md: isDark ? '2px dashed rgba(255, 255, 255, 0.12)' : '2px dashed rgba(0, 0, 0, 0.12)' },
          borderTop: { xs: isDark ? '2px dashed rgba(255, 255, 255, 0.12)' : '2px dashed rgba(0, 0, 0, 0.12)', md: 'none' },
          mx: { xs: 2, md: 0 },
          my: { xs: 0, md: 2 },
        }}
      />

      {/* Right Section: Stub Price & Cancel Action */}
      <Box
        sx={{
          p: 2.5,
          minWidth: { md: 210 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'rgba(9, 12, 21, 0.6)' : 'rgba(241, 245, 249, 0.8)',
          gap: 1.5,
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'text.secondary' }}>
            TOTAL BAYAR
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#FFD700' : '#D97706' }}>
            Rp {booking.totalPrice.toLocaleString('id-ID')}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          onClick={() => onCancelRequest(booking)}
          sx={{
            borderRadius: '6px',
            borderColor: 'rgba(239, 68, 68, 0.4)',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              borderColor: '#EF4444',
            },
          }}
        >
          Batalkan Tiket
        </Button>
      </Box>
    </Card>
  );
};
