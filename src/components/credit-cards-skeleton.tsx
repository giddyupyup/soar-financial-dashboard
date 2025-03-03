export default function CreditCardsSkeleton() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, 350px)',
            justifyContent: 'center',
          }}>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <div className="w-[350px] h-[235px] bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
