import React from 'react';
import { Box, Chip } from '@mui/material';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
        mb: 4,
      }}
    >
      {genres.map((genre) => {
        const isSelected = selectedGenre === genre;
        return (
          <Chip
            key={genre}
            label={genre}
            onClick={() => onSelectGenre(genre)}
            clickable
            color={isSelected ? 'primary' : 'default'}
            variant={isSelected ? 'filled' : 'outlined'}
            sx={{
              px: 1,
              py: 0.5,
              fontWeight: isSelected ? 700 : 500,
              backgroundColor: isSelected ? '#E50914' : 'rgba(18, 23, 38, 0.6)',
              borderColor: isSelected ? '#E50914' : 'rgba(255, 255, 255, 0.12)',
              '&:hover': {
                backgroundColor: isSelected ? '#FF2E4D' : 'rgba(229, 9, 20, 0.15)',
                borderColor: '#E50914',
              },
            }}
          />
        );
      })}
    </Box>
  );
};
