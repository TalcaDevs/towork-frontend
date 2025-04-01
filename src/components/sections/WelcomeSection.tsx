import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/icons/Logo';

const WelcomeSection: React.FC = () => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-12 h-12 mb-6"
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Logo />
      </motion.div>
      <motion.h1 
        className="text-3xl font-bold text-slate-900 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Iniciar Sesión
      </motion.h1>
      <motion.p 
        className="text-gray-500 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Bienvenido de nuevo - inicia sesión en tu cuenta
      </motion.p>
    </motion.div>
  );
};

export default WelcomeSection;