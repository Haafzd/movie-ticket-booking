import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchShowDetail } from '../store/slices/filmSlice';
import { MovieHero } from '../components/Detail/MovieHero';
import { BookingForm } from '../components/Detail/BookingForm';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';
import { ErrorAlert } from '../components/Common/ErrorAlert';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedShow, loading, error } = useAppSelector((state) => state.film);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowDetail(Number(id)));
    }
  }, [dispatch, id]);

  const handleRetry = () => {
    if (id) {
      dispatch(fetchShowDetail(Number(id)));
    }
  };

  return (
    <Container maxWidth="xl" className="fade-in">
      {/* Navigation Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: '#94A3B8',
            '&:hover': { color: '#FFF', backgroundColor: 'rgba(255, 255, 255, 0.08)' },
          }}
        >
          Kembali ke Katalog Film
        </Button>
      </Box>

      {loading || !selectedShow ? (
        <LoadingSkeleton count={4} />
      ) : error ? (
        <ErrorAlert message={error} onRetry={handleRetry} />
      ) : (
        <Grid container spacing={4}>
          {/* Main Hero & Synopsis Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <MovieHero show={selectedShow} />
          </Grid>

          {/* Ticket Booking Form Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <BookingForm show={selectedShow} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MovieDetailPage;
