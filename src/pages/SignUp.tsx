import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import FeatureShowcase from "../components/sections/ShowcaseSection";
import Logo from "../assets/icons/Logo";
import ArrowRightIcon from "../assets/icons/ArrowRightIcon";
import AuthService from "../services/AuthService";

// Step components
import Step1CreateAccount from "../components/signup/Step1CreateAccount";
import Step2FillInfo from "../components/signup/Step2FillInfo";
import Step3ChooseTemplate from "../components/signup/Step3ChooseTemplate";
import Step4Confirmation from "../components/signup/Step4Confirmation";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Registration data
  const [userData, setUserData] = useState({
    // Basic account data
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    
    // Profile data
    foto_perfil: "",
    descripcion: "",
    telefono: "",
    ubicacion: "",
    linkedin: "",
    id_portafolio_web: "",
    educacion: [],
    experiencia: [],
    certificaciones: [],
    proyectos: [],
    skills: [],
    idiomas: []
  });

  // Messages and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle data updates from steps
  const updateUserData = (data: any) => {
    setUserData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Progress to next step
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Skip step (for optional info)
  const skipStep = () => {
    if (currentStep === 2) {
      nextStep();
    }
  };

  // Render the current step
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

  // Steps progress indicator component
  const StepsIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? "bg-blue-500 text-white"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <div className="text-xs mt-2 text-gray-600 font-medium">
                {step === 1 && "Crear cuenta"}
                {step === 2 && "Información"}
                {step === 3 && "Plantilla"}
                {step === 4 && "Finalizar"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex mt-2">
          <div className="w-full bg-gray-200 h-1 absolute top-0"></div>
          <div 
            className="bg-blue-500 h-1 absolute top-0 transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    );
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-10 h-10 mb-6"
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Logo />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold text-slate-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Registro Paso {currentStep}
              </motion.h1>
            </motion.div>

            {/* Steps progress indicator */}
            <StepsIndicator />

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