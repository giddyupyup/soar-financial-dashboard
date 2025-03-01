import { configureStore } from '@reduxjs/toolkit';

import balanceHistoryReducer from './slices/balanceHistorySlice';
import creditCardsReducer from './slices/creditCardsSlice';
import expenseStatisticsReducer from './slices/expenseStatisticsSlice';
import quickTransferReducer from './slices/quickTransferSlice';
import transactionsReducer from './slices/transactionsSlice';
import userReducer from './slices/userSlice';
import weeklyActivityReducer from './slices/weeklyActivitySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    creditCards: creditCardsReducer,
    transactions: transactionsReducer,
    weeklyActivity: weeklyActivityReducer,
    quickTransfer: quickTransferReducer,
    expenseStatistics: expenseStatisticsReducer,
    balanceHistory: balanceHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
