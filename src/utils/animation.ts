/**
 * Animaciones comunes para usar con Framer Motion
 */

// Contenedor con animación escalonada de hijos
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Elemento que aparece desde abajo
  export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Elemento que aparece desde la izquierda
  export const leftSlideVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  // Elemento que aparece desde la derecha
  export const rightSlideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };
  
  // Aparición con escala (para íconos, botones, etc.)
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
  
  // Hover para tarjetas y botones
  export const hoverVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
  };
  
  // Tap para botones
  export const tapVariants = {
    tap: { scale: 0.95 }
  };
  
  // Animación de pulso para destacar elementos
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
  
  // Animación para señalar error
  export const errorVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween" // Cambiado de "spring" a "tween"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        type: "tween" // Cambiado de "spring" a "tween"
      }
    }
  };
  
  // Animación para íconos de carga (spinner)
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