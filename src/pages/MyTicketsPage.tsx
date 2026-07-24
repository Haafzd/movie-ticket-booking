import React, { useState } from 'react';
import { Container, Typography, Box, Button, Alert, Snackbar, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { cancelBooking } from '../store/slices/bookingSlice';
import { TicketStubCard } from '../components/Tickets/TicketStubCard';
import { CancelConfirmModal } from '../components/Tickets/CancelConfirmModal';
import { AuthModal } from '../components/Auth/AuthModal';
import type { TicketBooking } from '../types';

const MyTicketsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const user = useAppSelector((state) => state.auth.user);
  const bookings = useAppSelector((state) => state.booking.bookings);

  // Tickets belong exclusively to the logged in user
  const userBookings = user ? bookings.filter((b) => b.userId === user.id) : [];

  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<TicketBooking | null>(null);
  const [showCancelToast, setShowCancelToast] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

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
            color: 'text.primary',
          }}
        >
          Daftar Tiket Bioskop Terpesan
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Kelola dan tunjukkan e-ticket fisik digital Anda saat memasuki studio bioskop.
        </Typography>
      </Box>

      {/* Main Content */}
      {!user ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Alert
            severity="warning"
            icon={false}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              borderRadius: '8px',
              p: 2.5,
              backgroundColor: isDark ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.12)',
              borderColor: 'rgba(245, 158, 11, 0.3)',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Silakan Masuk ke Akun Anda
            </Typography>
            Anda belum masuk ke akun CineVerse. Silakan masuk atau daftar akun baru terlebih dahulu untuk melihat tiket bioskop Anda.
          </Alert>

          <Button
            variant="contained"
            size="large"
            startIcon={<PersonIcon />}
            onClick={() => setAuthModalOpen(true)}
            sx={{ mt: 3, py: 1.2, px: 3, fontWeight: 700, borderRadius: '6px' }}
          >
            Masuk / Daftar Akun
          </Button>
        </Box>
      ) : userBookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Alert
            severity="info"
            icon={false}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              borderRadius: '8px',
              p: 2.5,
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.12)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Belum Ada Tiket Terpesan
            </Typography>
            Halo {user.name}, Anda belum memesan tiket film apapun. Jelajahi katalog bioskop CineVerse dan tentukan jadwal tontonanmu!
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
          {userBookings.map((booking) => (
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

      {/* Auth Modal Trigger */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
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
