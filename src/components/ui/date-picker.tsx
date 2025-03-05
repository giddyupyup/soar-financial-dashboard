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

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  onBlur: () => void;
  disabled?: boolean;
  name: string;
}

export function DatePicker({ value, onChange, onBlur, disabled = false, name }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentMonth(value || new Date());
    if (inputRef.current) {
      inputRef.current.value = value ? value.toISOString() : '';
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsMonthOpen(false);
        setIsYearOpen(false);
        onBlur();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    onChange(date);
    if (inputRef.current) {
      inputRef.current.value = date.toISOString();
    }
    setIsOpen(false);
    onBlur();
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

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(setMonth(currentMonth, monthIndex));
    setIsMonthOpen(false);
  };

  const handleYearChange = (year: number) => {
    setCurrentMonth(setYear(currentMonth, year));
    setIsYearOpen(false);
  };

  return (
    <div className="relative" ref={calendarRef}>
      <input type="hidden" name={name} ref={inputRef} value={value ? value.toISOString() : ''} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) setIsOpen(!isOpen);
        }}
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
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMonthOpen(!isMonthOpen);
                    setIsYearOpen(false);
                  }}
                  className="text-lg font-semibold text-[#232323] hover:bg-gray-100 px-2 py-1 rounded">
                  {format(currentMonth, 'MMMM')}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsYearOpen(!isYearOpen);
                    setIsMonthOpen(false);
                  }}
                  className="text-lg font-semibold text-[#232323] hover:bg-gray-100 px-2 py-1 rounded">
                  {format(currentMonth, 'yyyy')}
                </button>
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-6 w-6 text-[#232323]" />
              </button>
            </div>
            <AnimatePresence>
              {(isMonthOpen || isYearOpen) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-4 top-16 bottom-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20">
                  {isMonthOpen && (
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMonthChange(index);
                          }}
                          className={`p-2 rounded ${currentMonth.getMonth() === index ? 'bg-[#232323] text-white' : 'hover:bg-gray-100'}`}>
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}
                  {isYearOpen && (
                    <div className="h-full overflow-y-auto">
                      <div className="grid grid-cols-4 gap-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleYearChange(year);
                            }}
                            className={`p-2 rounded ${currentMonth.getFullYear() === year ? 'bg-[#232323] text-white' : 'hover:bg-gray-100'}`}>
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleDateClick(day);
                  }}
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
