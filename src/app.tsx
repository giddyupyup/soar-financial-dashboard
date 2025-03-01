'use client';

import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';

import AppRoutes from '@/routes';
import { store } from '@/store/store';

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </Router>
    </>
  );
}
