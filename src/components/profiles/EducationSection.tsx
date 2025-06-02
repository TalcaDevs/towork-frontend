import React from "react";

interface Education {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
}

interface EducationSectionProps {
  education: Education[];
  addItem: (section: string, newItem: Education) => void;
  removeItem: (section: string, index: number) => void;
  updateItem: (section: string, index: number, updatedItem: Education) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Educación</h3>
        <button
          onClick={() =>
            addItem("education", {
              institution: "",
              degree: "",
              start_date: "",
              end_date: "",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      {education.map((edu, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Educación {index + 1}</h4>
            <button
              onClick={() => removeItem("education", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Institución"
              value={edu.institution}
              onChange={(e) =>
                updateItem("education", index, {
                  ...edu,
                  institution: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Título/Grado"
              value={edu.degree}
              onChange={(e) =>
                updateItem("education", index, {
                  ...edu,
                  degree: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={edu.start_date}
              onChange={(e) =>
                updateItem("education", index, {
                  ...edu,
                  start_date: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={edu.end_date}
              onChange={(e) =>
                updateItem("education", index, {
                  ...edu,
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
