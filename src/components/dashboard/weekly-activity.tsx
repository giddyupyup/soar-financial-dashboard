'use client';

import { Chart, registerables, type ChartConfiguration } from 'chart.js';
import { format, getWeek, parseISO, startOfWeek, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WeeklyActivitySkeleton from '@/components/ui/skeletons/weekly-activity-skeleton';
import {
  setPreviousWeek,
  setNextWeek,
  fetchWeeklyActivityAsync,
} from '@/store/slices/weeklyActivitySlice';
import type { RootState, AppDispatch } from '@/store/store';

import DashboardContainer from './dashboard-container';

Chart.register(...registerables);

export default function WeeklyActivity() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { activities, currentWeekStart, status } = useSelector(
    (state: RootState) => state.weeklyActivity,
  );

  const currentWeekStartDate = startOfWeek(new Date(), { weekStartsOn: 0 });
  const displayedWeekStart = parseISO(currentWeekStart);
  const canGoToNextWeek = !isSameDay(displayedWeekStart, currentWeekStartDate);

  const weekNumber = getWeek(displayedWeekStart, { weekStartsOn: 0 });
  const year = format(displayedWeekStart, 'yyyy');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWeeklyActivityAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (chartRef.current && activities.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: activities.map((activity) => activity.day),
            datasets: [
              {
                label: 'Withdraw',
                data: activities.map((activity) => activity.withdraw),
                backgroundColor: '#000000',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
              },
              {
                label: 'Deposit',
                data: activities.map((activity) => activity.deposit),
                backgroundColor: '#4F7DF3',
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                align: 'end',
                reverse: true,
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  color: '#64748b',
                  font: { size: 12 },
                },
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: $${Number(context.formattedValue).toFixed(2)}`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: '#64748b',
                  font: { size: 12 },
                },
              },
              y: {
                beginAtZero: true,
                max: 500,
                ticks: {
                  stepSize: 100,
                  color: '#64748b',
                  font: { size: 12 },
                },
                grid: { color: '#F3F3F5' },
                border: { display: false },
              },
            },
          },
        } as ChartConfiguration);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activities]);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const buttonClasses = `
    flex items-center justify-center
    bg-gray-100 rounded-md text-gray-700
    hover:bg-[#232323] hover:text-white
    focus:outline-none focus:ring-0
    transition-colors duration-200 ease-in-out
  `;

  if (status === 'idle' || status === 'loading') {
    return <WeeklyActivitySkeleton />;
  }

  return (
    <DashboardContainer title="Weekly Activity">
      <div className="flex justify-between items-center mb-4">
        <motion.button
          onClick={() => dispatch(setPreviousWeek())}
          className={`${buttonClasses} h-8 px-2 sm:px-3 cursor-pointer`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Previous Week">
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline text-sm">Previous</span>
        </motion.button>
        <span className="text-sm font-medium">
          Week {weekNumber}, {year}
        </span>
        <motion.button
          onClick={() => canGoToNextWeek && dispatch(setNextWeek())}
          className={`${buttonClasses} h-8 px-2 sm:px-3 ${
            canGoToNextWeek
              ? 'cursor-pointer'
              : 'opacity-50 cursor-not-allowed hover:bg-gray-100 hover:text-gray-700'
          }`}
          variants={buttonVariants}
          whileHover={canGoToNextWeek ? 'hover' : ''}
          whileTap={canGoToNextWeek ? 'tap' : ''}
          disabled={!canGoToNextWeek}
          aria-label="Next Week">
          <span className="hidden sm:inline text-sm">Next</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </motion.button>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </DashboardContainer>
  );
}
