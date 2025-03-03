'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUser } from '@/store/slices/userSlice';
import type { AppDispatch } from '@/store/store';

export default function InitializeStore() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = '1'; // In a real app, this would come from authentication
    dispatch(fetchUser(userId));
  }, [dispatch]);

  return null;
}
