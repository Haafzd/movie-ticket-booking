import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Alert
        severity="error"
        variant="filled"
        sx={{
          borderRadius: 3,
          backgroundColor: 'rgba(239, 68, 68, 0.9)',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)',
        }}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={onRetry}
              sx={{ fontWeight: 700 }}
            >
              Coba Lagi
            </Button>
          )
        }
      >
        <AlertTitle sx={{ fontWeight: 700 }}>Gagal Memuat Data</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};
