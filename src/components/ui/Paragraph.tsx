import React from "react";
import { ParagraphProps } from "../../interfaces/paragraph.interface";

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = '',
  size = 'base',
  color = 'default',
  weight = 'normal',
  align = 'left',
  leading = 'normal',
  as: Component = 'p',
}) => {

  const baseClasses = 'block';

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const colorClasses = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-gray-700',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const leadingClasses = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    colorClasses[color],
    weightClasses[weight],
    alignClasses[align],
    leadingClasses[leading],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
};

export default Paragraph;