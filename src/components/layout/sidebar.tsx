import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '@/components/ui/svg';

import menuItems from './menu-items';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1 rounded">
              <Logo />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Soar Task</h1>
          </Link>
        </div>
      </div>

      <nav className="flex-1 py-4 space-y-1">
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
    </aside>
  );
}
