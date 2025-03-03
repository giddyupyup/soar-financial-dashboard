import { User } from 'lucide-react';

interface ContactAvatarProps {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  isActive: boolean;
  onClick: (id: string | number) => void;
}

export default function ContactAvatar({
  id,
  name,
  role,
  avatar,
  isActive,
  onClick,
}: ContactAvatarProps) {
  return (
    <button
      className={`flex flex-col items-center cursor-pointer min-w-[80px] transition-all duration-200 ease-in-out ${
        isActive ? 'transform scale-105' : ''
      }`}
      onClick={() => onClick(id)}>
      <div
        className={`w-16 h-16 rounded-full overflow-hidden mb-2 border-2 ${
          isActive ? 'border-[#232323]' : 'border-transparent'
        }`}>
        {avatar ? (
          <img
            src={avatar || '/placeholder.svg'}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500" />
          </div>
        )}
      </div>
      <p
        className={`text-sm text-[#232323] text-center truncate w-full ${isActive ? 'font-bold' : 'font-medium'}`}>
        {name}
      </p>
      <p
        className={`text-xs text-gray-500 text-center truncate w-full ${isActive ? 'font-bold' : 'font-normal'}`}>
        {role}
      </p>
    </button>
  );
}
