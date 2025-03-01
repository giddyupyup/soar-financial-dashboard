'use client';

import { useSelector } from 'react-redux';

import Card from '@/components/card';
import type { RootState } from '@/store/store';

export default function CreditCards() {
  const cards = useSelector((state: RootState) => state.creditCards.cards);

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-2xl font-semibold text-[#2D3B72] mb-6">Credit Cards</h1>

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
