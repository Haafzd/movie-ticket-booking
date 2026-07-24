import React, { useState } from 'react';
import { Container, Typography, Box, Button, Alert, Snackbar } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MovieIcon from '@mui/icons-material/Movie';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { cancelBooking } from '../store/slices/bookingSlice';
import { TicketStubCard } from '../components/Tickets/TicketStubCard';
import { CancelConfirmModal } from '../components/Tickets/CancelConfirmModal';
import type { TicketBooking } from '../types';

const MyTicketsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state) => state.booking.bookings);

  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<TicketBooking | null>(null);
  const [showCancelToast, setShowCancelToast] = useState<boolean>(false);

  const handleOpenCancelModal = (booking: TicketBooking) => {
    setSelectedBookingForCancel(booking);
  };

  const handleConfirmCancel = (bookingId: string) => {
    dispatch(cancelBooking(bookingId));
    setSelectedBookingForCancel(null);
    setShowCancelToast(true);
  };

  return (
    <Container maxWidth="lg" className="fade-in">
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 0.8,
            borderRadius: 8,
            backgroundColor: 'rgba(229, 9, 20, 0.12)',
            border: '1px solid rgba(229, 9, 20, 0.3)',
            mb: 2,
          }}
        >
          <ConfirmationNumberIcon sx={{ color: '#E50914', fontSize: 22 }} />
          <Typography variant="subtitle1" sx={{ color: '#FFF', fontWeight: 800 }}>
            DOMPET TIKET SAYA
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.4rem', sm: '3.2rem' },
            fontFamily: '"Bebas Neue", sans-serif',
            letterSpacing: '1px',
            mb: 1,
          }}
        >
          Daftar Tiket Bioskop Terpesan
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Kelola dan tunjukkan e-ticket fisik digital Anda saat memasuki studio bioskop.
        </Typography>
      </Box>

      {/* Main Content */}
      {bookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Alert
            severity="info"
            variant="outlined"
            sx={{
              maxWidth: 550,
              mx: 'auto',
              borderRadius: 4,
              p: 3,
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#FFF' }}>
              Belum Ada Tiket Terpesan
            </Typography>
            Anda belum memesan tiket film apapun saat ini. Jelajahi katalog bioskop CineVerse dan tentukan jadwal tontonanmu!
          </Alert>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            startIcon={<MovieIcon />}
            sx={{ mt: 4, py: 1.5, px: 4, fontWeight: 700 }}
          >
            Cari & Pesan Tiket Now
          </Button>
        </Box>
      ) : (
        <Box>
          {bookings.map((booking) => (
            <TicketStubCard
              key={booking.id}
              booking={booking}
              onCancelRequest={handleOpenCancelModal}
            />
          ))}
        </Box>
      )}

      {/* Cancellation Confirmation Modal */}
      <CancelConfirmModal
        open={Boolean(selectedBookingForCancel)}
        booking={selectedBookingForCancel}
        onClose={() => setSelectedBookingForCancel(null)}
        onConfirmCancel={handleConfirmCancel}
      />

      {/* Cancel Toast Notification */}
      <Snackbar
        open={showCancelToast}
        autoHideDuration={4000}
        onClose={() => setShowCancelToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowCancelToast(false)}
          severity="info"
          variant="filled"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{
            width: '100%',
            backgroundColor: '#3B82F6',
            color: '#FFF',
            fontWeight: 700,
            borderRadius: 3,
          }}
        >
          Pemesanan tiket berhasil dibatalkan.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyTicketsPage;
