export interface NavLinkProps {
    to: string;
    label: string;
    active?: boolean;
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }
  
  export interface JobCategory {
    id: string;
    name: string;
    slug: string;
  }
  
  export interface SearchInputProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    buttonText?: string;
  }
  
  export interface IconProps {
    size?: number;
    color?: string;
    className?: string;
  }