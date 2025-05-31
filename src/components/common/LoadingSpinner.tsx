import React from 'react';
import { motion } from 'framer-motion';
import { spinnerVariants } from '../../utils/animation';
import { LoadingSpinnerProps } from '../../interfaces/common.interface';



const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 5,
  color = 'text-white',
  text
}) => {
  return (
    <div className="flex items-center justify-center">
      <motion.svg 
        className={`-ml-1 mr-3 h-${size} w-${size} ${color}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        variants={spinnerVariants}
        animate="animate"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </motion.svg>
      {text && <span>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;