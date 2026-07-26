import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

const LOCAL_STORAGE_USER_KEY = 'cineverse_user';


const DEFAULT_DEMO_USER: User = {
  id: "USR-DEMO-99",
  name: "Movie Fan Demo",
  email: "demo@cineverse.com",
};

const loadUserFromStorage = (): User | null => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Gagal membaca data user dari localStorage:', error);
  }
  return DEFAULT_DEMO_USER;
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      try {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(action.payload));
      } catch (error) {
        console.error('Gagal menyimpan user ke localStorage:', error);
      }
    },
    logoutUser: (state) => {
      state.user = null;
      try {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      } catch (error) {
        console.error('Gagal menghapus user dari localStorage:', error);
      }
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
