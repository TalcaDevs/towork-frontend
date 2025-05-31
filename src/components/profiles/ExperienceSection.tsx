import React from "react";

interface Experience {
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  addItem: (section: string, newItem: Experience) => void;
  removeItem: (section: string, index: number) => void;
  updateItem: (section: string, index: number, updatedItem: Experience) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Experiencia Laboral</h3>
        <button
          onClick={() =>
            addItem("experience", {
              company: "",
              position: "",
              description: "",
              start_date: "",
              end_date: "",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      {experience.map((exp, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Experiencia {index + 1}</h4>
            <button
              onClick={() => removeItem("experience", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Empresa"
              value={exp.company}
              onChange={(e) =>
                updateItem("experience", index, {
                  ...exp,
                  company: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Posición"
              value={exp.position}
              onChange={(e) =>
                updateItem("experience", index, {
                  ...exp,
                  position: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="Descripción"
            value={exp.description}
            onChange={(e) =>
              updateItem("experience", index, {
                ...exp,
                description: e.target.value,
              })
            }
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={exp.start_date}
              onChange={(e) =>
                updateItem("experience", index, {
                  ...exp,
                  start_date: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={exp.end_date}
              onChange={(e) =>
                updateItem("experience", index, {
                  ...exp,
                  end_date: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
