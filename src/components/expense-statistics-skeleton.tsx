import { useMediaQuery } from '@/hooks/use-media-query';

import DashboardContainer from './dashboard-container';

export default function ExpenseStatisticsSkeleton() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <DashboardContainer title="Expense Statistics">
      <div
        className={`${isMobile ? 'h-[300px]' : 'h-[280px]'} bg-gray-200 rounded animate-pulse`}></div>
    </DashboardContainer>
  );
}
