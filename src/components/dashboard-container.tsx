import type React from 'react';

export default function DashboardContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col lg:px-0 px-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="lg:bg-white lg:rounded-3xl lg:shadow-sm p-6">{children}</div>
    </div>
  );
}
