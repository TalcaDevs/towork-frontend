import React from "react";
import { IconProps } from "../../interfaces/icons.interface";

const LikesIcon: React.FC<IconProps> = () => {
  return (
    <svg
      className="w-5 h-5 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.8 10.8a11.003 11.003 0 005.4 5.4l1.413-3.424a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
};

export default LikesIcon;
