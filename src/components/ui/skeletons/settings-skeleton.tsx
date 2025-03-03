export default function SettingsSkeleton() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6 py-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="md:flex md:gap-12">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:w-48">
                <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Form Section */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
