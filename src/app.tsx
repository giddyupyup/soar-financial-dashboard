'use client';

import './index.css';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';

import InitializeStore from '@/components/initialize-store';
import { store } from '@/store/store';

import LayoutSkeleton from './components/ui/skeletons/layout-skeleton';

const AppRoutes = React.lazy(() => import('@/routes'));

export default function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <InitializeStore />
          <Suspense fallback={<LayoutSkeleton />}>
            <Toaster />
            <AppRoutes />
          </Suspense>
        </Provider>
      </Router>
    </>
  );
}
