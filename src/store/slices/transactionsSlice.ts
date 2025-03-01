import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  icon?: string;
  iconBg?: string;
}

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: '1',
      type: 'Online Purchase',
      amount: -50.0,
      date: '2023-06-01',
      description: 'Amazon.com',
      icon: '🛒',
      iconBg: 'bg-blue-100',
    },
    {
      id: '2',
      type: 'Salary Deposit',
      amount: 3000.0,
      date: '2023-05-31',
      description: 'Monthly Salary',
      icon: '💼',
      iconBg: 'bg-green-100',
    },
    {
      id: '3',
      type: 'Restaurant',
      amount: -85.5,
      date: '2023-05-30',
      description: 'Dinner with friends',
      icon: '🍽️',
      iconBg: 'bg-yellow-100',
    },
    {
      id: '4',
      type: 'Transfer',
      amount: -200.0,
      date: '2023-05-29',
      description: 'Transfer to savings',
      icon: '🔄',
      iconBg: 'bg-purple-100',
    },
    {
      id: '5',
      type: 'Utilities',
      amount: -120.75,
      date: '2023-05-28',
      description: 'Electricity bill',
      icon: '💡',
      iconBg: 'bg-red-100',
    },
    {
      id: '6',
      type: 'Refund',
      amount: 25.0,
      date: '2023-05-27',
      description: 'Return at Walmart',
      icon: '🔙',
      iconBg: 'bg-green-100',
    },
    {
      id: '7',
      type: 'Transportation',
      amount: -30.0,
      date: '2023-05-26',
      description: 'Uber ride',
      icon: '🚗',
      iconBg: 'bg-blue-100',
    },
    {
      id: '8',
      type: 'Entertainment',
      amount: -15.99,
      date: '2023-05-25',
      description: 'Netflix subscription',
      icon: '🎬',
      iconBg: 'bg-red-100',
    },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
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
});

export const { setTransactions, addTransaction, updateTransaction, removeTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
