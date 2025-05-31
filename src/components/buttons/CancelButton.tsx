import React from "react";

interface CancelButtonProps {
  onClick: () => void;
  title?: string;
  className?: string;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  title = "Cancelar todos los cambios",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 ${className}`}
    >
      Cancelar
    </button>
  );
};
