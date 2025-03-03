export default function CardsSkeleton() {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex space-x-4">
        {[1, 2].map((index) => (
          <div
            key={index}
            className="w-[350px] h-[235px] bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
