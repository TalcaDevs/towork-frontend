import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { Step4Props } from '../../interfaces/signup.interface';
import { containerVariants, itemVariants, scaleVariants, errorVariants } from "../../utils/animation";
import ProfileSummary from './steps/ProfileSummary';
import { ProfileService } from '../../services';

const Step4Confirmation: React.FC<Step4Props> = ({ 
  userData, 
  navigate,
  error, 
  success 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    // Enviar datos del perfil al backend usando ProfileService
    const submitProfile = async () => {
      setIsSubmitting(true);
      setSubmissionError(null);

      // Debug: Ver qué datos se van a enviar
      console.log('=== ENVIANDO DATOS AL BACKEND ===');
      console.log('userData completo:', userData);
      console.log('userData.description:', userData.description);
      console.log('userData.phone:', userData.phone);
      console.log('userData.education:', userData.education);
      console.log('userData.template:', userData.template);
      console.log('================================');

      try {
        // Usar ProfileService.saveProfile
        const response = await ProfileService.saveProfile({
          first_name: userData.first_name,
          last_name: userData.last_name,
          profile_photo: userData.profile_photo,
          description: userData.description,
          phone: userData.phone,
          location: userData.location,
          linkedin: userData.linkedin,
          portfolio_url: userData.portfolio_url,
          education: userData.education,
          experience: userData.experience,
          skills: userData.skills,
          certifications: userData.certifications || [],
          projects: userData.projects || [],
          languages: userData.languages || [],
          template: userData.template
        });

        console.log('✅ Respuesta del backend:', response);
        setSubmissionCompleted(true);

        
        
      } catch (error) {
        console.error('❌ Error al enviar perfil:', error);
        setSubmissionError('Error al conectar con el servidor');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitProfile();
  }, [userData]);

  const handleGoToLogin = () => {
    navigate('/signin');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center text-center py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isSubmitting ? (
        // Mientras se envía la solicitud
        <motion.div className="flex flex-col items-center" variants={itemVariants}>
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enviando tu información...</h2>
          <p className="text-gray-600">Guardando tu perfil en el servidor</p>
        </motion.div>
      ) : submissionError ? (
        // Si hay error al enviar
        <motion.div className="flex flex-col items-center" variants={itemVariants}>
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al enviar información</h2>
          <p className="text-red-600 mb-6">{submissionError}</p>
          <div className="space-y-3">
            <Button type="button" onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
            <Button type="button" variant="outline" onClick={handleGoToHome}>
              Volver al inicio
            </Button>
          </div>
        </motion.div>
      ) : (
        // Si se envió exitosamente
        <>
          <motion.div 
            className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6"
            variants={scaleVariants}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-2"
            variants={itemVariants}
          >
            ¡Solicitud enviada exitosamente!
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8 max-w-md"
            variants={itemVariants}
          >
            Tu perfil ha sido enviado para revisión. Te notificaremos por email cuando sea aprobado y puedas acceder a tu portafolio CV.
          </motion.p>

          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md"
            variants={itemVariants}
          >
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-blue-800 mb-1">Próximos pasos:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Nuestro equipo revisará tu perfil</li>
                  <li>• Te contactaremos por email</li>
                  <li>• El proceso toma 24-48 horas</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="space-y-3" variants={itemVariants}>
            <Button 
              type="button" 
              onClick={handleGoToLogin}
            >
              Iniciar Sesión
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleGoToHome}
            >
              Volver al Inicio
            </Button>
          </motion.div>
          
          <ProfileSummary userData={userData} />
        </>
      )}
    </motion.div>
  );
};

export default Step4Confirmation;