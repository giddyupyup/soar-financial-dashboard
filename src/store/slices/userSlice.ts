import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
