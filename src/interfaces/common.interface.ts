export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertMessageProps {
  type: AlertType;
  message: string;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}