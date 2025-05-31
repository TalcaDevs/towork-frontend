import React from "react";
import { IconProps } from "../../interfaces/icons.interface";

const CurrencyDollarIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <path d="M8 12h8" />
      <path d="M8 8h8" />
      <path d="M8 16h8" />
    </svg>
  );
};

export default CurrencyDollarIcon;
