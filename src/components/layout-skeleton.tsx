export default function LayoutSkeleton() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Skeleton */}
        <header className="bg-white border-b border-gray-200">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-64 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
