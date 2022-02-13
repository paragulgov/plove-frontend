import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { setModalOpen, setSnackbar } from '../user/userSlice';
import { BetsApi } from './betsApi';
import { BetsData, BetsResponse, BetsState, CreateBetDto, GetBetsQuery } from './types';

const initialState: BetsState = {
  data: [],
  total: 0,
  skip: 0,
  isLoading: false,
  access: false,
};

export const fetchBets = createAsyncThunk('bets/fetchBets', async (payload: GetBetsQuery) => {
  if (!isNaN(payload.matchId)) {
    const { data } = await BetsApi.fetchBets(payload);
    return data;
  }
});

export const checkAccess = createAsyncThunk('bets/checkAccess', async (matchId: number) => {
  if (!isNaN(matchId)) {
    const { data } = await BetsApi.checkAccess(matchId);
    return data;
  }
});

export const createBet = createAsyncThunk('bets/createBet', async (payload: CreateBetDto, thunkAPI) => {
  if (!isNaN(payload.matchId && payload.homeTeamGoalsBet && payload.awayTeamGoalsBet)) {
    try {
      const { data } = await BetsApi.createBet(payload);

      thunkAPI.dispatch(setSnackbar({ open: true, severity: 'success', message: 'Прогноз засчитан' }));

      return data;
    } catch (err) {
      thunkAPI.dispatch(setSnackbar({ open: true, severity: 'error', message: 'Упс, что-то пошло не так' }));
    } finally {
      thunkAPI.dispatch(setModalOpen({ modal: 'createBet', value: false }));
    }
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
      state.access = false;
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

    builder.addCase(checkAccess.fulfilled, (state, action: PayloadAction<{ access: boolean }>) => {
      if (action.payload.access) {
        state.access = action.payload.access;
      }
    });

    builder.addCase(createBet.fulfilled, (state, action: PayloadAction<BetsData>) => {
      if (action.payload.id) {
        state.data.unshift(action.payload);
        state.access = false;
      }
    });
  },
});

export const { clearBets } = betsSlice.actions;

export const selectBets = (state: RootState) => state.bets.data;

export default betsSlice.reducer;
