import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import { AuthService } from "../services";
import { ExtendedAuthResponse } from "../services/interface/api.interface";
import { successMessages } from "../data/successMessages";
import { errorMessages } from "../data/errorMessages";
import EmailIcon from "../assets/icons/EmailIcon";
import LockIcon from "../assets/icons/LockIcon";
import CorrectIcon from "../assets/icons/CorrectIcon";
import ErrorIcon from "../assets/icons/ErrorIcon";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const from = location.state?.from?.pathname || "/profile";
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION = 60; // 60 segundos

  // Verificar si el usuario está bloqueado al cargar el componente
  useEffect(() => {
    checkBlockStatus();
  }, []);

  // Countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isBlocked && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Desbloquear cuando llegue a 0
            setIsBlocked(false);
            setFailedAttempts(0);
            setError(null);
            clearBlockData();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlocked, timeRemaining]);

  const checkBlockStatus = () => {
    const blockData = localStorage.getItem('signin_block');
    const attempts = localStorage.getItem('signin_attempts');
    
    if (blockData) {
      const { blockTime } = JSON.parse(blockData);
      const currentTime = Date.now();
      const timePassed = (currentTime - blockTime) / 1000; // en segundos
      
      if (timePassed < BLOCK_DURATION) {
        setIsBlocked(true);
        setTimeRemaining(Math.ceil(BLOCK_DURATION - timePassed));
        setError("Demasiados intentos fallidos. Inténtalo más tarde.");
      } else {
        // El bloqueo ha expirado
        clearBlockData();
      }
    }
    
    if (attempts) {
      setFailedAttempts(parseInt(attempts));
    }
  };

  const clearBlockData = () => {
    localStorage.removeItem('signin_block');
    localStorage.removeItem('signin_attempts');
  };

  const handleFailedAttempt = () => {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    localStorage.setItem('signin_attempts', newAttempts.toString());
    
    if (newAttempts >= MAX_ATTEMPTS) {
      // Bloquear usuario
      const blockData = {
        blockTime: Date.now()
      };
      localStorage.setItem('signin_block', JSON.stringify(blockData));
      setIsBlocked(true);
      setTimeRemaining(BLOCK_DURATION);
      setError("Demasiados intentos fallidos. Inténtalo más tarde.");
    } else {
      const remainingAttempts = MAX_ATTEMPTS - newAttempts;
      setError(`Credenciales incorrectas. Te quedan ${remainingAttempts} intento${remainingAttempts !== 1 ? 's' : ''}.`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBlocked) return; // No permitir cambios si está bloqueado
    
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError("Demasiados intentos fallidos. Inténtalo más tarde.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: ExtendedAuthResponse = await AuthService.signIn(formState);
      
      if (response.access && response.refresh) {
        // Login exitoso - limpiar intentos fallidos
        setFailedAttempts(0);
        clearBlockData();
        setSuccess(response.message || successMessages.loginSuccess);
        setIsAllowed(true);
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        if (response.status === 'pending') {
          setError(response.message || successMessages.profileReviews);
        } else {
          // Login fallido
          handleFailedAttempt();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      // También contar como intento fallido
      handleFailedAttempt();
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className={`flex items-center border rounded-md overflow-hidden focus-within:ring-2 ${
            isBlocked 
              ? 'border-gray-200 bg-gray-50 focus-within:ring-gray-300' 
              : 'border-gray-300 focus-within:ring-blue-500'
          }`}>
            <div className={`flex items-center border-r px-3 ${
              isBlocked ? 'border-gray-300' : 'border-blue-500'
            }`}>
              <EmailIcon />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={formState.email}
              onChange={handleChange}
              required
              disabled={isBlocked}
              className={`flex-1 border-0 focus:ring-0 px-3 py-2 ${
                isBlocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <motion.a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            </motion.a>
          </div>

          <div className={`flex items-center border rounded-md overflow-hidden focus-within:ring-2 ${
            isBlocked 
              ? 'border-gray-200 bg-gray-50 focus-within:ring-gray-300' 
              : 'border-gray-300 focus-within:ring-blue-500'
          }`}>
            <div className={`flex items-center border-r px-3 ${
              isBlocked ? 'border-gray-300' : 'border-blue-500'
            }`}>
              <LockIcon />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formState.password}
              onChange={handleChange}
              required
              disabled={isBlocked}
              className={`flex-1 border-0 focus:ring-0 px-3 py-2 ${
                isBlocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.div
          className={`mt-4 p-3 border rounded-lg text-sm ${
            isBlocked
              ? 'bg-red-50 border-red-200 text-red-700'
              : error.includes('pendiente') 
                ? 'bg-yellow-50 border-yellow-100 text-yellow-700' 
                : 'bg-red-50 border-red-100 text-red-600'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <ErrorIcon />
            <div className="ml-2">
              {isBlocked ? (
                <div>
                  <div>Demasiados intentos fallidos. Inténtalo más tarde.</div>
                  <div className="text-xs mt-1 font-medium">
                    Tiempo restante: {formatTime(timeRemaining)}
                  </div>
                </div>
              ) : error.includes('pendiente') ? (
                error
              ) : (
                error
              )}
            </div>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          className="mt-4 p-3 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <CorrectIcon />
            {success}
          </div>
        </motion.div>
      )}

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
            loading || isBlocked ? "opacity-70 cursor-not-allowed" : ""
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
            "Iniciar sesión"
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