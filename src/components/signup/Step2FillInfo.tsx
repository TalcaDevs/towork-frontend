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
import AuthService from '../../services/AuthService';
import LanguagesForm from './forms/LanguagesForm';
import { validateProfileForm, ProfileFormErrors } from '../../utils/validation';
import RequiredFieldsInfo from '../signup/forms/RequiredFieldInfo';

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
    updateUserData({ educacion: education });
    
    if (education.length > 0 && formErrors.educacion) {
      setFormErrors(prev => ({
        ...prev,
        educacion: undefined
      }));
    }
  };
  
  const updateExperience = (experience: any[]) => {
    updateUserData({ experiencia: experience });
    
    if (experience.length > 0 && formErrors.experiencia) {
      setFormErrors(prev => ({
        ...prev,
        experiencia: undefined
      }));
    }
  };
  
  const updateSkills = (skills: string[]) => {
    updateUserData({ skills });
  };
  
  const updateCertifications = (certifications: any[]) => {
    updateUserData({ certificaciones: certifications });
  };
  
  const updateProjects = (projects: any[]) => {
    updateUserData({ proyectos: projects });
  };

  const updateLanguages = (languages: LanguageItem[]) => {
    updateUserData({ idiomas: languages });
  };

  const hasFormChanges = () => {
    return Boolean(
      userData.descripcion || 
      userData.telefono || 
      userData.ubicacion || 
      userData.linkedin || 
      userData.id_portafolio_web ||
      (userData.skills && userData.skills.length > 0) ||
      (userData.educacion && userData.educacion.length > 0) ||
      (userData.experiencia && userData.experiencia.length > 0) ||
      (userData.certificaciones && userData.certificaciones.length > 0) ||
      (userData.proyectos && userData.proyectos.length > 0) ||
      (userData.idiomas && userData.idiomas.length > 0)
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
    
    const validation = validateProfileForm(userData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setError("Por favor completa todos los campos requeridos antes de continuar");
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await AuthService.saveProfile({
        first_name: userData.first_name,
        last_name: userData.last_name,
        descripcion: userData.descripcion,
        telefono: userData.telefono,
        ubicacion: userData.ubicacion,
        linkedin: userData.linkedin,
        id_portafolio_web: userData.id_portafolio_web,
        educacion: userData.educacion,
        experiencia: userData.experiencia,
        skills: userData.skills,
        certificaciones: userData.certificaciones || [],
        proyectos: userData.proyectos || [],
        idiomas: userData.idiomas || []
      });
      
      if (response && !response.error) {
        setSuccess(response.message || 'Perfil actualizado exitosamente');
        nextStep();
      } else {
        if (response.errors && typeof response.errors === 'object') {
          setFormErrors(response.errors);
        }
        setError(response.message || response.error || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Error al conectar con el servidor. Intente nuevamente más tarde.');
    } finally {
      setLoading(false);
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
        <motion.p variants={itemVariants} className="text-gray-600 mb-2">
          Esta información nos ayudará a personalizar tu experiencia y mostrar tu perfil a reclutadores interesados. Puedes saltarte este paso y completarlo más tarde desde tu perfil.
        </motion.p>
        
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
              descripcion: userData.descripcion || '',
              telefono: userData.telefono || '',
              ubicacion: userData.ubicacion || '',
              linkedin: userData.linkedin || '',
              id_portafolio_web: userData.id_portafolio_web || ''
            }} 
            handleChange={handleChange}
            errors={{
              descripcion: formErrors.descripcion,
              telefono: formErrors.telefono,
              ubicacion: formErrors.ubicacion,
              linkedin: formErrors.linkedin,
              id_portafolio_web: formErrors.id_portafolio_web
            }}
          />
          
          <EducationForm 
            educationItems={userData.educacion} 
            updateEducation={updateEducation}
            error={formErrors.educacion}
          />
          
          <ExperienceForm 
            experienceItems={userData.experiencia} 
            updateExperience={updateExperience}
            error={formErrors.experiencia}
          />
          
          <CertificationsForm
            certifications={userData.certificaciones || []}
            updateCertifications={updateCertifications}
          />
          
          <ProjectsForm
            projects={userData.proyectos || []}
            updateProjects={updateProjects}
          />
          
          <SkillsForm 
            skills={userData.skills} 
            updateSkills={updateSkills}
            error={formErrors.skills}
          />

          <LanguagesForm
            languages={userData.idiomas || []}
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
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </div>
              ) : 'Continuar'}
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Step2FillInfo;