import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Alert,
  Snackbar,
  Chip,
  Tooltip,
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { bookTicket } from '../../store/slices/bookingSlice';
import type { Show } from '../../types';

interface BookingFormProps {
  show: Show;
}

const SCHEDULE_OPTIONS = ['12:30 WIB', '15:00 WIB', '17:30 WIB', '20:00 WIB', '22:15 WIB'];
const PRICE_PER_TICKET = 50000;

// Cinema Seat Grid Setup (5 Rows x 8 Columns)
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;
const OCCUPIED_SEATS = ['A1', 'A2', 'B4', 'B5', 'C3', 'D6', 'E8']; // Simulated occupied seats

export const BookingForm: React.FC<BookingFormProps> = ({ show }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<string>(SCHEDULE_OPTIONS[2]); // Default 17:30 WIB
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C4']); // Default seat C4 selected
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const quantity = selectedSeats.length;
  const totalPrice = quantity * PRICE_PER_TICKET;

  const handleToggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return; // Locked

    setFormError(null);
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 10) {
        setFormError('Maksimal pemesanan 10 kursi per transaksi.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      setFormError('Silakan pilih minimal 1 kursi bioskop.');
      return;
    }

    dispatch(
      bookTicket({
        showId: show.id,
        showTitle: show.name,
        posterUrl: show.image?.medium || show.image?.original || null,
        schedule,
        quantity,
        seats: selectedSeats.sort(),
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
            Pilih Jadwal & Kursi Bioskop
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Pilih jam tayang dan posisi kursi di studio bioskop untuk pengalaman menonton terbaik.
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }} />

        <Box component="form" onSubmit={handleBookingSubmit}>
          {/* Schedule Select */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.2, color: '#E2E8F0' }}>
              1. Pilih Jadwal Tayang:
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

          {/* Interactive Seat Picker Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.2, color: '#E2E8F0' }}>
              2. Pilih Kursi Studio Bioskop:
            </Typography>

            {/* Screen Banner */}
            <Box
              sx={{
                width: '100%',
                py: 0.8,
                mb: 2.5,
                borderRadius: 2,
                background: 'linear-gradient(180deg, rgba(229, 9, 20, 0.4) 0%, rgba(9, 12, 21, 0.2) 100%)',
                borderTop: '2px solid #E50914',
                textAlign: 'center',
                boxShadow: '0 -4px 12px rgba(229, 9, 20, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <TvIcon sx={{ color: '#E50914', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#F8FAFC', letterSpacing: '2px' }}>
                LAYAR BIOSKOP (SCREEN)
              </Typography>
            </Box>

            {/* Seat Map Grid */}
            <Box
              sx={{
                backgroundColor: 'rgba(9, 12, 21, 0.7)',
                p: 2,
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              {SEAT_ROWS.map((row) => (
                <Box key={row} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, width: 16, color: '#94A3B8' }}>
                    {row}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.8 }}>
                    {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((col) => {
                      const seatId = `${row}${col}`;
                      const isOccupied = OCCUPIED_SEATS.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      let bgColor = 'rgba(255, 255, 255, 0.1)';
                      let borderColor = 'rgba(255, 255, 255, 0.2)';
                      let color = '#CBD5E1';

                      if (isOccupied) {
                        bgColor = 'rgba(100, 116, 139, 0.3)';
                        borderColor = 'rgba(100, 116, 139, 0.4)';
                        color = '#64748B';
                      } else if (isSelected) {
                        bgColor = '#E50914';
                        borderColor = '#FF2E4D';
                        color = '#FFF';
                      }

                      return (
                        <Tooltip
                          key={seatId}
                          title={isOccupied ? `Kursi ${seatId} (Terisi)` : `Kursi ${seatId}`}
                          arrow
                        >
                          <Box
                            onClick={() => handleToggleSeat(seatId)}
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '6px 6px 4px 4px',
                              backgroundColor: bgColor,
                              border: `1px solid ${borderColor}`,
                              color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              cursor: isOccupied ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 0 10px rgba(229, 9, 20, 0.8)' : 'none',
                              '&:hover': {
                                transform: isOccupied ? 'none' : 'scale(1.15)',
                                backgroundColor: isOccupied
                                  ? bgColor
                                  : isSelected
                                  ? '#FF2E4D'
                                  : 'rgba(229, 9, 20, 0.3)',
                              },
                            }}
                          >
                            {col}
                          </Box>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </Box>
              ))}

              {/* Legend Indicator */}
              <Box sx={{ display: 'flex', gap: 2, mt: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Tersedia
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: 1,
                      backgroundColor: '#E50914',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 600 }}>
                    Dipilih ({quantity})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: 1,
                      backgroundColor: 'rgba(100, 116, 139, 0.3)',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Terisi
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Form Error Alert */}
          {formError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {formError}
            </Alert>
          )}

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
                Kursi Dipilih:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFD700' }}>
                {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : '-'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Harga per Kursi:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Rp {PRICE_PER_TICKET.toLocaleString('id-ID')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Total Jumlah Tiket:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {quantity} Tiket
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
            startIcon={<EventSeatIcon />}
            disabled={quantity === 0}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(229, 9, 20, 0.4)',
            }}
          >
            {quantity > 0 ? `Pesan ${quantity} Kursi (${selectedSeats.join(', ')})` : 'Pilih Kursi Terlebih Dahulu'}
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
          Tiket film "{show.name}" (Kursi: {selectedSeats.join(', ')}) berhasil dipesan!
        </Alert>
      </Snackbar>
    </Card>
  );
};
