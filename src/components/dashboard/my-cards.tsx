'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchCreditCardsAsync } from '@/store/slices/creditCardsSlice';
import type { AppDispatch, RootState } from '@/store/store';

import CardCarousel from '../ui/card-carousel';
import CardsSkeleton from '../ui/skeletons/cards-skeletion';

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
