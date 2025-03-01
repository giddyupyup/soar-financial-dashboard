'use client';

import { startOfWeek, addDays, format, isBefore, isToday, subMonths } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setBalanceHistory } from '@/store/slices/balanceHistorySlice';
import { setCreditCards } from '@/store/slices/creditCardsSlice';
import { setExpenseStatistics } from '@/store/slices/expenseStatisticsSlice';
import { setQuickTransferContacts } from '@/store/slices/quickTransferSlice';
import { setTransactions } from '@/store/slices/transactionsSlice';
import { setUser } from '@/store/slices/userSlice';
import { setWeeklyActivity } from '@/store/slices/weeklyActivitySlice';

export default function InitializeStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate API calls to fetch initial data
    dispatch(
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/placeholder.svg?height=128&width=128',
      }),
    );

    dispatch(
      setCreditCards([
        {
          id: '1',
          cardNumber: '4111 **** **** 1111',
          cardHolder: 'John Doe',
          expiryDate: '12/24',
          cvv: '***',
          balance: 5000,
          isDefault: true,
        },
        {
          id: '2',
          cardNumber: '5555 **** **** 4444',
          cardHolder: 'John Doe',
          expiryDate: '06/25',
          cvv: '***',
          balance: 2500,
          isDefault: false,
        },
        {
          id: '3',
          cardNumber: '3782 **** **** 1000',
          cardHolder: 'John Doe',
          expiryDate: '09/26',
          cvv: '***',
          balance: 7500,
          isDefault: false,
        },
        {
          id: '4',
          cardNumber: '6011 **** **** 2000',
          cardHolder: 'John Doe',
          expiryDate: '03/27',
          cvv: '***',
          balance: 1000,
          isDefault: false,
        },
      ]),
    );

    dispatch(
      setTransactions([
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
      ]),
    );

    const generateWeekData = (startDate: Date) => {
      const today = new Date();
      return Array.from({ length: 7 }).map((_, index) => {
        const date = addDays(startDate, index);
        const isPastOrToday = isBefore(date, today) || isToday(date);
        return {
          day: format(date, 'EEE'),
          date: format(date, 'yyyy-MM-dd'),
          withdraw: isPastOrToday ? Math.floor(Math.random() * 400) : 0,
          deposit: isPastOrToday ? Math.floor(Math.random() * 600) : 0,
        };
      });
    };

    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
    dispatch(setWeeklyActivity(generateWeekData(currentWeekStart)));

    dispatch(
      setQuickTransferContacts([
        {
          id: '1',
          name: 'Alice Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1',
          role: 'Friend',
        },
        {
          id: '2',
          name: 'Bob Smith',
          avatar: 'https://i.pravatar.cc/150?img=2',
          role: 'Colleague',
        },
        {
          id: '3',
          name: 'Carol Williams',
          avatar: 'https://i.pravatar.cc/150?img=3',
          role: 'Family',
        },
        { id: '4', name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=4', role: 'Friend' },
        {
          id: '5',
          name: 'Eva Martinez',
          avatar: 'https://i.pravatar.cc/150?img=5',
          role: 'Colleague',
        },
        { id: '6', name: 'Frank Lee', avatar: 'https://i.pravatar.cc/150?img=6', role: 'Family' },
        { id: '7', name: 'Grace Kim', avatar: '', role: 'Friend' },
        {
          id: '8',
          name: 'Henry Nguyen',
          avatar: 'https://i.pravatar.cc/150?img=8',
          role: 'Colleague',
        },
        { id: '9', name: 'Ivy Chen', avatar: '', role: 'Family' },
        {
          id: '10',
          name: 'Jack Wilson',
          avatar: 'https://i.pravatar.cc/150?img=10',
          role: 'Friend',
        },
      ]),
    );

    dispatch(
      setExpenseStatistics([
        { category: 'Food', amount: 500, percentage: 25 },
        { category: 'Transport', amount: 300, percentage: 15 },
        { category: 'Entertainment', amount: 400, percentage: 20 },
        { category: 'Bills', amount: 800, percentage: 40 },
      ]),
    );

    const generateLastSevenMonths = (): { date: string; balance: number }[] => {
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

    dispatch(setBalanceHistory(generateLastSevenMonths()));
  }, [dispatch]);

  return null;
}
