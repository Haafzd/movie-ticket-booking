/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getCustomTheme } from '../theme/theme';

export type PaletteMode = 'dark' | 'light';

export interface ThemeModeContextType {
  mode: PaletteMode;
  toggleThemeMode: () => void;
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'dark',
  toggleThemeMode: () => {},
});

const LOCAL_STORAGE_THEME_KEY = 'cineverse_theme_mode';

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (error) {
      console.error('Gagal membaca mode tema dari localStorage:', error);
    }
    return 'dark'; // Default to dark cinematic mode
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, mode);
    } catch (error) {
      console.error('Gagal menyimpan mode tema ke localStorage:', error);
    }
  }, [mode]);

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const muiTheme = useMemo(() => getCustomTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
