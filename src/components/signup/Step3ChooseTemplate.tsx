import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';

interface Step3Props {
  userData: any;
  updateUserData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

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
  // Template options
  const templates: TemplateOption[] = [
    {
      id: 'modern',
      name: 'Moderno',
      description: 'Un diseño limpio y contemporáneo ideal para perfiles de tecnología y diseño.',
      imageUrl: 'https://cdn.pixabay.com/photo/2023/04/15/19/19/cv-7928065_1280.png'
    },
    {
      id: 'professional',
      name: 'Profesional',
      description: 'Diseño clásico y estructurado perfecto para roles corporativos y tradicionales.',
      imageUrl: 'https://cdn.pixabay.com/photo/2020/03/17/17/46/cv-4941348_1280.jpg'
    },
    {
      id: 'creative',
      name: 'Creativo',
      description: 'Formato visual único que destaca para perfiles de marketing y artes.',
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/28/13/54/resume-3269723_1280.png'
    },
    {
      id: 'minimal',
      name: 'Minimalista',
      description: 'Diseño sencillo y elegante que funciona bien para cualquier tipo de perfil.',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/01/29/11/17/mobile-3962307_1280.jpg'
    },
    {
      id: 'academic',
      name: 'Académico',
      description: 'Formato ideal para perfiles académicos y de investigación.',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_1280.jpg'
    },
    {
      id: 'technical',
      name: 'Técnico',
      description: 'Diseñado para destacar habilidades técnicas y proyectos específicos.',
      imageUrl: 'https://cdn.pixabay.com/photo/2018/02/21/05/17/cv-3169969_1280.jpg'
    }
  ];
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
                  : 'border-gray-200'
              }`}
              onClick={() => handleSelectTemplate(template.id)}
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
                  {selectedTemplate === template.id && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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