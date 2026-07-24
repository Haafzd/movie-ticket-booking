import React, { useEffect } from 'react';
import { Container, Typography, Box, Grid, Alert, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchShows, setSearchQuery, setSelectedGenre } from '../store/slices/filmSlice';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from '../components/Catalog/SearchBar';
import { GenreFilter } from '../components/Catalog/GenreFilter';
import { MovieCard } from '../components/Catalog/MovieCard';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';
import { ErrorAlert } from '../components/Common/ErrorAlert';

const ALL_GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Crime', 'Thriller', 'Adventure', 'Animation', 'Horror'];

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shows, loading, error, searchQuery, selectedGenre } = useAppSelector((state) => state.film);
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    // If search bar is empty but a specific genre chip is selected, fetch shows matching that genre!
    if (!debouncedQuery && selectedGenre !== 'All') {
      dispatch(fetchShows(selectedGenre));
    } else {
      dispatch(fetchShows(debouncedQuery));
    }
  }, [dispatch, debouncedQuery, selectedGenre]);

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleGenreChange = (genre: string) => {
    dispatch(setSelectedGenre(genre));
  };

  // Filter client-side by genre if search query is also active
  const filteredShows = shows.filter((show) => {
    if (selectedGenre === 'All') return true;
    return show.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()));
  });

  return (
    <Container maxWidth="xl" className="fade-in">
      {/* Hero Banner Header */}
      <Box
        sx={{
          textAlign: 'center',
          pt: { xs: 2, md: 4 },
          pb: { xs: 3, md: 4 },
          mb: 3,
          borderRadius: '8px',
          background: 'radial-gradient(ellipse at top, rgba(229, 9, 20, 0.12) 0%, rgba(9, 12, 21, 0) 70%)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            lineHeight: 1.1,
            mb: 1.5,
            background: 'linear-gradient(180deg, #FFFFFF 30%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Katalog & Pemesanan Tiket Film
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 650, mx: 'auto', fontSize: '1rem', mb: 3 }}
        >
          Cari judul film bioskop, tentukan tanggal & jam tayang, serta pilih posisi kursi studio bioskop favoritmu.
        </Typography>

        {/* Search Bar Component */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />

        {/* Genre Filter Chips */}
        <GenreFilter
          genres={ALL_GENRES}
          selectedGenre={selectedGenre}
          onSelectGenre={handleGenreChange}
        />
      </Box>

      {/* Main Content State Rendering */}
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : error ? (
        <ErrorAlert message={error} onRetry={() => dispatch(fetchShows(debouncedQuery || selectedGenre))} />
      ) : filteredShows.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Alert
            severity="warning"
            icon={false}
            sx={{
              maxWidth: 500,
              mx: 'auto',
              borderRadius: '8px',
              p: 2.5,
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              borderColor: 'rgba(245, 158, 11, 0.3)',
              borderStyle: 'solid',
              borderWidth: '1px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#FFF' }}>
              Film Tidak Ditemukan
            </Typography>
            Tidak ada film yang cocok dengan kata kunci "{searchQuery}"
            {selectedGenre !== 'All' ? ` atau genre "${selectedGenre}"` : ''}. Silakan coba kata kunci lain.
          </Alert>

          <Button
            variant="outlined"
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setSelectedGenre('All'));
            }}
            sx={{ mt: 3, borderRadius: '6px' }}
          >
            Tampilkan Semua Film
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredShows.map((show) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={show.id}>
              <MovieCard show={show} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CatalogPage;
