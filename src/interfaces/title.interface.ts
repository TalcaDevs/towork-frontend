export interface TitleProps {
  children: React.ReactNode;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}