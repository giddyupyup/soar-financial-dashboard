'use client';

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

import DashboardContainer from './dashboard-container';

Chart.register(...registerables);

export default function BalanceHistory() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const balanceHistory = useSelector((state: RootState) => state.balanceHistory.history);

  useEffect(() => {
    if (chartRef.current && balanceHistory.length > 0) {
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
            labels: balanceHistory.map((entry) => entry.date),
            datasets: [
              {
                label: 'Balance',
                data: balanceHistory.map((entry) => entry.balance),
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
  }, [balanceHistory]);

  return (
    <DashboardContainer title="Balance History">
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
