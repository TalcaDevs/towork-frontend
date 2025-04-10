import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../../utils/animation';

interface StepsIndicatorProps {
  currentStep: number;
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({ currentStep }) => {
  // Define nombres de los pasos
  const stepNames = [
    'Crear cuenta',
    'Información',
    'Plantilla',
    'Finalizar'
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <motion.div 
            key={step} 
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? "bg-blue-500 text-white"
                  : step < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step
              )}
            </div>
            <div className="text-xs mt-2 text-gray-600 font-medium">
              {stepNames[step-1]}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="relative flex mt-2">
        <div className="w-full bg-gray-200 h-1 absolute top-0"></div>
        <motion.div 
          className="bg-blue-500 h-1 absolute top-0 transition-all duration-300"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep - 1) * 33.33}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default StepsIndicator;