import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/auth/authSlice';
import betsReducer from '../redux/bets/betsSlice';
import matchesReducer from '../redux/matches/matchesSlice';
import tournamentsReducer from '../redux/tournaments/tournamentsSlice';
import userReducer from '../redux/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tournaments: tournamentsReducer,
    matches: matchesReducer,
    bets: betsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
