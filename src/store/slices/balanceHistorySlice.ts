import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { subMonths, format } from 'date-fns';

interface BalanceHistoryEntry {
  date: string;
  balance: number;
}

interface BalanceHistoryState {
  history: BalanceHistoryEntry[];
}

const generateLastSevenMonths = (): BalanceHistoryEntry[] => {
  const today = new Date();
  return Array.from({ length: 7 })
    .map((_, index) => {
      const date = subMonths(today, index);
      return {
        date: format(date, 'MMM'),
        balance: Math.floor(Math.random() * 5000) + 1000, // Random balance between 1000 and 6000
      };
    })
    .reverse(); // Reverse to have oldest month first
};

const initialState: BalanceHistoryState = {
  history: generateLastSevenMonths(),
};

const balanceHistorySlice = createSlice({
  name: 'balanceHistory',
  initialState,
  reducers: {
    setBalanceHistory: (state, action: PayloadAction<BalanceHistoryEntry[]>) => {
      state.history = action.payload;
    },
    addBalanceEntry: (state, action: PayloadAction<BalanceHistoryEntry>) => {
      state.history.push(action.payload);
      if (state.history.length > 7) {
        state.history.shift(); // Remove the oldest entry if we have more than 7
      }
    },
    updateCurrentMonthBalance: (state, action: PayloadAction<number>) => {
      const currentMonth = format(new Date(), 'MMM');
      const index = state.history.findIndex((entry) => entry.date === currentMonth);
      if (index !== -1) {
        state.history[index].balance = action.payload;
      }
    },
  },
});

export const { setBalanceHistory, addBalanceEntry, updateCurrentMonthBalance } =
  balanceHistorySlice.actions;
export default balanceHistorySlice.reducer;
