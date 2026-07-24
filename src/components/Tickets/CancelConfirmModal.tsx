import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import type { TicketBooking } from '../../types';

interface CancelConfirmModalProps {
  open: boolean;
  booking: TicketBooking | null;
  onClose: () => void;
  onConfirmCancel: (bookingId: string) => void;
}

export const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  open,
  booking,
  onClose,
  onConfirmCancel,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!booking) return null;

  const seatDisplay = booking.seats && booking.seats.length > 0 ? booking.seats.join(', ') : 'Umum';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: '8px',
            border: isDark ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(239, 68, 68, 0.3)',
            padding: '8px',
            boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.8)' : '0 12px 32px rgba(0, 0, 0, 0.15)',
          },
        },
      }}
    >
      <DialogTitle sx={{ color: '#EF4444', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Konfirmasi Pembatalan Tiket
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
          Apakah Anda yakin ingin membatalkan pemesanan tiket untuk film ini?
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: '6px',
            backgroundColor: isDark ? 'rgba(9, 12, 21, 0.8)' : 'rgba(241, 245, 249, 0.9)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            {booking.showTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jadwal: {booking.schedule} | Kursi: {seatDisplay} | Jumlah: {booking.quantity} Tiket
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: isDark ? '#FFD700' : '#D97706', mt: 1 }}>
            Pengembalian Dana: Rp {booking.totalPrice.toLocaleString('id-ID')}
          </Typography>
        </Box>
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 2 }}>
          *Tindakan ini tidak dapat dibatalkan. Tiket akan dihapus dari sistem.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: '6px' }}>
          Kembali
        </Button>
        <Button
          onClick={() => onConfirmCancel(booking.id)}
          variant="contained"
          color="error"
          sx={{ fontWeight: 700, borderRadius: '6px' }}
        >
          Ya, Batalkan Pemesanan
        </Button>
      </DialogActions>
    </Dialog>
  );
};
