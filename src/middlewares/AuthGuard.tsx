import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthGuard: Checking authentication...');
      try {
        // First check if there are tokens in localStorage
        const isAuth = AuthService.isAuthenticated();
        console.log('Initial auth check:', isAuth);
        
        if (isAuth) {
          const refreshSuccess = await AuthService.refreshToken();
          console.log('Token refresh result:', refreshSuccess);
          setIsAuthenticated(refreshSuccess);
        } else {
          console.log('No tokens found, user is not authenticated');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    // Display a loading spinner while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
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
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    // Redirect to login page if not authenticated, preserving the intended location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  console.log('User is authenticated, rendering protected content');
  return <>{children}</>;
};

export default AuthGuard;