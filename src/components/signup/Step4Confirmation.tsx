import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';

interface Step4Props {
  userData: any;
  navigate: (path: string) => void;
  error: string | null;
  success: string | null;
}

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

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
        variants={checkmarkVariants}
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
          variants={itemVariants}
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
      <motion.div
        className="mt-12 bg-gray-50 p-6 rounded-lg shadow-sm max-w-md w-full"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-gray-800 mb-4 text-left">Resumen de tu perfil:</h3>
        
        <div className="space-y-3 text-left">
          <div>
            <span className="text-gray-600 text-sm">Nombre:</span>
            <p className="font-medium text-gray-800">{userData.first_name} {userData.last_name}</p>
          </div>
          
          <div>
            <span className="text-gray-600 text-sm">Email:</span>
            <p className="font-medium text-gray-800">{userData.email}</p>
          </div>
          
          {userData.ubicacion && (
            <div>
              <span className="text-gray-600 text-sm">Ubicación:</span>
              <p className="font-medium text-gray-800">{userData.ubicacion}</p>
            </div>
          )}
          
          {userData.skills && userData.skills.length > 0 && (
            <div>
              <span className="text-gray-600 text-sm">Habilidades principales:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {userData.skills.slice(0, 3).map((skill: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {userData.skills.length > 3 && (
                  <span className="text-gray-500 text-xs">
                    +{userData.skills.length - 3} más
                  </span>
                )}
              </div>
            </div>
          )}
          
          {userData.templateId && (
            <div>
              <span className="text-gray-600 text-sm">Plantilla seleccionada:</span>
              <p className="font-medium text-gray-800 capitalize">{userData.templateId}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Step4Confirmation;