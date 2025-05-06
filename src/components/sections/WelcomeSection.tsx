import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/icons/Logo';

// Variantes reutilizables
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 }
});

const springLogo = {
  initial: { scale: 0.5, rotate: -10 },
  animate: { scale: 1, rotate: 0 },
  transition: {
    duration: 0.5,
    type: 'spring',
    stiffness: 260,
    damping: 20
  },
  whileHover: { rotate: 5, scale: 1.1 }
};

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
