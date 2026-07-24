import React, { useState } from 'react';
import { Container, Typography, Box, Button, Alert, Snackbar } from '@mui/material';
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
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Alert
            severity="info"
            icon={false}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              borderRadius: '8px',
              p: 2.5,
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
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
            sx={{ mt: 3, py: 1.2, px: 3, fontWeight: 700, borderRadius: '6px' }}
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
            borderRadius: '6px',
          }}
        >
          Pemesanan tiket berhasil dibatalkan.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyTicketsPage;
