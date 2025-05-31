export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const leftSlideVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const rightSlideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  export const hoverVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
  };
  
  export const tapVariants = {
    tap: { scale: 0.95 }
  };
  
  export const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  export const errorVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        type: "tween" 
      }
    }
  };

  export const spinnerVariants = {
    animate: { 
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  export const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  export const contentVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };


export  const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 }
});

export const springLogo = {
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