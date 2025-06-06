import React from 'react'
import { TitleProps } from '../../interfaces/title.interface'

const Title: React.FC<TitleProps> = ({ 
  children, 
  size = 'lg', 
  weight = 'bold', 
  textAlign = 'left', 
  margin = 'md', 
  color = 'primary',
  as: Component = 'h2',
  className = ''
}) => {
  const sizeClasses = {
    xxs: 'text-xs',
    xs: 'text-xl',
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const weightClasses = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const marginClasses = {
    xs: 'mb-2',
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
    xl: 'mb-10'
  }

  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-teal-600',
  };

  const combinedClasses = [
    sizeClasses[size],
    weightClasses[weight],
    textAlignClasses[textAlign],
    marginClasses[margin],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  )
}

export default Title



