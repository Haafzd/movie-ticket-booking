import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { bookTicket } from '../../store/slices/bookingSlice';
import type { Show } from '../../types';

interface BookingFormProps {
  show: Show;
}

const SCHEDULE_OPTIONS = ['12:30 WIB', '15:00 WIB', '17:30 WIB', '20:00 WIB', '22:15 WIB'];
const PRICE_PER_TICKET = 50000;

export const BookingForm: React.FC<BookingFormProps> = ({ show }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<string>(SCHEDULE_OPTIONS[2]); // Default 17:30 WIB
  const [quantity, setQuantity] = useState<number>(1);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const totalPrice = quantity * PRICE_PER_TICKET;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      bookTicket({
        showId: show.id,
        showTitle: show.name,
        posterUrl: show.image?.medium || show.image?.original || null,
        schedule,
        quantity,
        pricePerTicket: PRICE_PER_TICKET,
        totalPrice,
      })
    );

    setShowSuccessToast(true);
  };

  return (
    <Card
      sx={{
        backgroundColor: '#121726',
        border: '1px solid rgba(229, 9, 20, 0.4)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        p: 1,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <ConfirmationNumberIcon sx={{ color: '#E50914', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFF' }}>
            Form Pemesanan Tiket
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Pilih jadwal penayangan bioskop dan jumlah tiket yang ingin dipesan.
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

        <Box component="form" onSubmit={handleBookingSubmit}>
          {/* Schedule Select */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#E2E8F0' }}>
              Jadwal Tayang Bioskop:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {SCHEDULE_OPTIONS.map((time) => {
                const isSelected = schedule === time;
                return (
                  <Chip
                    key={time}
                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                    label={time}
                    onClick={() => setSchedule(time)}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    sx={{
                      fontWeight: 700,
                      py: 2.2,
                      px: 0.5,
                      backgroundColor: isSelected ? '#E50914' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isSelected ? '#E50914' : 'rgba(255, 255, 255, 0.15)',
                      '&:hover': {
                        backgroundColor: isSelected ? '#FF2E4D' : 'rgba(229, 9, 20, 0.2)',
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* Ticket Quantity Select */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="medium">
              <InputLabel id="quantity-label" sx={{ color: '#94A3B8' }}>
                Jumlah Tiket
              </InputLabel>
              <Select
                labelId="quantity-label"
                value={quantity}
                label="Jumlah Tiket"
                onChange={(e) => setQuantity(Number(e.target.value))}
                sx={{
                  backgroundColor: 'rgba(9, 12, 21, 0.6)',
                  borderRadius: 3,
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} Tiket {num === 1 ? '(Single)' : '(Group)'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Price Breakdown */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: 'rgba(9, 12, 21, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Harga per Tiket:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Rp {PRICE_PER_TICKET.toLocaleString('id-ID')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Jumlah Tiket:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {quantity}x
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalOfferIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFF' }}>
                  Total Pembayaran:
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFD700' }}>
                Rp {totalPrice.toLocaleString('id-ID')}
              </Typography>
            </Box>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ConfirmationNumberIcon />}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(229, 9, 20, 0.4)',
            }}
          >
            Pesan {quantity} Tiket Sekarang
          </Button>
        </Box>
      </CardContent>

      {/* Success Notification Snackbar */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={4000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessToast(false)}
          severity="success"
          variant="filled"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{
            width: '100%',
            backgroundColor: '#10B981',
            color: '#FFF',
            fontWeight: 700,
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate('/my-tickets')}
              sx={{ fontWeight: 800, textDecoration: 'underline' }}
            >
              Lihat Tiket
            </Button>
          }
        >
          Tiket film "{show.name}" berhasil dipesan!
        </Alert>
      </Snackbar>
    </Card>
  );
};
