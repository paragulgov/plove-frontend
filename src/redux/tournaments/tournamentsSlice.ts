import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../base/store';
import { setModalOpen, setSnackbar } from '../user/userSlice';
import { TournamentsApi } from './tournamentsApi';
import {
  FetchAllTournamentsRequest,
  FetchAllTournamentsResponse,
  CreateTournamentValues,
  TournamentData,
  TournamentsState,
  TableData,
} from './types';

const initialState: TournamentsState = {
  data: [],
  currentTournament: null,
  total: 0,
  skip: 0,
  isLoading: false,
  table: [],
};

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async (payload?: FetchAllTournamentsRequest) => {
    const { data } = await TournamentsApi.fetchTournaments(payload);
    return data;
  },
);

export const fetchTournamentById = createAsyncThunk('tournaments/fetchTournamentById', async (id: number) => {
  const { data } = await TournamentsApi.fetchTournamentById(id);
  return data;
});

export const fetchTournamentTable = createAsyncThunk(
  'tournaments/fetchTournamentTable',
  async (tournamentId: number) => {
    const { data } = await TournamentsApi.fetchTournamentStatistic(tournamentId);
    return data;
  },
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (payload: CreateTournamentValues, thunkAPI) => {
    try {
      const response = await TournamentsApi.createTournaments(payload);

      if (response?.data?.id) {
        return response?.data;
      }
    } catch (error) {
      thunkAPI.dispatch(setSnackbar({ open: true, severity: 'error', message: 'Упс, что-то пошло не так' }));
    } finally {
      thunkAPI.dispatch(setModalOpen({ modal: 'createTournament', value: false }));
    }
  },
);

export const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    clearTournaments: state => {
      state.data = [];
      state.total = 0;
      state.skip = 0;
      state.isLoading = false;
      state.table = [];
    },
    clearCurrentTournament: state => {
      state.currentTournament = null;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTournaments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTournaments.fulfilled, (state, action: PayloadAction<FetchAllTournamentsResponse>) => {
      state.data.push(...action.payload.data);
      state.total = action.payload.total;
      state.skip += 5;
      state.isLoading = false;
    });
    builder.addCase(fetchTournaments.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(fetchTournamentById.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTournamentById.fulfilled, (state, action: PayloadAction<TournamentData>) => {
      state.currentTournament = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTournamentById.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(createTournament.fulfilled, (state, action: PayloadAction<TournamentData>) => {
      if (action.payload.id) {
        state.data.unshift(action.payload);
      }
    });

    builder.addCase(fetchTournamentTable.fulfilled, (state, action: PayloadAction<TableData[]>) => {
      if (action.payload) {
        state.table = action.payload;
      }
    });
  },
});

export const { clearTournaments, clearCurrentTournament } = tournamentsSlice.actions;

export const selectTournaments = (state: RootState) => state.tournaments.data;

export default tournamentsSlice.reducer;
