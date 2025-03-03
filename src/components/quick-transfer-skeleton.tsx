import DashboardContainer from './dashboard-container';

export default function QuickTransferSkeleton() {
  return (
    <DashboardContainer title="Quick Transfer">
      <div className="mb-6 flex space-x-4 overflow-hidden">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex-shrink-0 w-20">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mt-1 animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="flex items-center">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mr-4"></div>
          <div className="flex-grow h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </DashboardContainer>
  );
}
