import React from "react";

interface SkillsSectionProps {
  skills: string[];
  handleInputChange: (field: string, value: string[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  handleInputChange,
}) => {
  const addSkill = () => {
    const newSkill = prompt("Ingresa una nueva habilidad:");
    if (newSkill) {
      handleInputChange("skills", [...skills, newSkill]);
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    handleInputChange("skills", newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Habilidades</h3>
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
