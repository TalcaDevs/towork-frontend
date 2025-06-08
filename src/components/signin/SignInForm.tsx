import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

import EmailIcon from '../../assets/icons/EmailIcon';
import LockIcon from '../../assets/icons/LockIcon';

import Button from '../buttons/Button';
import AlertMessage from '../common/AlertMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import InputField from './InputField';
import { useSignInForm } from '../../hooks/useSignInForm';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const {
    formState,
    loading,
    error,
    success,
    isBlocked,
    timeRemaining,
    formatTime,
    handleChange,
    handleSubmit,
  } = useSignInForm(() => setTimeout(() => navigate(from, { replace: true }), 1000));

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-6 flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-5 flex-1">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            label="Email"
            value={formState.email}
            onChange={handleChange}
            isBlocked={isBlocked}
            icon={<EmailIcon />}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            label="Contraseña"
            value={formState.password}
            onChange={handleChange}
            isBlocked={isBlocked}
            icon={<LockIcon />}
          />
        </motion.div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <AlertMessage
            type={isBlocked ? 'error' : error.includes('pendiente') ? 'warning' : 'error'}
            message={
              isBlocked
                ? `Demasiados intentos fallidos. Inténtalo más tarde. Tiempo restante: ${formatTime(timeRemaining)}`
                : error
            }
            className="mt-4"
          />
        </motion.div>
      )}

      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <AlertMessage type="success" message={success} className="mt-4" />
        </motion.div>
      )}

      <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <Button type="submit" disabled={loading || isBlocked} className={`w-full ${loading || isBlocked ? 'opacity-70 cursor-not-allowed' : ''}`}> 
          {loading ? (
            <LoadingSpinner text="Iniciando sesión..." />
          ) : isBlocked ? (
            `Bloqueado - ${formatTime(timeRemaining)}`
          ) : (
            'Iniciar sesión'
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿No tienes una cuenta? </span>
          <motion.a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Registrarse
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default SignInForm;
