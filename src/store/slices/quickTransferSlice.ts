import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface QuickTransferContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface QuickTransferState {
  contacts: QuickTransferContact[];
}

const initialState: QuickTransferState = {
  contacts: [],
};

const quickTransferSlice = createSlice({
  name: 'quickTransfer',
  initialState,
  reducers: {
    setQuickTransferContacts: (state, action: PayloadAction<QuickTransferContact[]>) => {
      state.contacts = action.payload;
    },
    addQuickTransferContact: (state, action: PayloadAction<QuickTransferContact>) => {
      state.contacts.push(action.payload);
    },
    removeQuickTransferContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { setQuickTransferContacts, addQuickTransferContact, removeQuickTransferContact } =
  quickTransferSlice.actions;
export default quickTransferSlice.reducer;
