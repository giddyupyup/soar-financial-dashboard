import {
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

export default function Sidebar() {
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

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 text-white p-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 11V8a3 3 0 0 1 6 0v3"></path>
              <path d="M12 12v6"></path>
              <path d="M11 18h2"></path>
              <path d="M19 8.7V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1.7"></path>
              <path d="M3 12h18"></path>
              <path d="M3 16h18"></path>
              <path d="M8 16v4"></path>
              <path d="M16 16v4"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Soar Task</h1>
        </div>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
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
    </aside>
  );
}
