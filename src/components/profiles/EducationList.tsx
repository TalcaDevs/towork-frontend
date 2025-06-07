import React from "react";
import { EducationItem } from "../../interfaces/signup.interface";

interface EducationListProps {
  education: EducationItem[];
}

export const EducationList: React.FC<EducationListProps> = ({ education }) => (
  <div className="space-y-4">
    {education.map((edu, index) => (
      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
        <p className="text-gray-600">{edu.institution}</p>
        <p className="text-sm text-gray-500">
          {edu.start_date} - {edu.end_date || "Presente"}
        </p>
      </div>
    ))}
  </div>
);
