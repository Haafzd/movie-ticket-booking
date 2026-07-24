import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Alert,
  LinearProgress,
  useTheme,
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import type { Show } from '../../types';

export interface PaymentBookingPayload {
  show: Show;
  schedule: string;
  dateOnly: string;
  timeOnly: string;
  seats: string[];
  quantity: number;
  totalPrice: number;
}

interface PaymentModalProps {
  open: boolean;
  bookingPayload: PaymentBookingPayload | null;
  onClose: () => void;
  onPaymentSuccess: (payload: PaymentBookingPayload) => void;
}

type PaymentMethod = 'qris' | 'transfer';
type PaymentStatus = 'pending' | 'success' | 'expired' | 'failed';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  bookingPayload,
  onClose,
  onPaymentSuccess,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [inputNominal, setInputNominal] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30-second timeout constraint
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 30-Second Countdown Timer Constraint
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (open && paymentStatus === 'pending') {
      setTimeLeft(30);
      setErrorMsg(null);
      setInputNominal('');

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPaymentStatus('expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, paymentStatus]);

  if (!bookingPayload) return null;

  const handlePayAuto = () => {
    setInputNominal(bookingPayload.totalPrice.toString());
    setErrorMsg(null);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Constraint 1: Time limit check (30-second timeout)
    if (timeLeft <= 0 || paymentStatus === 'expired') {
      setErrorMsg('Waktu pembayaran telah habis (30 detik). Silakan coba lagi.');
      return;
    }

    // Constraint 2: Non-empty & valid number
    const numericNominal = Number(inputNominal);
    if (!inputNominal || isNaN(numericNominal) || numericNominal <= 0) {
      setErrorMsg('Masukkan nominal pembayaran yang valid.');
      return;
    }

    // Constraint 3: Strict Exact Payment Constraint (Payment must match exact bill amount)
    if (numericNominal < bookingPayload.totalPrice) {
      setErrorMsg(
        `Nominal kurang Rp ${(bookingPayload.totalPrice - numericNominal).toLocaleString('id-ID')}! Pembayaran harus tepat Rp ${bookingPayload.totalPrice.toLocaleString('id-ID')}`
      );
      return;
    }

    if (numericNominal > bookingPayload.totalPrice) {
      setErrorMsg(
        `Nominal melebihi total tagihan! Pembayaran harus tepat Rp ${bookingPayload.totalPrice.toLocaleString('id-ID')}`
      );
      return;
    }

    // Payment Successful -> Skip to Success State and issue ticket!
    setPaymentStatus('success');
    setTimeout(() => {
      onPaymentSuccess(bookingPayload);
    }, 1200);
  };

  const progressPercent = (timeLeft / 30) * 100;

  return (
    <Dialog
      open={open}
      onClose={paymentStatus === 'pending' ? undefined : onClose}
      slotProps={{
        paper: {
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: '8px',
            border: isDark ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(229, 9, 20, 0.2)',
            padding: '12px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: isDark ? '0 20px 50px rgba(0, 0, 0, 0.8)' : '0 12px 36px rgba(0, 0, 0, 0.15)',
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
          Simulasi Pembayaran Tiket
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Batasi waktu pembayaran maks. 30 detik
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        {paymentStatus === 'pending' && (
          <>
            {/* 30-Second Countdown Timer Progress Bar */}
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: timeLeft <= 10 ? '#EF4444' : '#F59E0B' }}>
                  <TimerIcon fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Sisa Waktu Pembayaran: {timeLeft}s
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Timeout Limit: 30s
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                color={timeLeft <= 10 ? 'error' : 'warning'}
                sx={{ height: 6, borderRadius: '3px' }}
              />
            </Box>

            {/* Tagihan Summary */}
            <Box
              sx={{
                p: 2,
                borderRadius: '6px',
                backgroundColor: isDark ? 'rgba(9, 12, 21, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                mb: 2.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                {bookingPayload.show.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Jadwal: {bookingPayload.schedule} | Kursi: {bookingPayload.seats.join(', ')} ({bookingPayload.quantity} Tiket)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  TOTAL HARGA PAS:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#FFD700' : '#D97706' }}>
                  Rp {bookingPayload.totalPrice.toLocaleString('id-ID')}
                </Typography>
              </Box>
            </Box>

            {/* Metode Pembayaran */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Pilih Metode Pembayaran:
            </Typography>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              sx={{ mb: 2, gap: 1 }}
            >
              <FormControlLabel
                value="qris"
                control={<Radio size="small" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <QrCode2Icon fontSize="small" /> QRIS Instant
                  </Box>
                }
                sx={{
                  border: '1px solid',
                  borderColor: paymentMethod === 'qris' ? '#E50914' : 'divider',
                  borderRadius: '6px',
                  px: 1.5,
                  py: 0.5,
                  m: 0,
                }}
              />
              <FormControlLabel
                value="transfer"
                control={<Radio size="small" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccountBalanceIcon fontSize="small" /> Bank Transfer
                  </Box>
                }
                sx={{
                  border: '1px solid',
                  borderColor: paymentMethod === 'transfer' ? '#E50914' : 'divider',
                  borderRadius: '6px',
                  px: 1.5,
                  py: 0.5,
                  m: 0,
                }}
              />
            </RadioGroup>

            {/* Instructions depending on method */}
            {paymentMethod === 'qris' ? (
              <Box sx={{ textAlign: 'center', my: 2, p: 2, border: '1px dashed divider', borderRadius: '6px' }}>
                <QrCode2Icon sx={{ fontSize: 80, color: 'text.primary', opacity: 0.8 }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  Scan Kode QRIS dengan m-banking/e-wallet Anda
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 1.5, borderRadius: '6px', backgroundColor: 'action.hover', mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  No. Virtual Account BCA: <strong>88012093849201</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  No. Virtual Account Mandiri: <strong>89201938401928</strong>
                </Typography>
              </Box>
            )}

            {/* Input Nominal Pembayaran & Constraint Alerts */}
            <Box component="form" onSubmit={handleConfirmPayment}>
              {errorMsg && (
                <Alert severity="error" icon={false} sx={{ mb: 2, borderRadius: '6px' }}>
                  {errorMsg}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Nominal Pembayaran (Tepat)"
                  type="number"
                  value={inputNominal}
                  onChange={(e) => {
                    setInputNominal(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder={`Tepat Rp ${bookingPayload.totalPrice.toLocaleString('id-ID')}`}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlePayAuto}
                  sx={{ whiteSpace: 'nowrap', minWidth: 90, height: 40 }}
                >
                  Bayar Pas
                </Button>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={timeLeft <= 0}
                sx={{ py: 1.2, fontWeight: 800, borderRadius: '6px' }}
              >
                Konfirmasi & Bayar Tiket
              </Button>
            </Box>
          </>
        )}

        {/* Payment Success View */}
        {paymentStatus === 'success' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>
              Pembayaran Berhasil!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nominal pembayaran tepat tervalidasi. Mengalihkan langsung ke halaman Tiket Saya...
            </Typography>
          </Box>
        )}

        {/* Payment Expired / Timeout View */}
        {paymentStatus === 'expired' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ErrorIcon sx={{ fontSize: 64, color: '#EF4444', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#EF4444', mb: 1 }}>
              Waktu Pembayaran Habis (Timeout 30s)!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sesi pembayaran melebihi batas waktu 30 detik. Tiket gagal diterbitkan.
            </Typography>
            <Button variant="contained" color="error" onClick={onClose} sx={{ borderRadius: '6px' }}>
              Tutup & Coba Pemesanan Ulang
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
