import React from "react";
import { motion } from "framer-motion";
import { AnimatedTagProps } from "../interfaces/tag.interface";

const Tag: React.FC<AnimatedTagProps> = ({ label, delay = 0 }) => {
  return (
    <motion.span 
      className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: delay,
        duration: 0.3
      }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "#DBEAFE",
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
    >
      #{label}
    </motion.span>
  );
};

export default Tag;