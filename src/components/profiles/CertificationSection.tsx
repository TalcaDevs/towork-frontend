import React from "react";

interface Certification {
  name: string;
  institution: string;
  date_obtained: string;
  certificate_url: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  addItem: (section: string, newItem: Certification) => void;
  removeItem: (section: string, index: number) => void;
  updateItem: (section: string, index: number, updatedItem: Certification) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  addItem,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certificaciones</h3>
        <button
          onClick={() =>
            addItem("certifications", {
              name: "",
              institution: "",
              date_obtained: "",
              certificate_url: "",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>

      {certifications.map((cert, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Certificación {index + 1}</h4>
            <button
              onClick={() => removeItem("certifications", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre de la certificación"
              value={cert.name}
              onChange={(e) =>
                updateItem("certifications", index, {
                  ...cert,
                  name: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Institución"
              value={cert.institution}
              onChange={(e) =>
                updateItem("certifications", index, {
                  ...cert,
                  institution: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={cert.date_obtained}
              onChange={(e) =>
                updateItem("certifications", index, {
                  ...cert,
                  date_obtained: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="URL del certificado"
              value={cert.certificate_url}
              onChange={(e) =>
                updateItem("certifications", index, {
                  ...cert,
                  certificate_url: e.target.value,
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
