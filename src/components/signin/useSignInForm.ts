import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '../../services';
import { ExtendedAuthResponse } from '../../services/interface/api.interface';
import { successMessages } from '../../data/successMessages';

export const useSignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const from = location.state?.from?.pathname || '/profile';
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION = 60;

  useEffect(() => {
    checkBlockStatus();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isBlocked && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
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
      const timePassed = (currentTime - blockTime) / 1000;

      if (timePassed < BLOCK_DURATION) {
        setIsBlocked(true);
        setTimeRemaining(Math.ceil(BLOCK_DURATION - timePassed));
        setError('Demasiados intentos fallidos. Inténtalo más tarde.');
      } else {
        clearBlockData();
      }
    }

    if (attempts) {
      setFailedAttempts(parseInt(attempts, 10));
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
      const blockData = { blockTime: Date.now() };
      localStorage.setItem('signin_block', JSON.stringify(blockData));
      setIsBlocked(true);
      setTimeRemaining(BLOCK_DURATION);
      setError('Demasiados intentos fallidos. Inténtalo más tarde.');
    } else {
      const remainingAttempts = MAX_ATTEMPTS - newAttempts;
      setError(
        `Credenciales incorrectas. Te quedan ${remainingAttempts} intento${
          remainingAttempts !== 1 ? 's' : ''
        }.`
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBlocked) return;
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      setError('Demasiados intentos fallidos. Inténtalo más tarde.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: ExtendedAuthResponse = await AuthService.signIn(formState);

      if (response.access && response.refresh) {
        setFailedAttempts(0);
        clearBlockData();
        setSuccess(response.message || successMessages.loginSuccess);
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else if (response.status === 'pending') {
        setError(response.message || successMessages.profileReviews);
      } else {
        handleFailedAttempt();
      }
    } catch (err) {
      console.error('Login error:', err);
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

  return {
    formState,
    loading,
    error,
    success,
    isBlocked,
    timeRemaining,
    handleChange,
    handleSubmit,
    formatTime,
  };
};
