import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, TokenService } from '../services';
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthGuard: Checking authentication...');
      
      try {
        // Verificar si tiene tokens válidos
        const hasValidTokens = TokenService.isAuthenticated();
        console.log('Initial auth check:', hasValidTokens);
        
        if (hasValidTokens) {
          // Intentar refrescar tokens para asegurar que siguen siendo válidos
          const refreshSuccess = await TokenService.refreshTokens();
          console.log('Token refresh result:', refreshSuccess);
          
          if (!refreshSuccess) {
            console.log('Token refresh failed, user needs to login again');
            TokenService.clearTokens();
          }
        } else {
          console.log('No valid tokens found, user is not authenticated');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        TokenService.clearTokens();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Componente de loading más elegante
  if (isChecking) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-sm"
        >
          Verificando autenticación...
        </motion.p>
      </div>
    );
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  console.log('User is authenticated, rendering protected content');
  return <>{children}</>;
};

export default AuthGuard;