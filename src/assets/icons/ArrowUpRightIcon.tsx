import React from "react";
import { IconProps } from "../../interfaces/icons.interface";

const ArrowUpRightIcon: React.FC<IconProps> = ({
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
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  );
};

export default ArrowUpRightIcon;
