import React, { InputHTMLAttributes, useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  error, 
  label, 
  icon, 
  className = '', 
  required,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Instead of using motion.input directly, we'll wrap a regular input with motion.div
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-blue-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: isFocused ? 1.01 : 1
          }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <input
            className={`w-full px-4 py-2 border rounded-lg transition-colors duration-200
              ${icon ? 'pl-10' : 'pl-4'} 
              ${error ? 'border-red-500 focus:ring-red-200' : 
                      isFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300 focus:ring-blue-100'} 
              focus:outline-none focus:ring-2
              ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </motion.div>
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20" 
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 15, 0] }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </motion.svg>
          </div>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="mt-1 text-sm text-red-500 flex items-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;