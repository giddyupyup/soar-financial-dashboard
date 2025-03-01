import BalanceHistory from '@/components/balance-history';
import ExpenseStatistics from '@/components/expense-statistics';
import MyCards from '@/components/my-cards';
import QuickTransfer from '@/components/quick-transfer';
import RecentTransactions from '@/components/recent-transactions';
import WeeklyActivity from '@/components/weekly-activity';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto lg:p-6 pb-6">
      <div className="space-y-6">
        {/* My Cards and Recent Transactions */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0 lg:col-span-2">
            <MyCards />
          </div>
          <div className="min-h-0">
            <RecentTransactions />
          </div>
        </div>

        {/* Weekly Activity and Expense Statistics */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0 lg:col-span-2">
            <WeeklyActivity />
          </div>
          <div className="min-h-0">
            <ExpenseStatistics />
          </div>
        </div>

        {/* Quick Transfer and Balance History */}
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="min-h-0">
            <QuickTransfer />
          </div>
          <div className="min-h-0 lg:col-span-2">
            <BalanceHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
