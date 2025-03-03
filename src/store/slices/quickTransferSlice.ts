import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type { QuickTransferContact } from '@/types';
import { fetchQuickTransferContacts } from '@/utils/mockApi';

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

export const fetchQuickTransferContactsAsync = createAsyncThunk(
  'quickTransfer/fetchQuickTransferContacts',
  async (userId: string) => {
    const response = await fetchQuickTransferContacts(userId);
    return response;
  },
);

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
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchQuickTransferContactsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch quick transfer contacts';
      });
  },
});

export const { addQuickTransferContact, removeQuickTransferContact } = quickTransferSlice.actions;
export default quickTransferSlice.reducer;
