import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { instance } from '../../base/api';
import { AuthApi } from './authApi';
import { AuthState, LoginVKPayload, LoginVKResponse } from './types';

const initialState: AuthState = {
  isAuth: false,
  completeCheckAuth: false,
  isLoading: false,
};

export const authMe = createAsyncThunk('auth/authMe', async () => {
  const { data } = await AuthApi.authMe();
  return data;
});

export const loginVK = createAsyncThunk('auth/loginVK', async (payload: LoginVKPayload) => {
  const { data } = await AuthApi.loginVK(payload);
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuth = false;
      localStorage.removeItem('plvToken');
      instance.defaults.headers.common['Authorization'] = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(authMe.fulfilled, state => {
      state.completeCheckAuth = true;
      state.isAuth = true;
    });
    builder.addCase(authMe.rejected, state => {
      localStorage.removeItem('plvToken');
      state.completeCheckAuth = true;
      state.isAuth = false;
    });

    builder.addCase(loginVK.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginVK.fulfilled, (state, action: PayloadAction<LoginVKResponse>) => {
      localStorage.setItem('plvToken', action.payload.token);
      instance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(loginVK.rejected, state => {
      state.isAuth = false;
      state.isLoading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
