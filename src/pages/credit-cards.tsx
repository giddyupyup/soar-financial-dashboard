'use client';

import React, { Suspense } from 'react';

import CreditCardsSkeleton from '@/components/ui/skeletons/credit-cards-skeleton';

const CreditCardsContent = React.lazy(
  () => import('@/components/credit-cards/credit-cards-content'),
);

export default function CreditCards() {
  return (
    <Suspense fallback={<CreditCardsSkeleton />}>
      <CreditCardsContent />
    </Suspense>
  );
}
