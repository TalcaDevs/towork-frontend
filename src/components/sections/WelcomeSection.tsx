import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/icons/Logo';
import { fadeIn, fadeInUp, springLogo } from '../../utils/animation';

const WelcomeSection: React.FC = () => {
  return (
    <motion.div className="mb-8" {...fadeIn}>
      <motion.div className="w-12 h-12 mb-6" {...springLogo}>
        <Logo />
      </motion.div>
      <motion.h1 className="text-3xl font-bold text-slate-900 mb-2" {...fadeInUp(0.2)}>
        Iniciar Sesión
      </motion.h1>
      <motion.p className="text-gray-500 text-sm" {...fadeInUp(0.3)} />
    </motion.div>
  );
};

export default WelcomeSection;
