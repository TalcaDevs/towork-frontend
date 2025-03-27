import React from 'react';
import Logo from '../../assets/icons/Logo'

const WelcomeSection: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="w-12 h-12 mb-6">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h1>
      <p className="text-gray-500 text-sm">
        Bienvenido de nuevo - inicia sesión en tu cuenta
      </p>
    </div>
  );
};

export default WelcomeSection;