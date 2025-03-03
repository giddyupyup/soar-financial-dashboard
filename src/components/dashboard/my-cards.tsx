'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CardCarousel from '@/components/ui/card-carousel';
import CardsSkeleton from '@/components/ui/skeletons/cards-skeletion';
import { fetchCreditCardsAsync } from '@/store/slices/creditCardsSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function MyCards() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { cards, status } = useSelector((state: RootState) => state.creditCards);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCreditCardsAsync());
    }
  }, [dispatch, status]);

  const handleSeeAll = () => {
    navigate('/credit-cards');
  };

  if (status === 'idle' || status === 'loading') {
    return <CardsSkeleton />;
  }

  return (
    <div className="bg-transparent backdrop-blur-sm rounded-xl p-6">
      <CardCarousel cards={cards} onSeeAll={handleSeeAll} />
    </div>
  );
}
