'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchBalanceHistoryAsync } from '@/store/slices/balanceHistorySlice';
import { fetchCreditCardsAsync } from '@/store/slices/creditCardsSlice';
import { fetchExpenseStatisticsAsync } from '@/store/slices/expenseStatisticsSlice';
import { fetchQuickTransferContactsAsync } from '@/store/slices/quickTransferSlice';
import { fetchTransactionsAsync } from '@/store/slices/transactionsSlice';
import { fetchUser } from '@/store/slices/userSlice';
import { fetchWeeklyActivityAsync } from '@/store/slices/weeklyActivitySlice';
import type { AppDispatch } from '@/store/store';

export default function InitializeStore() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = '1'; // In a real app, this would come from authentication
    dispatch(fetchUser(userId));
    dispatch(fetchCreditCardsAsync(userId));
    dispatch(fetchTransactionsAsync(userId));
    dispatch(fetchWeeklyActivityAsync(userId));
    dispatch(fetchQuickTransferContactsAsync(userId));
    dispatch(fetchExpenseStatisticsAsync(userId));
    dispatch(fetchBalanceHistoryAsync(userId));
  }, [dispatch]);

  return null;
}
