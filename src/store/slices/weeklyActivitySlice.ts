import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startOfWeek, addDays, format, isBefore, parseISO } from 'date-fns';

import type { DailyActivity } from '@/types';
import { fetchWeeklyActivity } from '@/utils/mockApi';

import { AppDispatch, RootState } from '../store';

interface WeeklyActivityState {
  currentWeekStart: string;
  activities: DailyActivity[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeeklyActivityState = {
  currentWeekStart: format(startOfWeek(new Date(), { weekStartsOn: 0 }), 'yyyy-MM-dd'),
  activities: [],
  status: 'idle',
  error: null,
};

export const fetchWeeklyActivityAsync = createAsyncThunk<
  DailyActivity[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('weeklyActivity/fetchWeeklyActivity', async (_, { getState }) => {
  const state = getState();
  const userId = state.user.id;
  const currentWeekStart = state.weeklyActivity.currentWeekStart;
  return await fetchWeeklyActivity(userId, currentWeekStart);
});

const weeklyActivitySlice = createSlice({
  name: 'weeklyActivity',
  initialState,
  reducers: {
    setPreviousWeek: (state) => {
      const previousWeekStart = addDays(parseISO(state.currentWeekStart), -7);
      state.currentWeekStart = format(previousWeekStart, 'yyyy-MM-dd');
      state.status = 'idle'; // Reset status to trigger a new fetch
    },
    setNextWeek: (state) => {
      const nextWeekStart = addDays(parseISO(state.currentWeekStart), 7);
      const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
      if (
        isBefore(nextWeekStart, currentWeekStart) ||
        nextWeekStart.getTime() === currentWeekStart.getTime()
      ) {
        state.currentWeekStart = format(nextWeekStart, 'yyyy-MM-dd');
        state.status = 'idle'; // Reset status to trigger a new fetch
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyActivityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklyActivityAsync.fulfilled, (state, action) => {
        return { ...state, activities: action.payload, status: 'succeeded' };
      })
      .addCase(fetchWeeklyActivityAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch weekly activity';
      });
  },
});

export const { setPreviousWeek, setNextWeek } = weeklyActivitySlice.actions;
export default weeklyActivitySlice.reducer;
