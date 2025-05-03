import React from "react";
import { motion } from "framer-motion";
import { CardProps } from "../interfaces/cards.interface";
import ClockIcon from "../assets/icons/ClockIcon";
import Tag from "./Tag";
import LikesIcon from "../assets/icons/LikesIcon";

interface ExtendedCardProps extends CardProps {
  className?: string;
}

const Cards: React.FC<ExtendedCardProps> = ({
  id,
  title,
  tags,
  hoursAgo,
  description,
  imageUrl,
  author,
  likes,
  className = "",
}) => {
  const placeholderImageUrl = "https://placehold.co/600x400/e2e8f0/1e293b?text=ToWork";

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${className}`}
      whileHover="hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {imageUrl && (
        <motion.div className="h-48 w-full overflow-hidden">
          <motion.img
            src={imageUrl !== "#" ? imageUrl : placeholderImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            variants={imageVariants}
          />
        </motion.div>
      )}
      <motion.div 
        className="p-5"
        variants={contentVariants}
      >
        <motion.h3 
          className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        {description && (
          <motion.p 
            className="mt-2 text-gray-600 text-sm md:text-base line-clamp-3 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {tags.slice(0, 3).map((tag, index) => (
            <Tag 
              key={`${id}-tag-${index}`} 
              label={tag} 
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-gray-400" />
            <span>
              {hoursAgo} {hoursAgo === 1 ? "hora" : "horas"}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {author && (
              <div className="text-gray-600 font-medium">
                <span className="hidden sm:inline">Por </span>{author}
              </div>
            )}
            
            {likes !== undefined && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <span>{likes}</span>
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                >
                  <LikesIcon />
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cards;