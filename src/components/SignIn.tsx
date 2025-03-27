import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthService from '../services/AuthService';
import { AuthResponse } from '../interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response: AuthResponse = await AuthService.signIn({ email, password });
      
      if (response.access && response.refresh) {
        setSuccess(response.message || 'Inicio de sesión exitoso, hasta aqui');
        navigate('/profile');
      } else {
        setError(response.message || 'Error en el inicio de sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Intente de nuevo más tarde.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex-1 flex flex-col">
      <div className="space-y-4 flex-1">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
              ¿Olvidaste?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-600 rounded-lg text-sm">
          {success}
        </div>
      )}
      
      <div className="mt-8">
        <Button 
          type="submit"  
          disabled={loading}
          className={loading ? 'opacity-70 cursor-not-allowed' : ''}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿No tienes una cuenta? </span>
          <a href="#" className="text-blue-500 hover:text-blue-400 font-medium">
            Registrarse
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;