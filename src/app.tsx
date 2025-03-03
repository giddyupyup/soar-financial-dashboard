'use client';

import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';

import AppRoutes from '@/routes';
import { store } from '@/store/store';

import InitializeStore from './components/initialize-store';

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Provider store={store}>
          <InitializeStore />
          <AppRoutes />
        </Provider>
      </Router>
    </>
  );
}
