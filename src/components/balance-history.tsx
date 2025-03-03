'use client';

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBalanceHistoryAsync } from '@/store/slices/balanceHistorySlice';
import type { AppDispatch, RootState } from '@/store/store';

import DashboardContainer from './dashboard-container';

Chart.register(...registerables);

export default function BalanceHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { history, status } = useSelector((state: RootState) => state.balanceHistory);
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (status === 'idle' && userId) {
      dispatch(fetchBalanceHistoryAsync(userId));
    }
    if (status === 'loading') {
      setIsLoading(true);
    }
    if (status === 'succeeded') {
      setIsLoading(false);
    }
  }, [dispatch, status, userId]);

  useEffect(() => {
    if (chartRef.current && history.length > 0) {
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

  if (isLoading) {
    return (
      <DashboardContainer title="Balance History">
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer title="Balance History">
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
