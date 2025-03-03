'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '@/components/ui/svg';

import menuItems from './menu-items';

interface MobileMenuContentProps {
  onClose: () => void;
}

export default function MobileMenuContent({ onClose }: MobileMenuContentProps) {
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>

      <div className="relative flex flex-col w-80 max-w-xs h-full bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Link onClick={onClose} to="/" className="flex items-center space-x-2">
              <div className="p-1 rounded">
                <Logo />
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

        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <div className="relative">
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex text-lg items-center space-x-6 px-8 py-3 ${
                    isActive
                      ? 'border-l-6 border-[#232323] text-[#232323]'
                      : 'text-[#B1B1B1] hover:bg-gray-100'
                  }`}>
                  <Icon className="h-5 w-5" fill={isActive ? '#232323' : '#B1B1B1'} />
                  <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                </Link>
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 w-2 h-full rounded-r-lg bg-gray-900"
                    layoutId="activeMenu"
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
