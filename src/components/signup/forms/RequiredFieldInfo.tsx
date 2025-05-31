import React from 'react';
import { motion } from 'framer-motion';

const RequiredFieldsInfo: React.FC = () => {
  return (
    <motion.div 
      className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">
            Información importante:
          </p>
          <p className="text-sm mt-1">
            Los campos marcados con <span className="text-red-500 font-medium">*</span> son obligatorios para crear tu perfil.
            Solo se requiere la descripción profesional y la ubicación.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RequiredFieldsInfo;