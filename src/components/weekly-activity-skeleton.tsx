import DashboardContainer from './dashboard-container';

export default function WeeklyActivitySkeleton() {
  return (
    <DashboardContainer title="Weekly Activity">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </DashboardContainer>
  );
}
