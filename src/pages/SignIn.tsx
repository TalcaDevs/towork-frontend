import React from "react";
import WelcomeSection from "../components/sections/WelcomeSection";
import SignInForm from "../components/SignIn";
import FeatureShowcase from "../components/sections/ShowcaseSection";

const SignIn: React.FC = () => {
  return (
    <div className="w-[calc(100%-100px)] mx-auto px-12 py-8">
      <div className="flex w-full h-[80dvh] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left section - Sign in form */}
        <div className="w-full md:w-2/5 p-8 flex flex-col">
          <WelcomeSection />
          <SignInForm />
        </div>

        {/* Right section - Feature showcase */}
        <div className="hidden md:block md:w-3/5 bg-blue-500">
          <FeatureShowcase />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
