import { useState, useCallback } from 'react';
import { AuthService, TokenService } from '../index';
import { SignInCredentials, AuthResponse } from '../../interfaces/auth.interface';
import { ExtendedAuthResponse } from '../interface/api.interface';
import { errorMessages } from '../../data/errorMessages';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(TokenService.isAuthenticated());
  const [isAllowed, setIsAllowed] = useState(TokenService.getIsAllowed());

  const signIn = useCallback(async (credentials: SignInCredentials): Promise<ExtendedAuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      console.log('isAllowed:', isAllowed);
      const response = await AuthService.signIn(credentials);
      console.log('isAllowed after signIn:', isAllowed);

      if (response.access && response.refresh && response.isAllowed) {
        setIsAuthenticated(true);
        setIsAllowed(true);
      } else {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : errorMessages.errorUnknown;
      setError(errorMessage);
      return { message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await AuthService.signOut();
      setIsAuthenticated(false);
      setIsAllowed(false);
    } catch (err) {
      console.error('Error during sign out:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, isAllowed, loading, error, signIn, signOut, clearError: () => setError(null) };
};