import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h1" sx={{ fontSize: '6rem', color: '#E50914' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Maaf, halaman bioskop yang Anda cari tidak tersedia atau telah dipindahkan.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        size="large"
        startIcon={<MovieIcon />}
      >
        Kembali ke Katalog Film
      </Button>
    </Container>
  );
};

export default NotFoundPage;
