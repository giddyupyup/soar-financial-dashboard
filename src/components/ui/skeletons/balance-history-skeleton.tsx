import DashboardContainer from '../../dashboard/dashboard-container';

export default function BalanceHistorySkeleton() {
  return (
    <DashboardContainer title="Balance History">
      <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
    </DashboardContainer>
  );
}
