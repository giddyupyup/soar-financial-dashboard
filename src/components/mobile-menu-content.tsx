'use client';
import { X } from 'lucide-react';
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

interface MobileMenuContentProps {
  onClose: () => void;
}

export default function MobileMenuContent({ onClose }: MobileMenuContentProps) {
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
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>

      <div className="relative flex flex-col w-80 max-w-xs h-full bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Link onClick={onClose} to="/" className="flex items-center space-x-2">
              <div className="p-1 rounded">
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
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
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
