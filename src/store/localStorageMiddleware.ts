import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './index';

const LOCAL_STORAGE_KEY = 'cineverse_bookings';

export const localStorageMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  try {
    const state = storeApi.getState() as RootState;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.booking.bookings));
  } catch (error) {
    console.error('Gagal menyimpan data booking ke localStorage:', error);
  }
  return result;
};
