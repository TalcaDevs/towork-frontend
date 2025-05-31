import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step3Props } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants, errorVariants } from '../../utils/animation';
import { templateOptions } from "../../data/template"
import TemplateCard from './steps/TemplateCard';
import { errorMessages } from '../../data/errorMessages';
import { successMessages } from '../../data/successMessages';

const Step3ChooseTemplate: React.FC<Step3Props> = ({ 
  userData, 
  updateUserData, 
  nextStep, 
  prevStep,
  loading, 
  error, 
  setLoading, 
  setError, 
  setSuccess 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(userData.template || 0);
  
  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    updateUserData({ template: templateId });
  };
  
  const handleContinue = () => {
    if (selectedTemplate && selectedTemplate > 0) {
      setSuccess(successMessages.templateSelected);
      nextStep();
    } else {
      setError(errorMessages.selectTemplate);
    }
  };
  
  return (
    <motion.div
      className="flex-1 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <motion.h3 
          variants={itemVariants} 
          className="text-lg font-semibold text-gray-800 mb-2"
        >
          Elige una plantilla para tu portafolio CV
        </motion.h3>
        <motion.p variants={itemVariants} className="text-gray-600">
          Selecciona la plantilla que mejor represente tu perfil profesional. Podrás cambiarla más adelante.
        </motion.p>
      </div>
      
      {/* Templates grid */}
      <div className="overflow-y-auto max-h-[55vh] pr-2 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templateOptions.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={handleSelectTemplate}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
          {...errorVariants}
        >
          <div className="flex items-center">

            {error}
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="mt-auto pt-6 flex justify-between"
        variants={itemVariants}
      >
        <div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep}
          >
            Atrás
          </Button>
        </div>
        <div>
          <Button 
            type="button" 
            onClick={handleContinue}
            disabled={!selectedTemplate || selectedTemplate === 0 || loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                Procesando...
              </div>
            ) : 'Continuar'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Step3ChooseTemplate;