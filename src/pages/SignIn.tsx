import React from "react";
import { motion } from "framer-motion";
import WelcomeSection from "../components/sections/WelcomeSection";
import SignInForm from "../components/SignIn";
import FeatureShowcase from "../components/sections/ShowcaseSection";

const SignIn: React.FC = () => {
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
          {/* Left section - Sign in form */}
          <div className="w-full md:w-2/5 p-6 md:p-8 lg:p-10 flex flex-col">
            <WelcomeSection />
            <SignInForm />
          </div>

          {/* Right section - Feature showcase */}
          <div className="hidden md:block md:w-3/5">
            <FeatureShowcase />
          </div>
        </motion.div>
        
        {/* Trust badges */}
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
      </div>
    </motion.div>
  );
};

export default SignIn;