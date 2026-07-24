import React from 'react';
import { Card, Box, Typography, Button, Chip } from '@mui/material';
import type { TicketBooking } from '../../types';

interface TicketStubCardProps {
  booking: TicketBooking;
  onCancelRequest: (booking: TicketBooking) => void;
}

export const TicketStubCard: React.FC<TicketStubCardProps> = ({ booking, onCancelRequest }) => {
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
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'visible',
        mb: 2.5,
        borderRadius: '8px',
        transition: 'transform 0.25s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: '#E50914',
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
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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

          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#FFF', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.5px' }}>
            {booking.showTitle}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600, color: '#F8FAFC', mb: 0.5 }}>
            Jadwal: {booking.schedule}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Kursi: <span style={{ color: '#FFD700', fontWeight: 700 }}>{seatDisplay}</span> | Jumlah: {booking.quantity} Tiket
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Tanggal Pesan: {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Perforation Line Separator */}
      <Box
        sx={{
          borderLeft: { md: '2px dashed rgba(255, 255, 255, 0.12)' },
          borderTop: { xs: '2px dashed rgba(255, 255, 255, 0.12)', md: 'none' },
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
          backgroundColor: 'rgba(9, 12, 21, 0.6)',
          gap: 1.5,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: '#94A3B8' }}>
            TOTAL BAYAR
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FFD700' }}>
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
