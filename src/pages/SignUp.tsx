import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeatureShowcase from "../components/sections/ShowcaseSection";
import Logo from "../assets/icons/Logo";
import { UserRegistrationData } from "../interfaces/signup.interface";
import { containerVariants, itemVariants } from "../utils/animation";

// Componentes de los pasos
import Step1CreateAccount from "../components/signup/Step1CreateAccount";
import Step2FillInfo from "../components/signup/Step2FillInfo";
import Step3ChooseTemplate from "../components/signup/Step3ChooseTemplate";
import Step4Confirmation from "../components/signup/Step4Confirmation";
import StepsIndicator from "../components/signup/steps/StepsIndicator";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Datos de registro
  const [userData, setUserData] = useState<UserRegistrationData>({
    // Datos básicos (paso 1)
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    
    // Datos de perfil (paso 2)
    foto_perfil: "",
    descripcion: "",
    telefono: "",
    ubicacion: "",
    linkedin: "",
    id_portafolio_web: "",
    
    // Colecciones de datos
    educacion: [],
    experiencia: [],
    certificaciones: [],
    proyectos: [],
    skills: [],
    idiomas: [],
    
    // Plantilla seleccionada (paso 3)
    templateId: ""
  });

  // Estados para mensajes y carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Actualizar datos del usuario
  const updateUserData = (data: Partial<UserRegistrationData>) => {
    setUserData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Volver al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Saltar paso (para información opcional)
  const skipStep = () => {
    if (currentStep === 2) {
      nextStep();
    }
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CreateAccount 
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            loading={loading}
            error={error}
            setLoading={setLoading}
            setError={setError}
            setSuccess={setSuccess}
          />
        );
      case 2:
        return (
          <Step2FillInfo
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            prevStep={prevStep}
            skipStep={skipStep}
            loading={loading}
            error={error}
            setLoading={setLoading}
            setError={setError}
            setSuccess={setSuccess}
          />
        );
      case 3:
        return (
          <Step3ChooseTemplate
            userData={userData}
            updateUserData={updateUserData}
            nextStep={nextStep}
            prevStep={prevStep}
            loading={loading}
            error={error}
            setLoading={setLoading}
            setError={setError}
            setSuccess={setSuccess}
          />
        );
      case 4:
        return (
          <Step4Confirmation
            userData={userData}
            navigate={navigate}
            error={error}
            success={success}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="w-full min-h-[calc(100vh-80px)] py-8 lg:py-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex w-full flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Left section - Registration form */}
          <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10 flex flex-col">
            {/* Header with logo */}
            <motion.div 
              className="mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="w-10 h-10 mb-6"
                variants={itemVariants}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Logo />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold text-slate-900 mb-2"
                variants={itemVariants}
              >
                Registro Paso {currentStep}
              </motion.h1>
            </motion.div>

            {/* Steps progress indicator */}
            <StepsIndicator currentStep={currentStep} />

            {/* Current step content */}
            {renderStep()}
          </div>

          {/* Right section - Feature showcase (hidden on mobile) */}
          <div className="hidden md:block md:w-2/5">
            <FeatureShowcase />
          </div>
        </motion.div>
        
        {/* Trust badges (only show on first step) */}
        {currentStep === 1 && (
          <motion.div 
            className="mt-8 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-sm text-gray-500 mb-4">Utilizado por miles de profesionales en empresas como:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <img src="https://brandlogos.net/wp-content/uploads/2021/04/microsoft-logo-512x512.png" alt="Microsoft" className="h-6 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" alt="Google" className="h-6 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png" alt="Slack" className="h-6 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" alt="Meta" className="h-6 object-contain grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple" className="h-6 object-contain grayscale" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SignUp;