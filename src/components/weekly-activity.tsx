'use client';

import { Chart, registerables, type ChartConfiguration } from 'chart.js';
import { format, getWeek, parseISO, startOfWeek, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setPreviousWeek,
  setNextWeek,
  fetchWeeklyActivityAsync,
} from '@/store/slices/weeklyActivitySlice';
import type { RootState, AppDispatch } from '@/store/store';

import DashboardContainer from './dashboard-container';

Chart.register(...registerables);

export default function WeeklyActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { activities, currentWeekStart, status } = useSelector(
    (state: RootState) => state.weeklyActivity,
  );
  const userId = useSelector((state: RootState) => state.user.id);

  const currentWeekStartDate = startOfWeek(new Date(), { weekStartsOn: 0 });
  const displayedWeekStart = parseISO(currentWeekStart);
  const canGoToNextWeek = !isSameDay(displayedWeekStart, currentWeekStartDate);

  const weekNumber = getWeek(displayedWeekStart, { weekStartsOn: 0 });
  const year = format(displayedWeekStart, 'yyyy');

  useEffect(() => {
    if (status === 'idle' && userId) {
      dispatch(fetchWeeklyActivityAsync(userId));
    }
    if (status === 'loading') {
      setIsLoading(true);
    }
    if (status === 'succeeded') {
      setIsLoading(false);
    }
  }, [dispatch, status, userId]);

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
                label: 'Deposit',
                data: activities.map((activity) => activity.deposit),
                backgroundColor: '#4F7DF3',
                borderRadius: 8,
                barThickness: 16,
              },
              {
                label: 'Withdraw',
                data: activities.map((activity) => activity.withdraw),
                backgroundColor: '#000000',
                borderRadius: 8,
                barThickness: 16,
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
                max: 600,
                ticks: {
                  stepSize: 100,
                  color: '#64748b',
                  font: { size: 12 },
                },
                grid: { color: '#e2e8f0' },
                border: { display: false },
              },
            },
            barPercentage: 0.5,
            categoryPercentage: 0.7,
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

  if (isLoading) {
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
