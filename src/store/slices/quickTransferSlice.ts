import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { QuickTransferContact } from '@/types';
import { fetchQuickTransferContacts } from '@/utils/mockApi';

import { AppDispatch, RootState } from '../store';

interface QuickTransferState {
  contacts: QuickTransferContact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuickTransferState = {
  contacts: [],
  status: 'idle',
  error: null,
};

export const fetchQuickTransferContactsAsync = createAsyncThunk<
  QuickTransferContact[],
  void,
  { state: RootState; dispatch: AppDispatch }
>('quickTransfer/fetchQuickTransferContacts', async (_, { getState }) => {
  const state = getState();
  const userId = state.user.id;
  const response = await fetchQuickTransferContacts(userId);
  return response;
});

const quickTransferSlice = createSlice({
  name: 'quickTransfer',
  initialState,
  reducers: {
    addQuickTransferContact: (state, action: PayloadAction<QuickTransferContact>) => {
      state.contacts.push(action.payload);
    },
    removeQuickTransferContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickTransferContactsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuickTransferContactsAsync.fulfilled, (state, action) => {
        return { ...state, contacts: action.payload, status: 'succeeded' };
      })
      .addCase(fetchQuickTransferContactsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch quick transfer contacts';
      });
  },
});

export const { addQuickTransferContact, removeQuickTransferContact } = quickTransferSlice.actions;
export default quickTransferSlice.reducer;
