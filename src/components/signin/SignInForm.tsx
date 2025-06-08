import React from 'react';
import { motion } from 'framer-motion';
import Input from '../Input';
import Button from '../buttons/Button';
import EmailIcon from '../../assets/icons/EmailIcon';
import LockIcon from '../../assets/icons/LockIcon';
import CorrectIcon from '../../assets/icons/CorrectIcon';
import StatusMessage from './StatusMessage';
import { useSignInForm } from './useSignInForm';

const SignInForm: React.FC = () => {
  const {
    formState,
    loading,
    error,
    success,
    isBlocked,
    timeRemaining,
    handleChange,
    handleSubmit,
    formatTime,
  } = useSignInForm();

  const errorVariant = isBlocked
    ? 'blocked'
    : error && error.includes('pendiente')
      ? 'warning'
      : 'error';

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-6 flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-5 flex-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="tu@ejemplo.com"
            value={formState.email}
            onChange={handleChange}
            required
            disabled={isBlocked}
            className={`pl-12 ${
              isBlocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
            }`}
            icon={
              <div
                className={`flex items-center border-r pr-2 mr-2 ${
                  isBlocked ? 'border-gray-300' : 'border-blue-500'
                }`}
              >
                <EmailIcon />
              </div>
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Input
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            value={formState.password}
            onChange={handleChange}
            required
            disabled={isBlocked}
            className={`pl-12 ${
              isBlocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
            }`}
            icon={
              <div
                className={`flex items-center border-r pr-2 mr-2 ${
                  isBlocked ? 'border-gray-300' : 'border-blue-500'
                }`}
              >
                <LockIcon />
              </div>
            }
          />
        </motion.div>
      </div>

      {error && (
        <StatusMessage variant={errorVariant}>
          {isBlocked ? (
            <div>
              <div>Demasiados intentos fallidos. Inténtalo más tarde.</div>
              <div className="text-xs mt-1 font-medium">
                Tiempo restante: {formatTime(timeRemaining)}
              </div>
            </div>
          ) : (
            error
          )}
        </StatusMessage>
      )}

      {success && <StatusMessage variant="success">{success}</StatusMessage>}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Button
          type="submit"
          disabled={loading || isBlocked}
          className={`w-full ${
            loading || isBlocked ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <CorrectIcon />
              Iniciando sesión...
            </div>
          ) : isBlocked ? (
            `Bloqueado - ${formatTime(timeRemaining)}`
          ) : (
            'Iniciar sesión'
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿No tienes una cuenta? </span>
          <motion.a
            href="/signup"
            className="text-blue-500 hover:text-blue-600 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Registrarse
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default SignInForm;
