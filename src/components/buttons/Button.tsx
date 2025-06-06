import React from "react";
import { ButtonProps } from "../../interfaces/button.interface";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}) => {
  const baseClasses =
    "rounded-full font-medium transition-colors duration-200 inline-flex items-center justify-center";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
  };

  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
