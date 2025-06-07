import React from "react";
import { ProjectItem } from "../../interfaces/signup.interface";

interface ProjectsListProps {
  projects: ProjectItem[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {projects.map((project, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          {project.title}
        </h4>
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
        <p className="text-orange-600 text-sm font-medium mb-3">
          {project.tools_used}
        </p>
        {project.project_url && (
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver proyecto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    ))}
  </div>
);
