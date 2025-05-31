import React from "react";

interface Language {
  language: {
    name: string;
  };
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
  addItem: (section: string, newItem: Language) => void;
  removeItem: (section: string, index: number) => void;
  updateItem: (section: string, index: number, updatedItem: Language) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Idiomas</h3>
        <button
          onClick={() =>
            addItem("languages", {
              language: { name: "" },
              level: "Básico",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      {languages.map((lang, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Idioma {index + 1}</h4>
            <button
              onClick={() => removeItem("languages", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del idioma"
              value={lang.language?.name || ""}
              onChange={(e) =>
                updateItem("languages", index, {
                  ...lang,
                  language: { name: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={lang.level}
              onChange={(e) =>
                updateItem("languages", index, {
                  ...lang,
                  level: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};
