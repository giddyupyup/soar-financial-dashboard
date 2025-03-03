'use client';

import { Outlet } from 'react-router-dom';

import { useMediaQuery } from '@/hooks/use-media-query';

import Header from './header';
import Sidebar from './sidebar';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <div className="flex h-screen bg-white">
        {isDesktop && <Sidebar />}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
