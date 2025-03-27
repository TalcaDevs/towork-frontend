import React from 'react'
import { TitleProps } from '../interfaces/title.interface'

const Title: React.FC<TitleProps> = ({ title, size = 'lg', weight = 'bold' }) => {
  const sizeClasses = {
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
    black: 'font-black'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.lg;
  const weightClass = weightClasses[weight] || weightClasses.bold;

  return (
    <h2 className={`${sizeClass} ${weightClass} mb-6 text-center`}>{title}</h2>
  )
}

export default Title