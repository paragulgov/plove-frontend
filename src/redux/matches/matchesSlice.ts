import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { setModalOpen, setSnackbar } from '../user/userSlice';
import { MatchesApi } from './tournamentsApi';
import {
  CreateMatchDto,
  MatchData,
  MatchesPayload,
  MatchesResponse,
  MatchesState,
  UpdateMatchRequestPayload,
} from './types';

const initialState: MatchesState = {
  data: [],
  total: 0,
  skip: 0,
  isLoading: false,
};

export const fetchMatches = createAsyncThunk('matches/fetchMatches', async (payload: MatchesPayload) => {
  if (!isNaN(payload.tournamentId)) {
    const { data } = await MatchesApi.fetchMatches(payload);
    return data;
  }
});

export const createMatch = createAsyncThunk('bets/createMatch', async (payload: CreateMatchDto, thunkAPI) => {
  try {
    const response = await MatchesApi.createMatch(payload);

    if (response?.data?.id) {
      return response?.data;
    }
  } catch (error) {
    thunkAPI.dispatch(setSnackbar({ open: true, severity: 'error', message: 'Упс, что-то пошло не так' }));
  } finally {
    thunkAPI.dispatch(setModalOpen({ modal: 'createMatch', value: false }));
  }
});

export const updateMatch = createAsyncThunk(
  'bets/updateMatch',
  async (payload: UpdateMatchRequestPayload, thunkAPI) => {
    try {
      const response = await MatchesApi.updateMatch(payload);

      if (response?.data?.id) {
        return response?.data;
      }
    } catch (error) {
      thunkAPI.dispatch(setSnackbar({ open: true, severity: 'error', message: 'Упс, что-то пошло не так' }));
    } finally {
      thunkAPI.dispatch(setModalOpen({ modal: 'createMatch', value: false }));
    }
  },
);

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearMatches: state => {
      state.data = [];
      state.total = 0;
      state.skip = 0;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMatches.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action: PayloadAction<MatchesResponse>) => {
      state.data.push(...action.payload.data);
      state.total = action.payload.total;
      state.skip += 20;
      state.isLoading = false;
    });
    builder.addCase(fetchMatches.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(createMatch.fulfilled, (state, action: PayloadAction<MatchData>) => {
      if (action.payload.id) {
        state.data.unshift(action.payload);
      }
    });
    // .addCase(updateMatch.fulfilled, (state, action: PayloadAction<MatchData>) => {
    //   if (action.payload.id) {
    //     const { id, betsWillEndAt } = action.payload;
    //     state.data[id].betsWillEndAt = betsWillEndAt;
    //   }
    // });
  },
});

export const { clearMatches } = matchesSlice.actions;

export const selectMatches = (state: RootState) => state.matches.data;

export default matchesSlice.reducer;
