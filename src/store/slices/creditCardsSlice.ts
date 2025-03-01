import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  isDefault: boolean;
}

interface CreditCardsState {
  cards: CreditCard[];
}

const initialState: CreditCardsState = {
  cards: [
    {
      id: '1',
      cardNumber: '4111 **** **** 1111',
      cardHolder: 'John Doe',
      expiryDate: '12/24',
      cvv: '***',
      balance: 5000,
      isDefault: true,
    },
    {
      id: '2',
      cardNumber: '5555 **** **** 4444',
      cardHolder: 'John Doe',
      expiryDate: '06/25',
      cvv: '***',
      balance: 2500,
      isDefault: false,
    },
    {
      id: '3',
      cardNumber: '3782 **** **** 1000',
      cardHolder: 'John Doe',
      expiryDate: '09/26',
      cvv: '***',
      balance: 7500,
      isDefault: false,
    },
    {
      id: '4',
      cardNumber: '6011 **** **** 2000',
      cardHolder: 'John Doe',
      expiryDate: '03/27',
      cvv: '***',
      balance: 1000,
      isDefault: false,
    },
  ],
};

const creditCardsSlice = createSlice({
  name: 'creditCards',
  initialState,
  reducers: {
    setCreditCards: (state, action: PayloadAction<CreditCard[]>) => {
      state.cards = action.payload;
    },
    addCreditCard: (state, action: PayloadAction<CreditCard>) => {
      state.cards.push(action.payload);
    },
    updateCreditCard: (state, action: PayloadAction<CreditCard>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    removeCreditCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setDefaultCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.map((card) => ({
        ...card,
        isDefault: card.id === action.payload,
      }));
    },
  },
});

export const { setCreditCards, addCreditCard, updateCreditCard, removeCreditCard, setDefaultCard } =
  creditCardsSlice.actions;
export default creditCardsSlice.reducer;
