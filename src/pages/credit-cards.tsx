'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@/components/ui/card';
import CreditCardsSkeleton from '@/components/ui/skeletons/credit-cards-skeleton';
import { fetchCreditCardsAsync } from '@/store/slices/creditCardsSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function CreditCards() {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, status } = useSelector((state: RootState) => state.creditCards);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCreditCardsAsync());
    }
  }, [dispatch, status]);

  if (status === 'loading' || status === 'idle') {
    return <CreditCardsSkeleton />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, 350px)',
            justifyContent: 'center',
          }}>
          {cards.map((card) => (
            <div key={card.id} className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <Card
                balance={`$${card.balance.toLocaleString()}`}
                cardHolder={card.cardHolder}
                cardNumber={card.cardNumber}
                validThru={card.expiryDate}
                isBlack={card.isDefault}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
