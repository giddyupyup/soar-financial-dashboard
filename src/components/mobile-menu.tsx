import {
  X,
  Home,
  BarChart2,
  Users,
  TrendingUp,
  CreditCard,
  DollarSign,
  Grid,
  Award,
  Settings,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/transactions', label: 'Transactions', icon: BarChart2 },
    { path: '/accounts', label: 'Accounts', icon: Users },
    { path: '/investments', label: 'Investments', icon: TrendingUp },
    { path: '/credit-cards', label: 'Credit Cards', icon: CreditCard },
    { path: '/loans', label: 'Loans', icon: DollarSign },
    { path: '/services', label: 'Services', icon: Grid },
    { path: '/my-privileges', label: 'My Privileges', icon: Award },
    { path: '/settings', label: 'Setting', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>

      <div className="relative flex flex-col w-80 max-w-xs h-full bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Link onClick={onClose} to="/" className="flex items-center space-x-2">
              <div className="p-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.875 2.91669C22.387 2.9167 22.89 3.05147 23.3333 3.30746C23.7767 3.56346 24.1449 3.93164 24.4009 4.37502H26.25C27.0236 4.37502 27.7655 4.68231 28.3124 5.22929C28.8594 5.77627 29.1667 6.51814 29.1667 7.29169V24.7917C29.1667 26.7256 28.3985 28.5802 27.031 29.9477C25.6636 31.3151 23.8089 32.0834 21.875 32.0834H8.75004C7.97649 32.0834 7.23463 31.7761 6.68765 31.2291C6.14066 30.6821 5.83337 29.9402 5.83337 29.1667V7.29169C5.83337 6.51814 6.14066 5.77627 6.68765 5.22929C7.23463 4.68231 7.97649 4.37502 8.75004 4.37502H10.5992C10.8552 3.93164 11.2234 3.56346 11.6667 3.30746C12.1101 3.05147 12.6131 2.9167 13.125 2.91669H21.875ZM21.6184 13.6777L15.4321 19.8654L13.3686 17.8019C13.0935 17.5362 12.7252 17.3893 12.3428 17.3926C11.9604 17.3959 11.5947 17.5493 11.3243 17.8197C11.0539 18.09 10.9005 18.4558 10.8972 18.8382C10.8939 19.2206 11.0409 19.5889 11.3065 19.864L14.2961 22.855C14.4451 23.0041 14.6219 23.1223 14.8166 23.203C15.0113 23.2836 15.2199 23.3251 15.4307 23.3251C15.6414 23.3251 15.8501 23.2836 16.0447 23.203C16.2394 23.1223 16.4163 23.0041 16.5652 22.855L23.6819 15.7398C23.8173 15.6043 23.9247 15.4435 23.9979 15.2665C24.0712 15.0895 24.1088 14.8998 24.1088 14.7083C24.1087 14.5167 24.0709 14.327 23.9975 14.1501C23.9242 13.9732 23.8167 13.8124 23.6812 13.677C23.5457 13.5416 23.3849 13.4342 23.2079 13.361C23.0309 13.2877 22.8412 13.2501 22.6496 13.2501C22.4581 13.2502 22.2684 13.288 22.0915 13.3614C21.9145 13.4347 21.7538 13.5422 21.6184 13.6777ZM21.1459 5.83335H13.8542C13.6835 5.8333 13.5183 5.8931 13.3872 6.00236C13.2561 6.11161 13.1674 6.2634 13.1367 6.43127L13.125 6.56252V8.02085C13.125 8.19152 13.1848 8.35679 13.294 8.4879C13.4033 8.619 13.5551 8.70763 13.723 8.73835L13.8542 8.75002H21.1459C21.3165 8.75008 21.4818 8.69027 21.6129 8.58101C21.744 8.47176 21.8327 8.31998 21.8634 8.1521L21.875 8.02085V6.56252C21.8751 6.39186 21.8153 6.22658 21.706 6.09548C21.5968 5.96437 21.445 5.87574 21.2771 5.84502L21.1459 5.83335Z"
                    fill="#232323"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Soar Task</h1>
            </Link>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-8 py-3 ${
                  isActive
                    ? 'border-l-6 border-[#232323] text-[#232323]'
                    : 'text-[#B1B1B1] hover:bg-gray-100'
                }`}>
                <Icon className="h-5 w-5" />
                <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
