import React from "react";
import { IconProps } from "../../interfaces/icons.interface";

const LockIcon: React.FC<IconProps> = ({
  size = 20,
}) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
        </svg>
  );
};

export default LockIcon;

