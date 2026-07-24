import React from 'react';
import { Card, Box, Typography, Button, Chip } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import EventSeatIcon from '@mui/icons-material/EventSeat';
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

  const seatDisplay = booking.seats && booking.seats.length > 0 ? booking.seats.join(', ') : 'Umum (Tanpa Kursi)';

  return (
    <Card
      className="ticket-stub"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '1px solid rgba(229, 9, 20, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        overflow: 'visible',
        mb: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: '#E50914',
        },
      }}
    >
      {/* Left Section: Movie Info & Barcode */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexGrow: 1,
          p: { xs: 2.5, sm: 3 },
          gap: 2.5,
          alignItems: 'center',
        }}
      >
        {/* Poster Thumbnail */}
        <Box
          component="img"
          src={posterUrl}
          alt={booking.showTitle}
          sx={{
            width: 100,
            height: 145,
            borderRadius: 3,
            objectFit: 'cover',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0,
          }}
        />

        {/* Info */}
        <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
            <Chip
              icon={<LocalMoviesIcon sx={{ fontSize: 14 }} />}
              label="E-TICKET BIOSKOP"
              size="small"
              sx={{
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                color: '#FF2E4D',
                fontWeight: 800,
                fontSize: '0.7rem',
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

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#FFD700' }}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {booking.schedule}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#FFF' }}>
              <EventSeatIcon sx={{ fontSize: 18, color: '#E50914' }} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Kursi: {seatDisplay}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#94A3B8' }}>
              <ConfirmationNumberIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {booking.quantity} Tiket
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Tanggal Pesan: {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* Perforation Line Separator */}
      <Box
        sx={{
          borderLeft: { md: '2px dashed rgba(255, 255, 255, 0.15)' },
          borderTop: { xs: '2px dashed rgba(255, 255, 255, 0.15)', md: 'none' },
          mx: { xs: 3, md: 0 },
          my: { xs: 0, md: 2 },
        }}
      />

      {/* Right Section: Stub Barcode & Cancel Action */}
      <Box
        sx={{
          p: 3,
          minWidth: { md: 230 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(9, 12, 21, 0.6)',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
          <QrCode2Icon sx={{ fontSize: 44, color: '#F8FAFC' }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: '#94A3B8' }}>
              TOTAL BAYAR
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FFD700' }}>
              Rp {booking.totalPrice.toLocaleString('id-ID')}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          startIcon={<DeleteIcon />}
          onClick={() => onCancelRequest(booking)}
          sx={{
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
