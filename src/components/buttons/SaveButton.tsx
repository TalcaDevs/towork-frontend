import React from "react";

interface SaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  text?: string;
  className?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  loading = false,
  text = "Guardar Cambios",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      {loading ? "Guardando..." : text}
    </button>
  );
};
