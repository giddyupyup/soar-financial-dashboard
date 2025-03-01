import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
}

interface ExpenseStatisticsState {
  expenses: ExpenseCategory[];
}

const initialState: ExpenseStatisticsState = {
  expenses: [],
};

const expenseStatisticsSlice = createSlice({
  name: 'expenseStatistics',
  initialState,
  reducers: {
    setExpenseStatistics: (state, action: PayloadAction<ExpenseCategory[]>) => {
      state.expenses = action.payload;
    },
    updateExpenseCategory: (state, action: PayloadAction<ExpenseCategory>) => {
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
});

export const { setExpenseStatistics, updateExpenseCategory } = expenseStatisticsSlice.actions;
export default expenseStatisticsSlice.reducer;
