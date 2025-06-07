import React from "react";
import { ExperienceItem } from "../../interfaces/signup.interface";

interface ExperienceListProps {
  experience: ExperienceItem[];
}

export const ExperienceList: React.FC<ExperienceListProps> = ({ experience }) => (
  <div className="space-y-6">
    {experience.length > 0 ? (
      experience.map((exp, index) => (
        <div
          key={index}
          className="border-l-4 border-purple-500 pl-6 py-4 bg-gray-50 rounded-r-lg"
        >
          <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
          <p className="text-purple-600 font-medium">{exp.company}</p>
          <p className="text-sm text-gray-500 mb-2">
            {exp.start_date} - {exp.end_date || "Presente"}
          </p>
          {exp.description && <p className="text-gray-700">{exp.description}</p>}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No hay experiencia registrada</p>
    )}
  </div>
);
