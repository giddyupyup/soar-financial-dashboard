import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { BalanceHistoryEntry } from '@/types';
import { fetchBalanceHistory } from '@/utils/mockApi';

import { AppDispatch, RootState } from '../store';

interface BalanceHistoryState {
  history: BalanceHistoryEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BalanceHistoryState = {
  history: [],
  status: 'idle',
  error: null,
};

export const fetchBalanceHistoryAsync = createAsyncThunk<
  BalanceHistoryEntry[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('balanceHistory/fetchBalanceHistory', async (_, { getState }) => {
  const state = getState();
  const userId = state.user.id;
  const response = await fetchBalanceHistory(userId);
  return response;
});

const balanceHistorySlice = createSlice({
  name: 'balanceHistory',
  initialState,
  reducers: {
    addBalanceEntry: (state, action: PayloadAction<BalanceHistoryEntry>) => {
      state.history.push(action.payload);
      if (state.history.length > 7) {
        state.history.shift(); // Remove the oldest entry if we have more than 7
      }
    },
    updateCurrentMonthBalance: (state, action: PayloadAction<number>) => {
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      const index = state.history.findIndex((entry) => entry.date === currentMonth);
      if (index !== -1) {
        state.history[index].balance = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceHistoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalanceHistoryAsync.fulfilled, (state, action) => {
        return { ...state, history: action.payload, status: 'succeeded' };
      })
      .addCase(fetchBalanceHistoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch balance history';
      });
  },
});

export const { addBalanceEntry, updateCurrentMonthBalance } = balanceHistorySlice.actions;
export default balanceHistorySlice.reducer;
