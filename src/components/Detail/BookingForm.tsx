import React, { useState, useMemo } from 'react';
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
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { bookTicket } from '../../store/slices/bookingSlice';
import { AuthModal } from '../Auth/AuthModal';
import type { Show } from '../../types';

interface BookingFormProps {
  show: Show;
}

const BASE_TIMES = [
  { label: '10:00 WIB', hour: 10, minute: 0 },
  { label: '12:30 WIB', hour: 12, minute: 30 },
  { label: '15:00 WIB', hour: 15, minute: 0 },
  { label: '17:30 WIB', hour: 17, minute: 30 },
  { label: '20:00 WIB', hour: 20, minute: 0 },
  { label: '22:15 WIB', hour: 22, minute: 15 },
];

const PRICE_PER_TICKET = 50000;

// Cinema Seat Grid Setup (5 Rows x 8 Columns)
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;
const OCCUPIED_SEATS = ['A1', 'A2', 'B4', 'B5', 'C3', 'D6', 'E8']; // Simulated occupied seats

export const BookingForm: React.FC<BookingFormProps> = ({ show }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const user = useAppSelector((state) => state.auth.user);

  // Generate Date Options for Today and Next 3 Days
  const dateOptions = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 0; i < 4; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      const dayName = i === 0 ? 'Hari Ini' : date.toLocaleDateString('id-ID', { weekday: 'short' });
      const dateFormatted = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      const fullDateStr = date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

      days.push({
        index: i,
        label: `${dayName} (${dateFormatted})`,
        fullDateStr,
        isToday: i === 0,
      });
    }
    return days;
  }, []);

  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  
  // Real-time time slot availability calculation
  const timeSlots = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedDateObj = dateOptions[selectedDateIndex];

    return BASE_TIMES.map((slot) => {
      let isExpired = false;
      if (selectedDateObj.isToday) {
        if (slot.hour < currentHour || (slot.hour === currentHour && slot.minute <= currentMinute)) {
          isExpired = true;
        }
      }
      return {
        ...slot,
        isExpired,
      };
    });
  }, [dateOptions, selectedDateIndex]);

  // Default time slot selection: first available non-expired time slot
  const firstAvailableTime = useMemo(() => {
    const available = timeSlots.find((t) => !t.isExpired);
    return available ? available.label : BASE_TIMES[BASE_TIMES.length - 1].label;
  }, [timeSlots]);

  const [selectedTime, setSelectedTime] = useState<string>(firstAvailableTime);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C4']); // Default seat C4 selected
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const quantity = selectedSeats.length;
  const totalPrice = quantity * PRICE_PER_TICKET;

  const handleToggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;

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

  const processTicketBooking = () => {
    if (!user) return;
    const fullScheduleStr = `${dateOptions[selectedDateIndex].fullDateStr} - ${selectedTime}`;

    dispatch(
      bookTicket({
        userId: user.id,
        showId: show.id,
        showTitle: show.name,
        posterUrl: show.image?.medium || show.image?.original || null,
        schedule: fullScheduleStr,
        bookingDateOnly: dateOptions[selectedDateIndex].fullDateStr,
        bookingTimeOnly: selectedTime,
        quantity,
        seats: selectedSeats.sort(),
        pricePerTicket: PRICE_PER_TICKET,
        totalPrice,
      })
    );

    setShowSuccessToast(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      setFormError('Silakan pilih minimal 1 kursi bioskop.');
      return;
    }

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    processTicketBooking();
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: 'background.paper',
          border: '1px solid rgba(229, 9, 20, 0.4)',
          boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px',
          p: 1,
        }}
      >
        <CardContent>
          {/* Header */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Pemesanan Tiket Bioskop
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Pilih tanggal, jadwal jam tayang, dan posisi kursi studio yang Anda inginkan.
          </Typography>

          <Divider sx={{ borderColor: 'divider', mb: 2.5 }} />

          <Box component="form" onSubmit={handleBookingSubmit}>
            {/* 1. Date Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                1. Pilih Tanggal Nonton:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {dateOptions.map((option) => {
                  const isSelected = selectedDateIndex === option.index;
                  return (
                    <Chip
                      key={option.index}
                      label={option.label}
                      onClick={() => {
                        setSelectedDateIndex(option.index);
                        setFormError(null);
                      }}
                      color={isSelected ? 'primary' : 'default'}
                      variant={isSelected ? 'filled' : 'outlined'}
                      sx={{
                        fontWeight: 700,
                        py: 2,
                        px: 0.5,
                        borderRadius: '6px',
                        backgroundColor: isSelected
                          ? '#E50914'
                          : isDark
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.04)',
                        borderColor: isSelected
                          ? '#E50914'
                          : isDark
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(0, 0, 0, 0.12)',
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            {/* 2. Time Slot Selection (Filtered by DateTimeNow) */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                2. Pilih Jam Tayang:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.label && !slot.isExpired;
                  return (
                    <Tooltip
                      key={slot.label}
                      title={slot.isExpired ? 'Jadwal tayang sudah lewat' : 'Jadwal tersedia'}
                    >
                      <span>
                        <Chip
                          label={slot.isExpired ? `${slot.label} (Lewat)` : slot.label}
                          disabled={slot.isExpired}
                          onClick={() => {
                            if (!slot.isExpired) {
                              setSelectedTime(slot.label);
                              setFormError(null);
                            }
                          }}
                          color={isSelected ? 'primary' : 'default'}
                          variant={isSelected ? 'filled' : 'outlined'}
                          sx={{
                            fontWeight: 700,
                            py: 2,
                            px: 0.5,
                            borderRadius: '6px',
                            backgroundColor: isSelected
                              ? '#E50914'
                              : isDark
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(0, 0, 0, 0.04)',
                            borderColor: isSelected
                              ? '#E50914'
                              : isDark
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(0, 0, 0, 0.12)',
                            opacity: slot.isExpired ? 0.4 : 1,
                          }}
                        />
                      </span>
                    </Tooltip>
                  );
                })}
              </Box>
            </Box>

            {/* 3. Interactive Seat Map Grid */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                3. Pilih Kursi Studio:
              </Typography>

              {/* Screen Banner */}
              <Box
                sx={{
                  width: '100%',
                  py: 0.6,
                  mb: 2,
                  borderRadius: '4px',
                  background: 'linear-gradient(180deg, rgba(229, 9, 20, 0.4) 0%, rgba(9, 12, 21, 0.1) 100%)',
                  borderTop: '2px solid #E50914',
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '2px' }}>
                  LAYAR BIOSKOP (SCREEN)
                </Typography>
              </Box>

              {/* Seat Map */}
              <Box
                sx={{
                  backgroundColor: isDark ? 'rgba(9, 12, 21, 0.7)' : 'rgba(241, 245, 249, 0.8)',
                  p: 2,
                  borderRadius: '8px',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                {SEAT_ROWS.map((row) => (
                  <Box key={row} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, width: 14, color: 'text.secondary' }}>
                      {row}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.8 }}>
                      {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((col) => {
                        const seatId = `${row}${col}`;
                        const isOccupied = OCCUPIED_SEATS.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        let bgColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.5)';
                        let borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(148, 163, 184, 0.5)';
                        let color = isDark ? '#CBD5E1' : '#334155';

                        if (isOccupied) {
                          bgColor = isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(203, 213, 225, 0.8)';
                          borderColor = 'rgba(100, 116, 139, 0.4)';
                          color = '#94A3B8';
                        } else if (isSelected) {
                          bgColor = '#E50914';
                          borderColor = '#FF2E4D';
                          color = '#FFF';
                        }

                        return (
                          <Box
                            key={seatId}
                            onClick={() => handleToggleSeat(seatId)}
                            sx={{
                              width: 26,
                              height: 26,
                              borderRadius: '4px',
                              backgroundColor: bgColor,
                              border: `1px solid ${borderColor}`,
                              color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              cursor: isOccupied ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {col}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Form Error Alert */}
            {formError && (
              <Alert severity="error" icon={false} sx={{ mb: 2, borderRadius: '6px' }}>
                {formError}
              </Alert>
            )}

            {/* Price Breakdown */}
            <Box
              sx={{
                p: 2,
                borderRadius: '8px',
                backgroundColor: isDark ? 'rgba(9, 12, 21, 0.7)' : 'rgba(241, 245, 249, 0.8)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                mb: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="body2" color="text.secondary">
                  Tanggal & Jam:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {dateOptions[selectedDateIndex].label} - {selectedTime}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="body2" color="text.secondary">
                  Kursi Dipilih:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#E50914' }}>
                  {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : '-'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Jumlah Tiket:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {quantity} Tiket
                </Typography>
              </Box>

              <Divider sx={{ my: 1, borderColor: 'divider' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Total Bayar:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? '#FFD700' : '#D97706' }}>
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
              disabled={quantity === 0}
              startIcon={!user ? <PersonIcon /> : undefined}
              sx={{
                py: 1.4,
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '6px',
              }}
            >
              {!user
                ? 'Masuk / Daftar untuk Pesan Tiket'
                : quantity > 0
                ? `Pesan Tiket (${selectedSeats.join(', ')})`
                : 'Pilih Kursi Terlebih Dahulu'}
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
              borderRadius: '6px',
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

      {/* Auth Modal Trigger */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={processTicketBooking}
      />
    </>
  );
};
