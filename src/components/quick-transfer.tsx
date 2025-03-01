'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { addTransaction } from '@/store/slices/transactionsSlice';
import type { RootState } from '@/store/store';

import ContactAvatar from './contact-avatar';
import DashboardContainer from './dashboard-container';

export default function QuickTransfer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [amount, setAmount] = useState('525.50');

  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.quickTransfer.contacts);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  const handleContactClick = (id: string) => {
    setActiveContactId(id === activeContactId ? null : id);
  };

  const handleSend = () => {
    if (activeContactId === null) {
      toast.error('Please select a contact for the transfer.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);

      const recipient = contacts.find((c) => c.id === activeContactId)?.name;
      const newTransaction = {
        id: Date.now().toString(),
        type: 'Quick Transfer',
        amount: -Number.parseFloat(amount),
        date: new Date().toISOString(),
        description: `Transfer to ${recipient}`,
        icon: '🔄',
        iconBg: 'bg-blue-100',
      };

      dispatch(addTransaction(newTransaction));
      toast.success(`Successfully transferred $${amount} to ${recipient}`);

      setTimeout(() => {
        setIsSent(false);
        setActiveContactId(null); // Reset active contact after sending
        setAmount('525.50'); // Reset amount to default
      }, 2000);
    }, 2000);
  };

  return (
    <DashboardContainer title="Quick Transfer">
      <div className="relative mb-6">
        <div className="embla overflow-hidden pt-3" ref={emblaRef}>
          <div className="embla__container flex">
            {contacts.map((contact) => (
              <div key={contact.id} className="embla__slide flex-[0_0_80px] mr-4">
                <ContactAvatar
                  id={contact.id}
                  name={contact.name}
                  role={contact.role}
                  avatar={contact.avatar}
                  isActive={contact.id === activeContactId}
                  onClick={() => handleContactClick(contact.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <motion.button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md h-8 w-8 flex items-center justify-center cursor-pointer"
          aria-label="Next contact"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#232323',
          }}
          whileTap={{ scale: 0.9 }}>
          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-white" />
        </motion.button>
      </div>

      <div className="mt-auto">
        <div className="flex items-center">
          <label className="text-[#6B7280] text-sm mr-4 whitespace-nowrap">Write Amount</label>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="525.50"
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-32"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <AnimatePresence mode="wait">
              {!isLoading && !isSent && (
                <motion.button
                  key="send"
                  className={`absolute right-0 top-0 h-full px-6 rounded-full flex items-center space-x-2 ${
                    activeContactId !== null
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleSend}
                  disabled={activeContactId === null}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={activeContactId !== null ? { scale: 1.05 } : {}}
                  whileTap={activeContactId !== null ? { scale: 0.95 } : {}}>
                  <span>Send</span>
                  <Send className="h-4 w-4" />
                </motion.button>
              )}
              {isLoading && (
                <motion.div
                  key="loading"
                  className="absolute right-0 top-0 h-full px-6 rounded-full bg-gray-900 text-white flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </motion.div>
              )}
              {isSent && (
                <motion.div
                  key="sent"
                  className="absolute right-0 top-0 h-full px-6 rounded-full bg-green-500 text-white flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}>
                  <span>Sent!</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
