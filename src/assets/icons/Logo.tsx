import React from 'react';
import { IconProps } from '../../interfaces/icons.interface';

const Logo: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <div className={`bg-blue-500 rounded-lg flex items-center justify-center ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="white" 
        className="w-6 h-6"
      >
        <path 
          d="M16.023 9.348c4.002 0 7.746 1.028 10.465 2.815a.75.75 0 0 1 0 1.258c-2.719 1.787-6.463 2.815-10.465 2.815-4.002 0-7.746-1.028-10.465-2.815a.75.75 0 0 1 0-1.258c2.719-1.787 6.463-2.815 10.465-2.815Z" 
        />
      </svg>
    </div>
  );
};

export default Logo;