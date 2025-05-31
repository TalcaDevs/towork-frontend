import { motion } from "framer-motion";

interface PopularJobCategoryProps {
  label: string;
  index: number;
}

export const PopularJobCategory: React.FC<PopularJobCategoryProps> = ({ label, index }) => {
  return (
    <motion.div 
      className="bg-blue-100 rounded-full border-2 border-blue-200 text-black px-4 py-2 text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.8 + (index * 0.1),
        ease: "easeOut" 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.div>
  );
};