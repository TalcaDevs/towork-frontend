import React from "react";
import { CertificationItem } from "../../interfaces/signup.interface";

interface CertificationsListProps {
  certifications: CertificationItem[];
}

export const CertificationsList: React.FC<CertificationsListProps> = ({ certifications }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {certifications.map((cert, index) => (
      <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
        <h4 className="font-medium text-gray-800">{cert.name}</h4>
        <p className="text-gray-600">{cert.institution}</p>
        <p className="text-sm text-gray-500">{cert.date_obtained}</p>
        {cert.certificate_url && (
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Ver certificado →
          </a>
        )}
      </div>
    ))}
  </div>
);
