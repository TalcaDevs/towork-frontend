import React from "react";

interface Project {
  title: string;
  description: string;
  tools_used: string;
  project_url: string;
  project_image: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  addItem: (section: string, newItem: Project) => void;
  removeItem: (section: string, index: number) => void;
  updateItem: (section: string, index: number, updatedItem: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Proyectos</h3>
        <button
          onClick={() =>
            addItem("projects", {
              title: "",
              description: "",
              tools_used: "",
              project_url: "",
              project_image: "",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Proyecto {index + 1}</h4>
            <button
              onClick={() => removeItem("projects", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <input
            type="text"
            placeholder="Título del proyecto"
            value={project.title}
            onChange={(e) =>
              updateItem("projects", index, {
                ...project,
                title: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Descripción del proyecto"
            value={project.description}
            onChange={(e) =>
              updateItem("projects", index, {
                ...project,
                description: e.target.value,
              })
            }
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Tecnologías utilizadas"
            value={project.tools_used}
            onChange={(e) =>
              updateItem("projects", index, {
                ...project,
                tools_used: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            placeholder="URL del proyecto"
            value={project.project_url}
            onChange={(e) =>
              updateItem("projects", index, {
                ...project,
                project_url: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};
