import React, { useReducer, useMemo, useCallback, useEffect } from 'react';
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
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { bookTicket } from '../../store/slices/bookingSlice';
import { AuthModal } from '../Auth/AuthModal';
import { PaymentModal } from '../Payment/PaymentModal';
import type { PaymentBookingPayload } from '../Payment/PaymentModal';
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

interface BookingFormState {
  selectedDateIndex: number;
  selectedTime: string;
  selectedSeats: string[];
  authModalOpen: boolean;
  paymentModalOpen: boolean;
  pendingBookingPayload: PaymentBookingPayload | null;
  showSuccessToast: boolean;
  formError: string | null;
}

type BookingFormAction =
  | { type: 'SET_DATE_INDEX'; payload: number }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'TOGGLE_SEAT'; payload: string }
  | { type: 'SET_AUTH_MODAL'; payload: boolean }
  | { type: 'SET_PAYMENT_MODAL'; payload: boolean }
  | { type: 'SET_PENDING_PAYLOAD'; payload: PaymentBookingPayload | null }
  | { type: 'SET_SUCCESS_TOAST'; payload: boolean }
  | { type: 'SET_FORM_ERROR'; payload: string | null };

const initialBookingFormState: BookingFormState = {
  selectedDateIndex: 0,
  selectedTime: '',
  selectedSeats: ['C4'],
  authModalOpen: false,
  paymentModalOpen: false,
  pendingBookingPayload: null,
  showSuccessToast: false,
  formError: null,
};

const bookingFormReducer = (state: BookingFormState, action: BookingFormAction): BookingFormState => {
  switch (action.type) {
    case 'SET_DATE_INDEX':
      return { ...state, selectedDateIndex: action.payload, formError: null };
    case 'SET_TIME':
      return { ...state, selectedTime: action.payload };
    case 'TOGGLE_SEAT': {
      const seatId = action.payload;
      if (OCCUPIED_SEATS.includes(seatId)) return state;
      const isSelected = state.selectedSeats.includes(seatId);
      if (isSelected) {
        return {
          ...state,
          selectedSeats: state.selectedSeats.filter((s) => s !== seatId),
          formError: null,
        };
      }
      if (state.selectedSeats.length >= 10) {
        return {
          ...state,
          formError: 'Maksimal pemesanan 10 kursi per transaksi.',
        };
      }
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, seatId],
        formError: null,
      };
    }
    case 'SET_AUTH_MODAL':
      return { ...state, authModalOpen: action.payload };
    case 'SET_PAYMENT_MODAL':
      return { ...state, paymentModalOpen: action.payload };
    case 'SET_PENDING_PAYLOAD':
      return { ...state, pendingBookingPayload: action.payload };
    case 'SET_SUCCESS_TOAST':
      return { ...state, showSuccessToast: action.payload };
    case 'SET_FORM_ERROR':
      return { ...state, formError: action.payload };
    default:
      return state;
  }
};

export const BookingForm: React.FC<BookingFormProps> = ({ show }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const user = useAppSelector((state) => state.auth.user);

  const [state, dispatchState] = useReducer(bookingFormReducer, initialBookingFormState);

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

  // Real-time time slot availability calculation
  const timeSlots = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedDateObj = dateOptions[state.selectedDateIndex];

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
  }, [dateOptions, state.selectedDateIndex]);

  // Default time slot selection: first available non-expired time slot
  const firstAvailableTime = useMemo(() => {
    const available = timeSlots.find((t) => !t.isExpired);
    return available ? available.label : BASE_TIMES[BASE_TIMES.length - 1].label;
  }, [timeSlots]);

  useEffect(() => {
    if (!state.selectedTime) {
      dispatchState({ type: 'SET_TIME', payload: firstAvailableTime });
    }
  }, [firstAvailableTime, state.selectedTime]);

  const quantity = state.selectedSeats.length;
  const totalPrice = quantity * PRICE_PER_TICKET;

  const handleToggleSeat = useCallback((seatId: string) => {
    dispatchState({ type: 'TOGGLE_SEAT', payload: seatId });
  }, []);

  const preparePayment = useCallback(() => {
    const selectedDateObj = dateOptions[state.selectedDateIndex];
    const fullScheduleStr = `${selectedDateObj.fullDateStr} - ${state.selectedTime || firstAvailableTime}`;
    const payload: PaymentBookingPayload = {
      show,
      schedule: fullScheduleStr,
      dateOnly: selectedDateObj.fullDateStr,
      timeOnly: state.selectedTime || firstAvailableTime,
      seats: [...state.selectedSeats].sort(),
      quantity: state.selectedSeats.length,
      totalPrice: state.selectedSeats.length * PRICE_PER_TICKET,
    };

    dispatchState({ type: 'SET_PENDING_PAYLOAD', payload });
    dispatchState({ type: 'SET_PAYMENT_MODAL', payload: true });
  }, [dateOptions, state.selectedDateIndex, state.selectedTime, state.selectedSeats, firstAvailableTime, show]);

  const handleBookingSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (state.selectedSeats.length === 0) {
      dispatchState({ type: 'SET_FORM_ERROR', payload: 'Silakan pilih minimal 1 kursi bioskop.' });
      return;
    }

    if (!user) {
      dispatchState({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }

    preparePayment();
  }, [state.selectedSeats.length, user, preparePayment]);

  
  const handleCancelPayment = useCallback(() => {
    dispatchState({ type: "SET_PAYMENT_MODAL", payload: false });
    dispatchState({ type: "SET_PENDING_PAYLOAD", payload: null });
    dispatchState({ type: "SET_FORM_ERROR", payload: "Pemesanan dibatalkan. Tiket belum diterbitkan." });
  }, []);

  const handlePaymentSuccess = useCallback((payload: PaymentBookingPayload) => {
    if (!user) return;

    dispatch(
      bookTicket({
        userId: user.id,
        showId: payload.show.id,
        showTitle: payload.show.name,
        posterUrl: payload.show.image?.medium || payload.show.image?.original || null,
        schedule: payload.schedule,
        bookingDateOnly: payload.dateOnly,
        bookingTimeOnly: payload.timeOnly,
        quantity: payload.quantity,
        seats: payload.seats,
        pricePerTicket: PRICE_PER_TICKET,
        totalPrice: payload.totalPrice,
      })
    );

    dispatchState({ type: 'SET_PAYMENT_MODAL', payload: false });
    dispatchState({ type: 'SET_SUCCESS_TOAST', payload: true });
    setTimeout(() => {
      navigate('/my-tickets');
    }, 1500);
  }, [user, dispatch, navigate]);

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
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Pemesanan Tiket Bioskop
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Pilih tanggal, jadwal jam tayang, dan posisi kursi studio yang Anda inginkan.
          </Typography>

          <Divider sx={{ borderColor: 'divider', mb: 2.5 }} />

          <Box component="form" onSubmit={handleBookingSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                1. Pilih Tanggal Nonton:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {dateOptions.map((option) => {
                  const isSelected = state.selectedDateIndex === option.index;
                  return (
                    <Chip
                      key={option.index}
                      label={option.label}
                      onClick={() => dispatchState({ type: 'SET_DATE_INDEX', payload: option.index })}
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
                        borderColor: isSelected ? '#E50914' : 'divider',
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                2. Pilih Jam Tayang:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {timeSlots.map((slot) => {
                  const currentSelectedTime = state.selectedTime || firstAvailableTime;
                  const isSelected = currentSelectedTime === slot.label;
                  return (
                    <Tooltip
                      key={slot.label}
                      title={slot.isExpired ? 'Jadwal jam tayang sudah terlewat' : ''}
                      arrow
                    >
                      <span>
                        <Button
                          variant={isSelected ? 'contained' : 'outlined'}
                          disabled={slot.isExpired}
                          onClick={() => dispatchState({ type: 'SET_TIME', payload: slot.label })}
                          sx={{
                            borderRadius: '6px',
                            fontWeight: 700,
                            minWidth: 100,
                          }}
                        >
                          {slot.label}
                        </Button>
                      </span>
                    </Tooltip>
                  );
                })}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                3. Pilih Position Kursi (Maks. 10):
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {SEAT_ROWS.map((row) => (
                  <Box key={row} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ width: 20, fontWeight: 700 }}>
                      {row}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                      {Array.from({ length: SEATS_PER_ROW }, (_, colIdx) => {
                        const col = `${row}${colIdx + 1}`;
                        const isSelected = state.selectedSeats.includes(col);
                        const isOccupied = OCCUPIED_SEATS.includes(col);

                        return (
                          <Box
                            key={col}
                            onClick={() => handleToggleSeat(col)}
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: isOccupied ? 'not-allowed' : 'pointer',
                              backgroundColor: isOccupied
                                ? isDark ? '#334155' : '#CBD5E1'
                                : isSelected
                                ? '#E50914'
                                : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                              color: isOccupied
                                ? isDark ? '#64748B' : '#94A3B8'
                                : isSelected
                                ? '#FFF'
                                : 'text.primary',
                              border: isSelected ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
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

            {state.formError && (
              <Alert severity="error" icon={false} sx={{ mb: 2, borderRadius: '6px' }}>
                {state.formError}
              </Alert>
            )}

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
                  {dateOptions[state.selectedDateIndex].label} - {state.selectedTime || firstAvailableTime}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="body2" color="text.secondary">
                  Kursi Dipilih:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#E50914' }}>
                  {state.selectedSeats.length > 0 ? [...state.selectedSeats].sort().join(', ') : '-'}
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

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={quantity === 0}
              startIcon={!user ? <PersonIcon /> : <PaymentIcon />}
              sx={{
                py: 1.4,
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: '6px',
              }}
            >
              {!user
                ? 'Masuk / Daftar untuk Lanjut Bayar'
                : quantity > 0
                ? `Lanjut ke Pembayaran (${state.selectedSeats.join(', ')})`
                : 'Pilih Kursi Terlebih Dahulu'}
            </Button>
          </Box>
        </CardContent>

        <Snackbar
          open={state.showSuccessToast}
          autoHideDuration={4000}
          onClose={() => dispatchState({ type: 'SET_SUCCESS_TOAST', payload: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => dispatchState({ type: 'SET_SUCCESS_TOAST', payload: false })}
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
          >
            Pembayaran Berhasil! Tiket film "{show.name}" telah diterbitkan.
          </Alert>
        </Snackbar>
      </Card>

      <AuthModal
        open={state.authModalOpen}
        onClose={() => dispatchState({ type: 'SET_AUTH_MODAL', payload: false })}
        onSuccess={preparePayment}
      />

      <PaymentModal
        open={state.paymentModalOpen}
        bookingPayload={state.pendingBookingPayload}
        onClose={handleCancelPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};
