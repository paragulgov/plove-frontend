import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { MatchesApi } from './tournamentsApi';
import { MatchesPayload, MatchesResponse, MatchesState } from './types';

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
  },
});

export const { clearMatches } = matchesSlice.actions;

export const selectMatches = (state: RootState) => state.matches.data;

export default matchesSlice.reducer;
