import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mb: 3 }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari judul film bioskop (misal: Batman, Dune, Spider-Man)..."
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#E50914', fontSize: 26 }} />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton onClick={() => onChange('')} edge="end" size="small">
                  <ClearIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </Box>
  );
};
