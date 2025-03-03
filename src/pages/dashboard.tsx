import React, { Suspense } from 'react';

import BalanceHistorySkeleton from '@/components/ui/skeletons/balance-history-skeleton';
import CardsSkeleton from '@/components/ui/skeletons/cards-skeletion';
import ExpenseStatisticsSkeleton from '@/components/ui/skeletons/expense-statistics-skeleton';
import QuickTransferSkeleton from '@/components/ui/skeletons/quick-transfer-skeleton';
import RecentTransactionsSkeleton from '@/components/ui/skeletons/recent-transactions-skeleton';
import WeeklyActivitySkeleton from '@/components/ui/skeletons/weekly-activity-skeleton';

const BalanceHistory = React.lazy(() => import('@/components/dashboard/balance-history'));
const ExpenseStatistics = React.lazy(() => import('@/components/dashboard/expense-statistics'));
const MyCards = React.lazy(() => import('@/components/dashboard/my-cards'));
const QuickTransfer = React.lazy(() => import('@/components/dashboard/quick-transfer'));
const RecentTransactions = React.lazy(() => import('@/components/dashboard/recent-transactions'));
const WeeklyActivity = React.lazy(() => import('@/components/dashboard/weekly-activity'));

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto lg:p-6 pb-6">
      <div className="space-y-6">
        {/* My Cards and Recent Transactions */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0 lg:col-span-2">
            <Suspense fallback={<CardsSkeleton />}>
              <MyCards />
            </Suspense>
          </div>
          <div className="min-h-0">
            <Suspense fallback={<RecentTransactionsSkeleton />}>
              <RecentTransactions />
            </Suspense>
          </div>
        </div>

        {/* Weekly Activity and Expense Statistics */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0 lg:col-span-2">
            <Suspense fallback={<WeeklyActivitySkeleton />}>
              <WeeklyActivity />
            </Suspense>
          </div>
          <div className="min-h-0">
            <Suspense fallback={<ExpenseStatisticsSkeleton />}>
              <ExpenseStatistics />
            </Suspense>
          </div>
        </div>

        {/* Quick Transfer and Balance History */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0">
            <Suspense fallback={<QuickTransferSkeleton />}>
              <QuickTransfer />
            </Suspense>
          </div>
          <div className="min-h-0 lg:col-span-2">
            <Suspense fallback={<BalanceHistorySkeleton />}>
              <BalanceHistory />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
