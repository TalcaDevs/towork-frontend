import React from "react";
import { LanguageItem } from "../../interfaces/signup.interface";

interface LanguagesListProps {
  languages: LanguageItem[];
}

export const LanguagesList: React.FC<LanguagesListProps> = ({ languages }) => (
  <div className="space-y-2">
    {languages.map((lang, index) => (
      <div
        key={index}
        className="flex justify-between items-center p-2 bg-gray-50 rounded"
      >
        <span className="font-medium">{lang.language?.name || "Idioma"}</span>
        <span className="text-sm text-gray-600 capitalize">{lang.level}</span>
      </div>
    ))}
  </div>
);
