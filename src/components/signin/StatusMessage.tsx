import React from 'react';
import { motion } from 'framer-motion';
import { errorVariants } from '../../utils/animation';
import ErrorIcon from '../../assets/icons/ErrorIcon';
import CorrectIcon from '../../assets/icons/CorrectIcon';

export type StatusVariant = 'success' | 'error' | 'warning' | 'blocked';

interface StatusMessageProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const styles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-600',
    icon: <CorrectIcon />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-600',
    icon: <ErrorIcon />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    text: 'text-yellow-700',
    icon: <ErrorIcon />,
  },
  blocked: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: <ErrorIcon />,
  },
} as const;

const StatusMessage: React.FC<StatusMessageProps> = ({ variant, children, className = '' }) => {
  const style = styles[variant];
  return (
    <motion.div
      className={`mt-4 p-3 border rounded-lg text-sm flex items-center ${style.bg} ${style.border} ${style.text} ${className}`}
      {...errorVariants}
    >
      {style.icon}
      <div className="ml-2">{children}</div>
    </motion.div>
  );
};

export default StatusMessage;
