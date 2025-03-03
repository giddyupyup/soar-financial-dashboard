'use client';

import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpenseStatisticsSkeleton from '@/components/ui/skeletons/expense-statistics-skeleton';
import { fetchExpenseStatisticsAsync } from '@/store/slices/expenseStatisticsSlice';
import type { AppDispatch, RootState } from '@/store/store';

import DashboardContainer from './dashboard-container';

export default function ExpenseStatistics() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { expenses, status } = useSelector((state: RootState) => state.expenseStatistics);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenseStatisticsAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (chartRef.current && expenses.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          plugins: [ChartDataLabels],
          data: {
            labels: expenses.map((expense) => expense.category),
            datasets: [
              {
                data: expenses.map((expense) => expense.amount),
                backgroundColor: ['#FC7900', '#232323', '#396AFF', '#343C6A'],
                borderColor: 'white',
                borderWidth: 1,
                offset: [10, 30, 5, 50],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
              datalabels: {
                color: '#ffffff',
                textAlign: 'center',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter: (value: number, context: any) => {
                  const dataset = context.chart.data.datasets[0];
                  const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
                  const percentage = ((value / Number(total)) * 100).toFixed(1);
                  const label = context.chart.data.labels[context.dataIndex];
                  return [`${percentage}%`, `${label}`];
                },
              },
            },
            layout: {
              padding: 20,
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  if (status === 'idle' || status === 'loading') {
    return <ExpenseStatisticsSkeleton />;
  }

  return (
    <DashboardContainer title="Expense Statistics">
      <div className={`h-[300px] flex items-center justify-center`}>
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
