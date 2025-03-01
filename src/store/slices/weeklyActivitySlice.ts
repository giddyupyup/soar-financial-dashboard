import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { startOfWeek, addDays, format, isBefore, isToday, parseISO } from 'date-fns';

export interface DailyActivity {
  day: string;
  date: string;
  withdraw: number;
  deposit: number;
}

interface WeeklyActivityState {
  currentWeekStart: string;
  activities: DailyActivity[];
}

const generateWeekData = (startDate: Date): DailyActivity[] => {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index);
    const isPastOrToday = isBefore(date, today) || isToday(date);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'yyyy-MM-dd'),
      withdraw: isPastOrToday ? Math.floor(Math.random() * 400) : 0,
      deposit: isPastOrToday ? Math.floor(Math.random() * 600) : 0,
    };
  });
};

const initialState: WeeklyActivityState = {
  currentWeekStart: format(startOfWeek(new Date(), { weekStartsOn: 0 }), 'yyyy-MM-dd'),
  activities: generateWeekData(startOfWeek(new Date(), { weekStartsOn: 0 })),
};

const weeklyActivitySlice = createSlice({
  name: 'weeklyActivity',
  initialState,
  reducers: {
    setWeeklyActivity: (state, action: PayloadAction<DailyActivity[]>) => {
      state.activities = action.payload;
    },
    updateWeeklyActivity: (state, action: PayloadAction<DailyActivity>) => {
      const index = state.activities.findIndex((activity) => activity.date === action.payload.date);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },
    setPreviousWeek: (state) => {
      const previousWeekStart = addDays(parseISO(state.currentWeekStart), -7);
      state.currentWeekStart = format(previousWeekStart, 'yyyy-MM-dd');
      state.activities = generateWeekData(previousWeekStart);
    },
    setNextWeek: (state) => {
      const nextWeekStart = addDays(parseISO(state.currentWeekStart), 7);
      const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
      if (
        isBefore(nextWeekStart, currentWeekStart) ||
        nextWeekStart.getTime() === currentWeekStart.getTime()
      ) {
        state.currentWeekStart = format(nextWeekStart, 'yyyy-MM-dd');
        state.activities = generateWeekData(nextWeekStart);
      }
    },
  },
});

export const { setWeeklyActivity, updateWeeklyActivity, setPreviousWeek, setNextWeek } =
  weeklyActivitySlice.actions;
export default weeklyActivitySlice.reducer;
