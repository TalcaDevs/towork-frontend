import React from 'react';
import Input from '../Input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  isBlocked?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  isBlocked = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`flex items-center border rounded-md overflow-hidden focus-within:ring-2 ${isBlocked ? 'border-gray-200 bg-gray-50 focus-within:ring-gray-300' : 'border-gray-300 focus-within:ring-blue-500'}`}
      >
        <div className={`flex items-center border-r px-3 ${isBlocked ? 'border-gray-300' : 'border-blue-500'}`}>{icon}</div>
        <Input
          {...props}
          disabled={isBlocked}
          className={`flex-1 border-0 focus:ring-0 px-3 py-2 ${isBlocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
};

export default InputField;
