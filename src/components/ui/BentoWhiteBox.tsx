import React from "react";

const BentoWhiteBox = ({ children }: BentoWhiteBoxProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {children}
    </div>
  );
};

export interface BentoWhiteBoxProps {
  children: React.ReactNode;
}

export default BentoWhiteBox;
