import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/components/layout';
import Accounts from '@/pages/accounts';
import CreditCards from '@/pages/credit-cards';
import Dashboard from '@/pages/dashboard';
import Investments from '@/pages/investments';
import Loans from '@/pages/loans';
import MyPrivileges from '@/pages/my-privileges';
import NotFound from '@/pages/not-found';
import Services from '@/pages/services';
import Settings from '@/pages/settings';
import Transactions from '@/pages/transactions';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="investments" element={<Investments />} />
        <Route path="credit-cards" element={<CreditCards />} />
        <Route path="loans" element={<Loans />} />
        <Route path="services" element={<Services />} />
        <Route path="my-privileges" element={<MyPrivileges />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
