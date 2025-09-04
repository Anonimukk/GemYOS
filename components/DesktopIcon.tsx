import React from 'react';
import { useDesktopContext } from '../contexts/DesktopContext';

interface DesktopIconProps {
  title: string;
  icon: React.ReactElement;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  const { theme } = useDesktopContext();
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const textShadow = theme === 'dark' 
    ? 'shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]' 
    : 'shadow-white [text-shadow:_0_1px_2px_var(--tw-shadow-color)]';
  
  return (
    <div
      className="flex flex-col items-center justify-center w-24 h-24 text-center cursor-pointer group"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-12 h-12 flex items-center justify-center transition-all duration-200 group-hover:bg-white/20 p-2 rounded-lg">
        {/* Fix: Cast icon to allow passing className prop */}
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-full h-full" })}
      </div>
      <span className={`mt-1 text-xs break-words ${textColor} ${textShadow}`}>{title}</span>
    </div>
  );
};

export default DesktopIcon;
