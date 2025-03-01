'use client';

import { format, parseISO } from 'date-fns';
import {
  Send,
  ShoppingCart,
  Briefcase,
  Utensils,
  RefreshCw,
  Zap,
  RotateCcw,
  Car,
  Film,
} from 'lucide-react';
import { useSelector } from 'react-redux';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { RootState } from '@/store/store';

import DashboardContainer from './dashboard-container';

export default function RecentTransactions() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quick transfer':
        return <Send className="h-5 w-5 text-blue-500" />;
      case 'online purchase':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'salary deposit':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'restaurant':
        return <Utensils className="h-5 w-5 text-yellow-500" />;
      case 'transfer':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case 'utilities':
        return <Zap className="h-5 w-5 text-red-500" />;
      case 'refund':
        return <RotateCcw className="h-5 w-5 text-green-500" />;
      case 'transportation':
        return <Car className="h-5 w-5 text-blue-500" />;
      case 'entertainment':
        return <Film className="h-5 w-5 text-red-500" />;
      default:
        return <RefreshCw className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardContainer title="Recent Transactions">
      <ScrollArea className="h-[235px] pr-4">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full ${transaction.iconBg || 'bg-gray-100'} flex items-center justify-center`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{transaction.type}</p>
                  <p className="text-xs text-gray-500">
                    {format(parseISO(transaction.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.amount > 0
                    ? `+$${transaction.amount.toLocaleString()}`
                    : `-$${Math.abs(transaction.amount).toLocaleString()}`}
                </div>
                <p className="text-xs text-gray-500">{transaction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DashboardContainer>
  );
}
