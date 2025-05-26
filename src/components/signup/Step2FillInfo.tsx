import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step2Props, LanguageItem } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants } from '../../utils/animation';
import BasicInfoForm from './forms/BasicInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import CertificationsForm from './forms/CertificationsForm';
import ProjectsForm from './forms/ProjectsForm';
import LanguagesForm from './forms/LanguagesForm';
import { validateProfileForm, ProfileFormErrors } from '../../utils/validation';
import RequiredFieldsInfo from '../signup/forms/RequiredFieldInfo';
import { errorMessages } from '../../data/errorMessages';

const Step2FillInfo: React.FC<Step2Props> = ({ 
  userData, 
  updateUserData, 
  nextStep, 
  prevStep,
  skipStep,
  loading, 
  error, 
  setLoading, 
  setError, 
  setSuccess 
}) => {
  const [formErrors, setFormErrors] = useState<ProfileFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
    
    if (formErrors[name as keyof ProfileFormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const updateEducation = (education: any[]) => {
    updateUserData({ education });
    
    if (education.length > 0 && formErrors.education) {
      setFormErrors(prev => ({
        ...prev,
        education: undefined
      }));
    }
  };  
  
  const updateExperience = (experience: any[]) => {
    updateUserData({ experience });
    
    if (experience.length > 0 && formErrors.experience) {
      setFormErrors(prev => ({
        ...prev,
        experience: undefined
      }));
    }
  };
  
  const updateSkills = (skills: string[]) => {
    updateUserData({ skills });
  };
  
  const updateCertifications = (certifications: any[]) => {
    updateUserData({ certifications });
  };
  
  const updateProjects = (projects: any[]) => {
    updateUserData({ projects });
  };

  const updateLanguages = (languages: LanguageItem[]) => {
    updateUserData({ languages });
  };

  const hasFormChanges = () => {
    return Boolean(
      userData.description || 
      userData.phone || 
      userData.location || 
      userData.linkedin || 
      userData.portfolio_url ||
      (userData.skills && userData.skills.length > 0) ||
      (userData.education && userData.education.length > 0) ||
      (userData.experience && userData.experience.length > 0) ||
      (userData.certifications && userData.certifications.length > 0) ||
      (userData.projects && userData.projects.length > 0) ||
      (userData.languages && userData.languages.length > 0)
    );
  };
  
  const handleSkip = () => {
    if (hasFormChanges()) {
      const confirmSkip = window.confirm(
        "Has comenzado a llenar información. Si saltas este paso, los datos no se guardarán. ¿Estás seguro de que deseas continuar?"
      );
      
      if (confirmSkip) {
        skipStep();
      }
    } else {
      skipStep();
    }
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  setError(null);
  setFormErrors({});
  
  // Validar SIEMPRE los campos requeridos, independientemente de si hay cambios
  const validation = validateProfileForm(userData);
  
  if (!validation.isValid) {
    setFormErrors(validation.errors);
    setError(errorMessages.completeAllFields);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  // Solo guardar localmente y continuar al siguiente paso
  setSuccess('Información guardada localmente. Continúa al siguiente paso.');
  nextStep();
};
  
  return (
    <motion.div
      className="flex-1 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <RequiredFieldsInfo />
      </div>
      
      {error && (
        <motion.div 
          className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 overflow-y-auto max-h-[65vh] pr-2 pb-6">
          <BasicInfoForm 
            userData={{
              description: userData.description || '',
              phone: userData.phone || '',
              location: userData.location || '',
              linkedin: userData.linkedin || '',
              portfolio_url: userData.portfolio_url || ''
            }} 
            handleChange={handleChange}
            errors={{
              description: formErrors.description,
              phone: formErrors.phone,
              location: formErrors.location,
              linkedin: formErrors.linkedin,
              portfolio_url: formErrors.portfolio_url
            }}
          />
          
          <EducationForm 
            educationItems={userData.education}
            updateEducation={updateEducation}
            error={formErrors.education}
          />
          
          <ExperienceForm 
            experienceItems={userData.experience}
            updateExperience={updateExperience}
            error={formErrors.experience}
          />
          
          <CertificationsForm
            certifications={userData.certifications || []}
            updateCertifications={updateCertifications}
          />
          
          <ProjectsForm
            projects={userData.projects || []}
            updateProjects={updateProjects}
          />
          
          <SkillsForm 
            skills={userData.skills} 
            updateSkills={updateSkills}
            error={formErrors.skills}
          />

          <LanguagesForm
            languages={userData.languages || []}
            updateLanguages={updateLanguages}
          />
        </div>
        
        <motion.div 
          className="mt-6 flex justify-between"
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
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleSkip}
            >
              Saltar por ahora
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Step2FillInfo;