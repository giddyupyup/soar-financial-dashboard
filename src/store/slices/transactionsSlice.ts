import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { Transaction } from '@/types';
import { fetchTransactions } from '@/utils/mockApi';

import { AppDispatch, RootState } from '../store';

interface TransactionsState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchTransactionsAsync = createAsyncThunk<
  Transaction[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('transactions/fetchTransactions', async (_, { getState }) => {
  const state = getState();
  const userId = state.user.id;
  const response = await fetchTransactions(userId);
  return response;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        return { ...state, transactions: action.payload, status: 'succeeded' };
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export const { addTransaction, updateTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
