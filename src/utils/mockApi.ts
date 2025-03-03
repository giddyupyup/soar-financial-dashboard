import { subMonths, format, addDays, isBefore, isToday } from 'date-fns';

import type {
  UserData,
  CreditCard,
  Transaction,
  QuickTransferContact,
  ExpenseStatistic,
  BalanceHistoryEntry,
  DailyActivity,
} from '@/types';

// Utility types
export type CreditCardNumber = `${number} **** **** ${number}`;
export type ExpiryDate = `${number}${number}/${number}${number}`;
export type CVV = '***';
export type PhoneNumber =
  `+1 ${number}${number}${number}-${number}${number}${number}-${number}${number}${number}${number}`;
export type PostalCode = `${number}${number}${number}${number}${number}`;

// Mock user data
const users: Record<string, UserData> = {
  '1': {
    id: '1',
    name: 'Charlene Reed',
    userName: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    dateOfBirth: '1990-01-25',
    presentAddress: 'San Jose, California, USA',
    permanentAddress: 'San Jose, California, USA',
    city: 'San Jose',
    postalCode: '45962',
    country: 'USA',
    occupation: 'Software Engineer',
    company: 'Tech Corp',
    annualIncome: 120000,
    creditScore: 750,
  },
  // Add more users as needed
};

// Helper function to generate consistent mock data based on userId
const generateMockData = (userId: string, seed: number) => {
  const rng = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  return {
    rng: () => rng(seed++),
    getAmount: (min: number, max: number) => Math.floor(rng(seed++) * (max - min + 1)) + min,
    getDate: (daysAgo: number) => format(subMonths(new Date(), daysAgo), 'yyyy-MM-dd'),
  };
};

// Mock API functions
export const fetchUserData = async (userId: string): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (users[userId]) {
    return users[userId];
  }
  throw new Error('User not found');
};

export const fetchCreditCards = async (userId: string): Promise<CreditCard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { getAmount, getDate } = generateMockData(userId, 1);

  return [
    {
      id: '1',
      cardNumber: `4111 **** **** ${getAmount(1000, 9999)}`,
      cardHolder: users[userId]?.name || 'Card Holder',
      expiryDate: getDate(24).slice(2, 7).replace('-', '/') as ExpiryDate,
      cvv: '***',
      balance: getAmount(1000, 10000),
      limit: 15000,
      isDefault: true,
    },
    {
      id: '2',
      cardNumber: `5555 **** **** ${getAmount(1000, 9999)}`,
      cardHolder: users[userId]?.name || 'Card Holder',
      expiryDate: getDate(36).slice(2, 7).replace('-', '/') as ExpiryDate,
      cvv: '***',
      balance: getAmount(1000, 10000),
      limit: 10000,
      isDefault: false,
    },
  ];
};

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { getAmount, getDate } = generateMockData(userId, 2);

  const transactionTypes = [
    { type: 'Online Purchase', icon: '🛒', iconBg: 'bg-blue-100', category: 'Shopping' },
    { type: 'Salary Deposit', icon: '💼', iconBg: 'bg-green-100', category: 'Income' },
    { type: 'Restaurant', icon: '🍽️', iconBg: 'bg-yellow-100', category: 'Food' },
    { type: 'Transfer', icon: '🔄', iconBg: 'bg-purple-100', category: 'Transfer' },
    { type: 'Utilities', icon: '💡', iconBg: 'bg-red-100', category: 'Bills' },
  ];

  return Array.from({ length: 10 }, (_, index) => {
    const transaction = transactionTypes[index % transactionTypes.length];
    return {
      id: `${index + 1}`,
      type: transaction.type,
      amount: transaction.type === 'Salary Deposit' ? getAmount(2000, 5000) : -getAmount(10, 500),
      date: getDate(index),
      description: `${transaction.type} ${index + 1}`,
      category: transaction.category,
      icon: transaction.icon,
      iconBg: transaction.iconBg,
    };
  });
};

export const fetchWeeklyActivity = async (
  userId: string,
  currentWeekStart: string,
): Promise<DailyActivity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const startDate = new Date(currentWeekStart);
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

export const fetchQuickTransferContacts = async (
  userId: string,
): Promise<QuickTransferContact[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { rng } = generateMockData(userId, 4);

  const names = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Martinez'];
  const roles = ['Friend', 'Colleague', 'Family'];

  return names.map((name, index) => ({
    id: `${index + 1}`,
    name,
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    role: roles[Math.floor(rng() * roles.length)],
  }));
};

export const fetchExpenseStatistics = async (userId: string): Promise<ExpenseStatistic[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { getAmount } = generateMockData(userId, 5);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills'];
  const total = categories.reduce((sum) => sum + getAmount(100, 1000), 0);

  return categories.map((category) => {
    const amount = getAmount(100, 1000);
    return {
      category,
      amount,
      percentage: Math.round((amount / total) * 100),
    };
  });
};

export const fetchBalanceHistory = async (userId: string): Promise<BalanceHistoryEntry[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { getAmount } = generateMockData(userId, 6);

  const today = new Date();
  return Array.from({ length: 7 })
    .map((_, index) => {
      const date = subMonths(today, index);
      return {
        date: format(date, 'MMM'),
        balance: getAmount(1000, 10000),
      };
    })
    .reverse();
};
