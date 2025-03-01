'use client';

import { Search, Menu, Settings, Bell } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMediaQuery } from '@/hooks/use-media-query';

import MobileMenu from './mobile-menu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const location = useLocation();

  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path || path === 'dashboard') return 'Overview';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="relative h-16 px-4 lg:px-6 flex items-center justify-between">
          {!isDesktop ? (
            <>
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-[#2D3B72]">
                {getPageTitle()}
              </h1>
            </>
          ) : (
            <h1 className="text-2xl font-semibold text-[#2D3B72]">{getPageTitle()}</h1>
          )}

          {isDesktop && (
            <div className="flex-1 max-w-xl mx-auto px-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for something"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#232323] focus:border-[#232323]"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 lg:gap-4">
            {isDesktop && (
              <>
                <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer">
                  <Settings className="h-6 w-6" />
                </button>
                <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer relative">
                  <Bell className="h-6 w-6" />
                  {/* <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-[#232323] ring-2 ring-white"></span> */}
                </button>
              </>
            )}
            <button className="flex items-center focus:outline-none">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ItsODbBKgYoOqqwsEFA6chJvoFrW6p.png"
                alt="User profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {!isDesktop && (
          <div className="px-4 pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for something"
                className="block w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#232323]"
              />
            </div>
          </div>
        )}
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
