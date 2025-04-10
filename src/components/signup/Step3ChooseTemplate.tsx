import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step3Props } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants, errorVariants } from '../../utils/animation';
import { templateOptions } from "../../data/template"
import TemplateCard from './steps/TemplateCard';

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
  // Selected template
  const [selectedTemplate, setSelectedTemplate] = useState(userData.templateId || '');
  
  // Handle template selection
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateUserData({ templateId });
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (selectedTemplate) {
      // Optional: Send selection to backend
      setSuccess('Plantilla seleccionada con éxito');
      nextStep();
    } else {
      setError('Por favor selecciona una plantilla para continuar');
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
      
      {/* Error message */}
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
          {...errorVariants}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </motion.div>
      )}
      
      {/* Action buttons */}
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
            disabled={!selectedTemplate || loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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