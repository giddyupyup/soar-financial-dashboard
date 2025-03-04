'use client';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  setMonth,
  setYear,
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarIcon, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type React from 'react';

interface DatepickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function Datepicker({ value, onChange, disabled = false }: DatepickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = setMonth(currentMonth, Number.parseInt(event.target.value));
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = setYear(currentMonth, Number.parseInt(event.target.value));
    setCurrentMonth(newYear);
  };

  return (
    <div className="relative" ref={calendarRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#232323] text-[#232323] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
            {value ? format(value, 'MMMM d, yyyy') : <span>Pick a date</span>}
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 p-4 bg-white rounded-lg shadow-xl z-10 w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-6 w-6 text-[#232323]" />
              </button>
              <div className="flex space-x-2">
                <select
                  value={currentMonth.getMonth()}
                  onChange={handleMonthChange}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#232323] text-[#232323]">
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={currentMonth.getFullYear()}
                  onChange={handleYearChange}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#232323] text-[#232323]">
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-6 w-6 text-[#232323]" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center text-gray-500 text-sm">
                  {day}
                </div>
              ))}
              {days.map((day) => (
                <button
                  type="button"
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  className={`
                    p-2 text-center text-sm rounded-full transition-colors
                    ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : 'text-[#232323]'}
                    ${isSameDay(day, value as Date) ? 'bg-[#232323] text-white' : ''}
                    ${isSameMonth(day, currentMonth) && !isSameDay(day, value as Date) ? 'hover:bg-gray-100' : ''}
                  `}>
                  {format(day, 'd')}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
