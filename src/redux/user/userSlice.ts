import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../base/store';
import { UserData, UserState } from './types';
import { UserApi } from './userApi';

const initialState: UserState = {
  data: null,
  userGetted: false,
  isLoading: false,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { data } = await UserApi.fetchUser();
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.data = null;
      state.userGetted = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { clearUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
