import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../store/slices/authSlice';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0); // 0 = Login, 1 = Register

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Register form state
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Silakan isi Email dan Password.');
      return;
    }

    const userName = loginEmail.split('@')[0];
    const userPayload = {
      id: `USR-${Date.now()}`,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: loginEmail,
    };

    dispatch(loginUser(userPayload));
    onClose();
    if (onSuccess) onSuccess();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Semua kolom pendaftaran wajib diisi.');
      return;
    }

    const userPayload = {
      id: `USR-${Date.now()}`,
      name: regName,
      email: regEmail,
    };

    dispatch(loginUser(userPayload));
    onClose();
    if (onSuccess) onSuccess();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'USR-DEMO-99',
      name: 'Pengguna CineVerse',
      email: 'user@cineverse.com',
    };
    dispatch(loginUser(demoUser));
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            backgroundColor: '#121726',
            borderRadius: '8px',
            border: '1px solid rgba(229, 9, 20, 0.3)',
            padding: '16px 12px 12px 12px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, textAlign: 'center', p: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFF' }}>
          Akun CineVerse
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Masuk atau buat akun baru untuk memesan tiket bioskop
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 1.5 }}>
        {/* Tabs for Login vs Register */}
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }}>
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => {
              setTabIndex(newValue);
              setErrorMsg(null);
            }}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              icon={<LockOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Masuk (Login)"
              sx={{ fontWeight: 700, minHeight: 48 }}
            />
            <Tab
              icon={<PersonAddOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Daftar (Register)"
              sx={{ fontWeight: 700, minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {errorMsg && (
          <Alert severity="error" icon={false} sx={{ mb: 2, borderRadius: '6px' }}>
            {errorMsg}
          </Alert>
        )}

        {/* Tab 0: Login Form */}
        {tabIndex === 0 && (
          <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="medium"
              label="Alamat Email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="nama@email.com"
              variant="outlined"
            />
            <TextField
              fullWidth
              size="medium"
              label="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.2, fontWeight: 700, borderRadius: '6px', mt: 1 }}
            >
              Masuk ke Akun
            </Button>
          </Box>
        )}

        {/* Tab 1: Register Form */}
        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="medium"
              label="Nama Lengkap"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              placeholder="Budi Santoso"
              variant="outlined"
            />
            <TextField
              fullWidth
              size="medium"
              label="Alamat Email"
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="nama@email.com"
              variant="outlined"
            />
            <TextField
              fullWidth
              size="medium"
              label="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="••••••••"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.2, fontWeight: 700, borderRadius: '6px', mt: 1 }}
            >
              Daftar Akun Baru
            </Button>
          </Box>
        )}

        {/* Clean MUI Divider */}
        <Divider
          sx={{
            my: 2.5,
            color: '#94A3B8',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px',
            '&::before, &::after': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          ATAU
        </Divider>

        {/* Demo Quick Login Button */}
        <Button
          onClick={handleDemoLogin}
          variant="outlined"
          fullWidth
          startIcon={<FlashOnIcon sx={{ color: '#FFD700' }} />}
          sx={{
            py: 1.1,
            borderRadius: '6px',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            color: '#F8FAFC',
            fontWeight: 600,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Masuk Cepat (Akun Demo)
        </Button>
      </DialogContent>
    </Dialog>
  );
};
