import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../Input';
import Button from '../Button';
import AuthService from '../../services/AuthService';

interface Step1Props {
  userData: any;
  updateUserData: (data: any) => void;
  nextStep: () => void;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

const Step1CreateAccount: React.FC<Step1Props> = ({ 
  userData, 
  updateUserData, 
  nextStep, 
  loading, 
  error, 
  setLoading, 
  setError, 
  setSuccess 
}) => {
  // Local form validation
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update the userData in parent component
    updateUserData({ [name]: value });
    
    // Clear error for this field when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Handle password confirmation changes
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    
    // Clear error when user types
    if (formErrors.password_confirm) {
      setFormErrors({
        ...formErrors,
        password_confirm: ''
      });
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Validate first name
    if (!userData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido';
      valid = false;
    }
    
    // Validate last name
    if (!userData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido';
      valid = false;
    }
    
    // Validate email
    if (!userData.email.trim()) {
      newErrors.email = 'El email es requerido';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'El email no es válido';
      valid = false;
    }
    
    // Validate password
    if (!userData.password) {
      newErrors.password = 'La contraseña es requerida';
      valid = false;
    } else if (userData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      valid = false;
    }
    
    // Validate password confirmation
    if (userData.password !== passwordConfirm) {
      newErrors.password_confirm = 'Las contraseñas no coinciden';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the API to create an account
      const response = await fetch('http://184.73.49.129:8000/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store tokens in localStorage
        if (data.access && data.refresh) {
          AuthService.setTokens({
            access: data.access,
            refresh: data.refresh
          });
        }
        
        // Show success message
        setSuccess(data.message || 'Cuenta creada exitosamente');
        
        // Proceed to next step
        nextStep();
      } else {
        // Handle server validation errors
        const errorMessage = data.message || data.detail || 'Error al crear la cuenta';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Error al conectar con el servidor. Intente nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <motion.div variants={itemVariants}>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Nombre"
              label="Nombre"
              value={userData.first_name}
              onChange={handleChange}
              required
              error={formErrors.first_name}
              className="w-full"
            />
          </motion.div>
          
          {/* Last Name */}
          <motion.div variants={itemVariants}>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Apellido"
              label="Apellido"
              value={userData.last_name}
              onChange={handleChange}
              required
              error={formErrors.last_name}
              className="w-full"
            />
          </motion.div>
        </div>
        
        {/* Email */}
        <motion.div variants={itemVariants}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            label="Email"
            value={userData.email}
            onChange={handleChange}
            required
            error={formErrors.email}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />
        </motion.div>
        
        {/* Password */}
        <motion.div variants={itemVariants}>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            label="Contraseña"
            value={userData.password}
            onChange={handleChange}
            required
            error={formErrors.password}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </motion.div>
        
        {/* Password Confirmation */}
        <motion.div variants={itemVariants}>
          <Input
            id="password_confirm"
            name="password_confirm"
            type="password"
            placeholder="Confirmar contraseña"
            label="Confirmar contraseña"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            required
            error={formErrors.password_confirm}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </motion.div>
      </div>
      
      {/* Error message */}
      {error && (
        <motion.div 
          className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </motion.div>
      )}
      
      {/* Submit button */}
      <motion.div 
        className="mt-8"
        variants={itemVariants}
      >
        <Button 
          type="submit"  
          disabled={loading}
          className={`w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando cuenta...
            </div>
          ) : 'Crear cuenta'}
        </Button>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿Ya tienes una cuenta? </span>
          <motion.a 
            href="/signin" 
            className="text-blue-500 hover:text-blue-600 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar sesión
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default Step1CreateAccount;