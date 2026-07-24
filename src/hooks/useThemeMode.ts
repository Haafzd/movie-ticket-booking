import { useContext } from 'react';
import { ThemeModeContext, type ThemeModeContextType } from '../context/ThemeContext';

export const useThemeMode = (): ThemeModeContextType => {
  return useContext(ThemeModeContext);
};
