import { createContext } from 'react';

export type PaletteMode = 'dark' | 'light';

export interface ThemeModeContextType {
  mode: PaletteMode;
  toggleThemeMode: () => void;
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'dark',
  toggleThemeMode: () => {},
});
