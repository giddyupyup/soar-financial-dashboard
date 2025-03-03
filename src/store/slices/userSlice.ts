import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { UserData } from '@/types';
import { fetchUserData } from '@/utils/mockApi';

interface UserState extends UserData {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  id: '',
  name: '',
  userName: '',
  email: '',
  dateOfBirth: '',
  presentAddress: '',
  permanentAddress: '',
  city: '',
  postalCode: '',
  country: '',
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string) => {
  const response = await fetchUserData(userId);
  return response;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<UserData>) => {
    // In a real application, you would make an API call here to update the user data
    // For now, we'll just return the updated data
    await new Promise((resolve) => setTimeout(resolve, 500));
    return userData;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        return { ...state, ...action.payload, status: 'succeeded' };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<Partial<UserData>>) => {
        return { ...state, ...action.payload, status: 'succeeded' };
      });
  },
});

export default userSlice.reducer;
