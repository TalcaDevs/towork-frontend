import React, { useState } from "react";
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

  const from = location.state?.from?.pathname || "/profile";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: ExtendedAuthResponse = await AuthService.signIn(formState);

      if (response.access && response.refresh) {
        setSuccess(response.message || successMessages.loginSuccess);
        
        // Los tokens ya se guardan automáticamente en AuthService.signIn()
        // No necesitas llamar a setTokens() manualmente
        
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        // Manejar diferentes tipos de error
        if (response.status === 'pending') {
          setError(response.message || successMessages.profileReviews);
        } else {
          setError(response.message || errorMessages.verifyCredentials);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        errorMessages.serverError
      );
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex items-center border-r border-blue-500 px-3">
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
              className="flex-1 border-0 focus:ring-0 px-3 py-2"
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
              ¿Olvidaste?
            </motion.a>
          </div>

          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex items-center border-r border-blue-500 px-3">
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
              className="flex-1 border-0 focus:ring-0 px-3 py-2"
            />
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.div
          className={`mt-4 p-3 border rounded-lg text-sm ${
            error.includes('pendiente') 
              ? 'bg-yellow-50 border-yellow-100 text-yellow-700' 
              : 'bg-red-50 border-red-100 text-red-600'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={error.includes('pendiente') 
                  ? "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
            {error}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
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
          disabled={loading}
          className={`w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Iniciando sesión...
            </div>
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