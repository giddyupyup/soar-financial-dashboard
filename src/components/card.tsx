import { CreditCard } from 'lucide-react';
import type { FC } from 'react';

interface CardProps {
  balance: string;
  cardHolder: string;
  cardNumber: string;
  validThru: string;
  isBlack?: boolean;
}

const Card: FC<CardProps> = ({ balance, cardHolder, cardNumber, validThru, isBlack = true }) => {
  const bgColor = isBlack ? 'bg-gradient-to-b from-black to-[#5B5A6F]' : 'bg-white';
  const textColor = isBlack ? 'text-white' : 'text-[#343C6A]';
  const labelColor = isBlack ? 'text-gray-400' : 'text-[#718EBF]';

  return (
    <div
      className={`w-[350px] h-[235px] ${bgColor} rounded-3xl flex flex-col justify-between shadow-sm`}>
      {/* Top Section */}
      <div className="flex px-6 pt-4 justify-between items-start">
        <div>
          <p className={`${labelColor} text-sm mb-1`}>Balance</p>
          <p className={`${textColor} text-3xl font-semibold`}>{balance}</p>
        </div>
        <div className={`${isBlack ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>
          <CreditCard />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex items-center px-6 space-x-4">
        <div>
          <p className={`${labelColor} text-sm mb-1`}>CARD HOLDER</p>
          <p className={`${textColor} text-base font-medium`}>{cardHolder}</p>
        </div>
        <div className="text-right ml-auto">
          <p className={`${labelColor} text-sm mb-1`}>VALID THRU</p>
          <p className={`${textColor} text-base font-medium`}>{validThru}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between px-6 py-4 items-center border-t-1 border-[#DFEAF2]">
        <p className={`${textColor} text-xl tracking-wider font-medium`}>{cardNumber}</p>
        <div className="flex -space-x-2">
          <div
            className={`w-8 h-8 rounded-full ${
              isBlack ? 'bg-gray-600' : 'bg-gray-200'
            } opacity-80`}></div>
          <div
            className={`w-8 h-8 rounded-full ${
              isBlack ? 'bg-gray-500' : 'bg-gray-300'
            } opacity-80`}></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
