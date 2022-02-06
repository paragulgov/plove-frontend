import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { TournamentsApi } from './tournamentsApi';
import { TournamentData, TournamentsState } from './types';

const initialState: TournamentsState = {
  data: [],
  isLoading: false,
};

export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
  const { data } = await TournamentsApi.fetchTournaments();
  return data;
});

export const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTournaments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTournaments.fulfilled, (state, action: PayloadAction<TournamentData[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTournaments.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const selectTournaments = (state: RootState) => state.tournaments.data;

export default tournamentsSlice.reducer;
