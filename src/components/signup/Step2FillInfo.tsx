import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step2Props, LanguageItem } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants, errorVariants } from '../../utils/animation';
import BasicInfoForm from './forms/BasicInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import CertificationsForm from './forms/CertificationsForm';
import ProjectsForm from './forms/ProjectsForm';
import AuthService from '../../services/AuthService';
import LanguagesForm from './forms/LanguagesForm';

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
  // Manejar cambios en los inputs básicos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };
  
  // Actualizar educación
  const updateEducation = (education: any[]) => {
    updateUserData({ educacion: education });
  };
  
  // Actualizar experiencia
  const updateExperience = (experience: any[]) => {
    updateUserData({ experiencia: experience });
  };
  
  // Actualizar habilidades
  const updateSkills = (skills: string[]) => {
    updateUserData({ skills });
  };
  
  // Actualizar certificaciones
  const updateCertifications = (certifications: any[]) => {
    updateUserData({ certificaciones: certifications });
  };
  
  // Actualizar proyectos
  const updateProjects = (projects: any[]) => {
    updateUserData({ proyectos: projects });
  };

  const updateLanguages = (languages: LanguageItem[]) => {
    console.log('Actualizando idiomas:', languages); // Para depuración
    updateUserData({ idiomas: languages });
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
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
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 overflow-y-auto max-h-[65vh] pr-2 pb-6">
          {/* Información básica */}
          <BasicInfoForm 
            userData={{
              descripcion: userData.descripcion || '',
              telefono: userData.telefono || '',
              ubicacion: userData.ubicacion || '',
              linkedin: userData.linkedin || '',
              id_portafolio_web: userData.id_portafolio_web || ''
            }} 
            handleChange={handleChange} 
          />
          
          {/* Educación */}
          <EducationForm 
            educationItems={userData.educacion} 
            updateEducation={updateEducation} 
          />
          
          {/* Experiencia */}
          <ExperienceForm 
            experienceItems={userData.experiencia} 
            updateExperience={updateExperience} 
          />
          
          {/* Certificaciones */}
          <CertificationsForm
            certifications={userData.certificaciones || []}
            updateCertifications={updateCertifications}
          />
          
          {/* Proyectos */}
          <ProjectsForm
            projects={userData.proyectos || []}
            updateProjects={updateProjects}
          />
          
          {/* Habilidades */}
          <SkillsForm 
            skills={userData.skills} 
            updateSkills={updateSkills} 
          />

          <LanguagesForm
            languages={userData.idiomas || []}
            updateLanguages={updateLanguages}
          />

        </div>
        
        {/* Mensaje de error */}
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
        
        {/* Botones de acción */}
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
              onClick={skipStep}
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