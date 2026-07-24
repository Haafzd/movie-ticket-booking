import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookingState, TicketBooking } from '../../types';

const LOCAL_STORAGE_KEY = 'cineverse_bookings';

const loadBookingsFromStorage = (): TicketBooking[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Gagal membaca data booking dari localStorage:', error);
  }
  return [];
};

const initialState: BookingState = {
  bookings: loadBookingsFromStorage(),
  lastBookedId: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookTicket: (state, action: PayloadAction<Omit<TicketBooking, 'id' | 'bookingDate'>>) => {
      const newBooking: TicketBooking = {
        ...action.payload,
        id: `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        bookingDate: new Date().toISOString(),
      };
      state.bookings.unshift(newBooking);
      state.lastBookedId = newBooking.id;
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((ticket) => ticket.id !== action.payload);
      if (state.lastBookedId === action.payload) {
        state.lastBookedId = null;
      }
    },
    clearLastBookedId: (state) => {
      state.lastBookedId = null;
    },
  },
});

export const { bookTicket, cancelBooking, clearLastBookedId } = bookingSlice.actions;
export default bookingSlice.reducer;
