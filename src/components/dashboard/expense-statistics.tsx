'use client';

import { Chart, type ChartConfiguration } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpenseStatisticsSkeleton from '@/components/ui/skeletons/expense-statistics-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { fetchExpenseStatisticsAsync } from '@/store/slices/expenseStatisticsSlice';
import type { AppDispatch, RootState } from '@/store/store';

import DashboardContainer from './dashboard-container';

export default function ExpenseStatistics() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, status } = useSelector((state: RootState) => state.expenseStatistics);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenseStatisticsAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        // Destroy previous chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const data = {
          labels: expenses.map((expense) => expense.category),
          datasets: [
            {
              data: expenses.map((expense) => expense.percentage),
              backgroundColor: [
                '#2D3B72', // Entertainment - navy blue
                '#FF8C42', // Bill Expense - orange
                '#4F7DF3', // Investment - bright blue
                '#2A2A2A', // Others - black
              ],
              borderWidth: 0,
            },
          ],
        };

        const config: ChartConfiguration = {
          type: 'pie',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: isMobile ? 'bottom' : 'right',
                labels: {
                  boxWidth: 10,
                  padding: 20,
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || '';
                    const value = context.raw as number;
                    return `${label}: ${value}%`;
                  },
                },
              },
            },
          },
        };

        // Create new chart
        chartInstance.current = new Chart(ctx, config);
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isMobile, expenses]);

  if (status === 'idle' || status === 'loading') {
    return <ExpenseStatisticsSkeleton />;
  }

  return (
    <DashboardContainer title="Expense Statistics">
      <div className={`${isMobile ? 'h-[300px]' : 'h-[280px]'}`}>
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
