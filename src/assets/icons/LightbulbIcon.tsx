import React from "react";
import { IconProps } from "../../interfaces/icons.interface";

const LightbulbIcon: React.FC<IconProps> = ({
  className = "text-blue-500",
  size = 24,
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
      <path d="M9 18h6M10 22h4M12 2v5M4.9 4.9l3.53 3.53M2 12h5M4.9 19.1l3.53-3.53M19.1 4.9l-3.53 3.53M22 12h-5M19.1 19.1l-3.53-3.53" />
      <path d="M12 8a4 4 0 0 1 4 4 4.1 4.1 0 0 1-1.05 2.75A4 4 0 0 1 12 16a4 4 0 0 1-2.95-1.25A4.1 4.1 0 0 1 8 12a4 4 0 0 1 4-4Z" />
    </svg>
  );
};

export default LightbulbIcon;
