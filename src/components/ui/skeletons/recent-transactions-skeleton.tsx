import { ScrollArea } from '@/components/ui/scroll-area';

import DashboardContainer from '../../dashboard/dashboard-container';

export default function RecentTransactionsSkeleton() {
  return (
    <DashboardContainer title="Recent Transactions">
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DashboardContainer>
  );
}
