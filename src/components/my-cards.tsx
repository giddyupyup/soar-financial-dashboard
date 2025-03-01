'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { RootState } from '@/store/store';

import Card from './card';

export default function MyCards() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cards = useSelector((state: RootState) => state.creditCards.cards);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const updateScrollButtons = useCallback(() => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', updateScrollButtons);
      emblaApi.on('reInit', updateScrollButtons);
      updateScrollButtons();
    }
  }, [emblaApi, updateScrollButtons]);

  const handleSeeAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/credit-cards');
    }, 500);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Cards</h2>
        <motion.button
          className="text-sm font-medium text-[#232323] hover:opacity-70 transition-opacity duration-200 ease-in-out cursor-pointer"
          onClick={handleSeeAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {isLoading ? (
            <motion.div
              className="h-5 w-5 border-2 border-[#232323] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            />
          ) : (
            <span className="relative">
              See All
              <motion.span
                className="absolute left-0 bottom-0 w-full h-0.5 bg-[#232323]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          )}
        </motion.button>
      </div>

      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {cards.map((card) => (
              <div key={card.id} className="embla__slide flex-shrink-0 mr-6">
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

        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 transition-colors duration-200 ease-in-out hover:bg-[#232323] group cursor-pointer"
            aria-label="Previous card">
            <ChevronLeft className="h-8 w-8 text-gray-500 group-hover:text-white" />
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 transition-colors duration-200 ease-in-out hover:bg-[#232323] group cursor-pointer"
            aria-label="Next card">
            <ChevronRight className="h-8 w-8 text-gray-500 group-hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
