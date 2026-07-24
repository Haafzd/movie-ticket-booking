import React, { useEffect } from 'react';
import { Container, Typography, Box, Grid, Alert, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
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
    dispatch(fetchShows(debouncedQuery));
  }, [dispatch, debouncedQuery]);

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleGenreChange = (genre: string) => {
    dispatch(setSelectedGenre(genre));
  };

  // Filter shows based on selected genre chip
  const filteredShows = shows.filter((show) => {
    if (selectedGenre === 'All') return true;
    return show.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
  });

  return (
    <Container maxWidth="xl" className="fade-in">
      {/* Hero Banner Header */}
      <Box
        sx={{
          textAlign: 'center',
          pt: { xs: 2, md: 4 },
          pb: { xs: 4, md: 5 },
          mb: 4,
          borderRadius: 6,
          background: 'radial-gradient(ellipse at top, rgba(229, 9, 20, 0.15) 0%, rgba(9, 12, 21, 0) 70%)',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: 8,
            backgroundColor: 'rgba(229, 9, 20, 0.12)',
            border: '1px solid rgba(229, 9, 20, 0.3)',
            mb: 2,
          }}
        >
          <LocalActivityIcon sx={{ color: '#E50914', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: '#FF2E4D', fontWeight: 700, letterSpacing: '1px' }}>
            PEMESANAN TIKET BIOSKOP ONLINE
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
            lineHeight: 1.1,
            mb: 2,
            background: 'linear-gradient(180deg, #FFFFFF 30%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cari & Pesan Tiket Film Favoritmu
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 650, mx: 'auto', fontSize: '1.05rem', mb: 4 }}
        >
          Jelajahi katalog acara TV dan film terkini. Pilih jadwal tayang favoritmu dan dapatkan tiket fisik digital secara langsung.
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
        <ErrorAlert message={error} onRetry={() => dispatch(fetchShows(debouncedQuery))} />
      ) : filteredShows.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Alert
            severity="warning"
            variant="outlined"
            sx={{
              maxWidth: 550,
              mx: 'auto',
              borderRadius: 3,
              backgroundColor: 'rgba(245, 158, 11, 0.05)',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Film Tidak Ditemukan
            </Typography>
            Tidak ada film yang cocok dengan kata kunci "{searchQuery}"
            {selectedGenre !== 'All' ? ` atau genre "${selectedGenre}"` : ''}. Silakan coba pencarian lain.
          </Alert>
          <Button
            variant="outlined"
            startIcon={<MovieIcon />}
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setSelectedGenre('All'));
            }}
            sx={{ mt: 3 }}
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
