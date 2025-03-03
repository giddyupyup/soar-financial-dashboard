// Utility types
export type CreditCardNumber = `${number} **** **** ${number}`;
export type ExpiryDate = `${number}${number}/${number}${number}`;
export type CVV = '***';
export type PhoneNumber =
  `+1 ${number}${number}${number}-${number}${number}${number}-${number}${number}${number}${number}`;
export type PostalCode = `${number}${number}${number}${number}${number}`;

// User data interface
export interface UserData {
  id: string;
  name: string;
  userName: string;
  email: string;
  avatar?: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
  occupation?: string;
  company?: string;
  annualIncome?: number;
  creditScore?: number;
}

// Credit card interface
export interface CreditCard {
  id: string;
  cardNumber: CreditCardNumber;
  cardHolder: string;
  expiryDate: ExpiryDate;
  cvv: CVV;
  balance: number;
  limit: number;
  isDefault: boolean;
}

// Transaction interface
export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
}

// Weekly activity interface
export interface WeeklyActivity {
  day: string;
  date: string;
  withdraw: number;
  deposit: number;
}

// Quick transfer contact interface
export interface QuickTransferContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

// Expense statistics interface
export interface ExpenseStatistic {
  category: string;
  amount: number;
  percentage: number;
}

// Balance history interface
export interface BalanceHistoryEntry {
  date: string;
  balance: number;
}

export interface DailyActivity {
  day: string;
  date: string;
  withdraw: number;
  deposit: number;
}
