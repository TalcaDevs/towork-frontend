import React from 'react';
import { motion } from 'framer-motion';
import { TemplateOption } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';

interface TemplateCardProps {
  template: TemplateOption;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  index: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  index
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
          : 'border-gray-200'
      }`}
      onClick={() => onSelect(template.id)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={template.imageUrl} 
          alt={template.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://cdn.pixabay.com/photo/2016/11/30/20/44/programming-1873854_1280.png";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800">{template.name}</h4>
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{template.description}</p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;