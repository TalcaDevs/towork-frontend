import React from 'react'
import { TitleProps } from '../interfaces/title.interface'

const Title: React.FC<TitleProps> = ({ title, size = 'lg', weight = 'bold', textAlign = 'left', margin = 'md', color = 'primary' }) => {
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
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-teal-600'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.lg;
  const weightClass = weightClasses[weight] || weightClasses.bold;
  const textAlignClass = textAlignClasses[textAlign] || textAlignClasses.left;
  const marginClass = marginClasses[margin] || marginClasses.md;
  const colorClass = colorClasses[color] || colorClasses.primary;

  return (
    <h2 className={`${sizeClass} ${weightClass} ${textAlignClass} ${marginClass} ${colorClass}`}>{title}</h2>
  )
}

export default Title



