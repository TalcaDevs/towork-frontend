export interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  as?: 'p' | 'span' | 'div';
}