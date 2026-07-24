import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchDefaultShowsApi, fetchSearchShowsApi, fetchShowDetailApi } from '../../api/tvmazeApi';
import type { FilmState, Show } from '../../types';

const initialState: FilmState = {
  shows: [],
  selectedShow: null,
  loading: false,
  error: null,
  searchQuery: 'avengers',
  selectedGenre: 'All',
};

export const fetchShows = createAsyncThunk(
  'film/fetchShows',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query || query.trim() === '') {
        return await fetchDefaultShowsApi();
      }
      return await fetchSearchShowsApi(query);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Terjadi kesalahan saat memuat data film.');
    }
  }
);

export const fetchShowDetail = createAsyncThunk(
  'film/fetchShowDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      return await fetchShowDetailApi(id);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Terjadi kesalahan saat memuat detail film.');
    }
  }
);

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setSelectedShow: (state, action: PayloadAction<Show | null>) => {
      state.selectedShow = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchShows
      .addCase(fetchShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShows.fulfilled, (state, action: PayloadAction<Show[]>) => {
        state.loading = false;
        state.shows = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Gagal memuat film.';
      })
      // fetchShowDetail
      .addCase(fetchShowDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowDetail.fulfilled, (state, action: PayloadAction<Show>) => {
        state.loading = false;
        state.selectedShow = action.payload;
      })
      .addCase(fetchShowDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Gagal memuat detail film.';
      });
  },
});

export const { setSearchQuery, setSelectedGenre, setSelectedShow, clearError } = filmSlice.actions;
export default filmSlice.reducer;
