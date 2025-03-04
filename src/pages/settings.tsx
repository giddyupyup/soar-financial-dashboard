'use client';

import React from 'react';
import { Suspense } from 'react';

import SettingsSkeleton from '@/components/ui/skeletons/settings-skeleton';

const SettingsContent = React.lazy(() => import('@/components/settings/settings-content'));

export default function Settings() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsContent />
    </Suspense>
  );
}
