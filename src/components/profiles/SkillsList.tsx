import React from "react";

interface SkillsListProps {
  skills: string[];
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => (
  <div className="flex flex-wrap gap-2">
    {skills.length > 0 && skills[0] !== "No hay habilidades registradas" ? (
      skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          {skill}
        </span>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No hay habilidades registradas</p>
    )}
  </div>
);
