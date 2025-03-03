import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { ExpenseStatistic } from '@/types';
import { fetchExpenseStatistics } from '@/utils/mockApi';

interface ExpenseStatisticsState {
  expenses: ExpenseStatistic[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExpenseStatisticsState = {
  expenses: [],
  status: 'idle',
  error: null,
};

export const fetchExpenseStatisticsAsync = createAsyncThunk(
  'expenseStatistics/fetchExpenseStatistics',
  async (userId: string) => {
    const response = await fetchExpenseStatistics(userId);
    return response;
  },
);

const expenseStatisticsSlice = createSlice({
  name: 'expenseStatistics',
  initialState,
  reducers: {
    updateExpenseCategory: (state, action: PayloadAction<ExpenseStatistic>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.category === action.payload.category,
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      } else {
        state.expenses.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseStatisticsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenseStatisticsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
      })
      .addCase(fetchExpenseStatisticsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch expense statistics';
      });
  },
});

export const { updateExpenseCategory } = expenseStatisticsSlice.actions;
export default expenseStatisticsSlice.reducer;
