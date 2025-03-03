'use client';

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBalanceHistoryAsync } from '@/store/slices/balanceHistorySlice';
import type { AppDispatch, RootState } from '@/store/store';

import BalanceHistorySkeleton from './balance-history-skeleton';
import DashboardContainer from './dashboard-container';

Chart.register(...registerables);

export default function BalanceHistory() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { history, status } = useSelector((state: RootState) => state.balanceHistory);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBalanceHistoryAsync());
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

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: history.map((entry) => entry.date),
            datasets: [
              {
                label: 'Balance',
                data: history.map((entry) => entry.balance),
                borderColor: '#4F7DF3',
                backgroundColor: 'rgba(79, 125, 243, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: (context) => `Balance: $${context.parsed.y.toFixed(2)}`,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                  color: '#64748B',
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${value}`,
                  font: {
                    size: 12,
                  },
                  color: '#64748B',
                },
                grid: {
                  color: '#E2E8F0',
                },
                border: {
                  display: false,
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [history]);

  if (status === 'idle' || status === 'loading') {
    return <BalanceHistorySkeleton />;
  }

  return (
    <DashboardContainer title="Balance History">
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
