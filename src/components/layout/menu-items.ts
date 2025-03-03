import {
  CreditCard,
  Home,
  Investment,
  Loan,
  Privilege,
  Services,
  Setting,
  Transaction,
  User,
} from '@/components/ui/svg';

export default [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  { path: '/transactions', label: 'Transactions', icon: Transaction },
  { path: '/accounts', label: 'Accounts', icon: User },
  { path: '/investments', label: 'Investments', icon: Investment },
  { path: '/credit-cards', label: 'Credit Cards', icon: CreditCard },
  { path: '/loans', label: 'Loans', icon: Loan },
  { path: '/services', label: 'Services', icon: Services },
  { path: '/my-privileges', label: 'My Privileges', icon: Privilege },
  { path: '/settings', label: 'Setting', icon: Setting },
];
