import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step4Props } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants, scaleVariants, errorVariants } from "../../utils/animation";
import ProfileSummary from './steps/ProfileSummary';

const Step4Confirmation: React.FC<Step4Props> = ({ 
  userData, 
  navigate,
  error, 
  success 
}) => {
  // Redirect to profile after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center text-center py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Success icon */}
      <motion.div 
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        variants={scaleVariants}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-2"
        variants={itemVariants}
      >
        ¡Tu solicitud ha sido recibida!
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 mb-8 max-w-md"
        variants={itemVariants}
      >
        Te avisaremos cuando publiquemos tu portafolio CV. Mientras tanto, puedes completar o editar tu perfil.
      </motion.p>
      
      {/* Success message if any */}
      {success && (
        <motion.div 
          className="mb-6 p-3 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm w-full max-w-md"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </div>
        </motion.div>
      )}
      
      {/* Error message if any */}
      {error && (
        <motion.div 
          className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm w-full max-w-md"
          {...errorVariants}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </motion.div>
      )}
      
      {/* Redirect message */}
      <motion.div 
        className="text-gray-500 text-sm mb-8"
        variants={itemVariants}
      >
        Serás redirigido a tu perfil en 5 segundos...
      </motion.div>
      
      {/* Action button */}
      <motion.div variants={itemVariants}>
        <Button 
          type="button" 
          onClick={() => navigate('/profile')}
        >
          Ir a tu perfil
        </Button>
      </motion.div>
      
      {/* User info summary */}
      <ProfileSummary userData={userData} />
    </motion.div>
  );
};

export default Step4Confirmation;