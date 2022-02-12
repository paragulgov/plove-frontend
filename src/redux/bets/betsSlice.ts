import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { BetsApi } from './betsApi';
import { BetsResponse, BetsState, GetBetsQuery } from './types';

const initialState: BetsState = {
  data: [],
  total: 0,
  skip: 0,
  isLoading: false,
};

export const fetchBets = createAsyncThunk('bets/fetchBets', async (payload: GetBetsQuery) => {
  if (!isNaN(payload.matchId)) {
    const { data } = await BetsApi.fetchBets(payload);
    return data;
  }
});

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    clearBets: state => {
      state.data = [];
      state.total = 0;
      state.skip = 0;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBets.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchBets.fulfilled, (state, action: PayloadAction<BetsResponse>) => {
      state.data.push(...action.payload.data);
      state.total = action.payload.total;
      state.skip += 30;
      state.isLoading = false;
    });
    builder.addCase(fetchBets.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { clearBets } = betsSlice.actions;

export const selectBets = (state: RootState) => state.bets.data;

export default betsSlice.reducer;
