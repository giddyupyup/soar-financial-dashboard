import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { CreditCard } from '@/types';
import { fetchCreditCards } from '@/utils/mockApi';

interface CreditCardsState {
  cards: CreditCard[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CreditCardsState = {
  cards: [],
  status: 'idle',
  error: null,
};

export const fetchCreditCardsAsync = createAsyncThunk(
  'creditCards/fetchCreditCards',
  async (userId: string) => {
    const response = await fetchCreditCards(userId);
    return response;
  },
);

const creditCardsSlice = createSlice({
  name: 'creditCards',
  initialState,
  reducers: {
    addCreditCard: (state, action: PayloadAction<CreditCard>) => {
      state.cards.push(action.payload);
    },
    updateCreditCard: (state, action: PayloadAction<CreditCard>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    removeCreditCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setDefaultCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.map((card) => ({
        ...card,
        isDefault: card.id === action.payload,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditCardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreditCardsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCreditCardsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch credit cards';
      });
  },
});

export const { addCreditCard, updateCreditCard, removeCreditCard, setDefaultCard } =
  creditCardsSlice.actions;
export default creditCardsSlice.reducer;
