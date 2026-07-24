import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
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
  if (!booking) return null;

  const seatDisplay = booking.seats && booking.seats.length > 0 ? booking.seats.join(', ') : 'Umum';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            backgroundColor: '#121726',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '8px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8)',
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
        <Typography variant="body1" sx={{ mb: 2, color: '#CBD5E1' }}>
          Apakah Anda yakin ingin membatalkan pemesanan tiket untuk film ini?
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: '6px',
            backgroundColor: 'rgba(9, 12, 21, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFF', mb: 0.5 }}>
            {booking.showTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jadwal: {booking.schedule} | Kursi: {seatDisplay} | Jumlah: {booking.quantity} Tiket
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFD700', mt: 1 }}>
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
