import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Componente de Notificación Elegante
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -50, scale: 0.9 }}
    className={`fixed top-4 right-4 z-[100] p-4 rounded-lg shadow-lg flex items-center gap-3 ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}
  >
    <span className="text-lg">
      {type === 'success' ? '✅' : '❌'}
    </span>
    <span>{message}</span>
    <button
      onClick={onClose}
      className="ml-2 text-white hover:text-gray-200 font-bold"
    >
      ×
    </button>
  </motion.div>
);

const EditProfileModal = ({ isOpen, onClose, userData, onSave }: any) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    linkedin: "",
    portfolio_url: "",
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    skills: [],
    languages: [],
  });
  const [loading, setLoading] = useState(false);
  
  // Estado para notificaciones
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Función para mostrar notificaciones
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Auto-close después de 4 segundos
  };

  useEffect(() => {
    if (userData) {
      const processedSkills = userData.skills
        ? userData.skills
            .map((skill: any) => {
              console.log("Procesando skill individual:", skill);

              // Si es string directo
              if (typeof skill === "string") {
                console.log("Es string:", skill);
                return skill;
              }

              // Si tiene estructura anidada {'skill': {'name': 'React'}}
              if (skill?.skill?.name) {
                console.log(
                  "Extrayendo de skill.skill.name:",
                  skill.skill.name
                );
                return skill.skill.name;
              }

              // Si skill.skill es string directo
              if (skill?.skill && typeof skill.skill === "string") {
                console.log("Extrayendo de skill.skill (string):", skill.skill);
                return skill.skill;
              }

              // Si tiene estructura simple {'name': 'React'}
              if (skill?.name) {
                console.log("Extrayendo de skill.name:", skill.name);
                return skill.name;
              }

              console.log("No se pudo procesar skill:", skill);
              return null;
            })
            .filter((skill: any) => skill !== null)
        : [];

      setFormData({
        first_name: userData.firstName || "",
        last_name: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
        description: userData.description || "",
        linkedin: userData.linkedin || "",
        portfolio_url: userData.portfolio || "",
        education: userData.education || [],
        experience: userData.experience || [],
        projects: userData.projects || [],
        certifications: userData.certifications || [],
        skills: processedSkills,
        languages: userData.languages || [],
      });
    }
  }, [userData]);

  // Función para resetear el formulario al estado original
  const resetFormData = () => {
    if (userData) {
      const processedSkills = userData.skills
        ? userData.skills
            .map((skill: any) => {
              if (typeof skill === "string") return skill;
              if (skill?.skill?.name) return skill.skill.name;
              if (skill?.skill && typeof skill.skill === "string") return skill.skill;
              if (skill?.name) return skill.name;
              return null;
            })
            .filter((skill: any) => skill !== null)
        : [];

      setFormData({
        first_name: userData.firstName || "",
        last_name: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
        description: userData.description || "",
        linkedin: userData.linkedin || "",
        portfolio_url: userData.portfolio || "",
        education: userData.education || [],
        experience: userData.experience || [],
        projects: userData.projects || [],
        certifications: userData.certifications || [],
        skills: processedSkills,
        languages: userData.languages || [],
      });
    }
  };

  // Función para cerrar modal y resetear cambios
  const handleCancel = () => {
    resetFormData(); // Resetea todos los cambios
    onClose(); // Cierra el modal
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "experience", label: "Experiencia", icon: "💼" },
    { id: "education", label: "Educación", icon: "🎓" },
    { id: "projects", label: "Proyectos", icon: "🚀" },
    { id: "certifications", label: "Certificaciones", icon: "🏆" },
    { id: "skills", label: "Habilidades", icon: "⚡" },
    { id: "languages", label: "Idiomas", icon: "🌐" },
  ];

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addItem = (field: any, newItem: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...prev[field], newItem],
    }));
  };

  const updateItem = (field: any, index: any, updatedItem: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].map((item: any, i: any) =>
        i === index ? updatedItem : item
      ),
    }));
  };

  const removeItem = (field: any, index: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: any) => i !== index),
    }));
  };

  const reloadUserData = async () => {
    try {
      // Scroll al inicio de la página ANTES de recargar
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Recargar inmediatamente después del scroll
      window.location.reload();
    } catch (error) {
      console.error("Error al recargar datos:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const cleanSkills = formData.skills
        .filter(
          (skill: any) => skill && typeof skill === "string" && skill.trim()
        )
        .map((skill: string) => skill.trim());

      const apiData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        profile_photo: userData.profilePhoto || "",
        description: formData.description,
        phone: formData.phone,
        location: formData.location,
        linkedin: formData.linkedin,
        portfolio_url: formData.portfolio_url,
        education: formData.education,
        experience: formData.experience,
        certifications: formData.certifications,
        projects: formData.projects,
        skills: cleanSkills,
        languages: formData.languages,
        template: 1,
      };

      console.log("Datos a enviar al API:", apiData);

      await onSave(apiData);
      
      // Mostrar notificación de éxito
      showToast("¡Perfil actualizado exitosamente!", "success");
      
      // Cerrar modal primero
      onClose();
      
      // Scroll al inicio inmediatamente y recargar
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Recargar después de un muy breve delay
      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (error) {
      console.error("Error al guardar:", error);
      showToast("Error al guardar los cambios. Inténtalo de nuevo.", "error");
    } finally {
      setLoading(false);
    }
  };


  // Sección de Información Personal
  const renderPersonal = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellido
          </label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio
          </label>
          <input
            type="url"
            value={formData.portfolio_url}
            onChange={(e) => handleInputChange("portfolio_url", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  // Sección de Experiencia
  const renderExperience = () => (
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
      {formData.experience.map((exp: any, index: any) => (
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
              placeholder="Fecha inicio"
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
              placeholder="Fecha fin"
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

  // Sección de Proyectos
  const renderProjects = () => (
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
      {formData.projects.map((project: any, index: any) => (
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

  // Sección de Educación
  const renderEducation = () => (
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
      {formData.education.map((edu: any, index: any) => (
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
              placeholder="Fecha inicio"
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
              placeholder="Fecha fin"
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

  // Sección de Certificaciones
  const renderCertifications = () => (
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
      {formData.certifications.map((cert: any, index: any) => (
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
              placeholder="Fecha obtenida"
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

  // Sección de Idiomas
  const renderLanguages = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Idiomas</h3>
        <button
          onClick={() =>
            addItem("languages", {
              language: { name: "" },
              level: "Básico",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>
      {formData.languages.map((lang: any, index: any) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Idioma {index + 1}</h4>
            <button
              onClick={() => removeItem("languages", index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del idioma"
              value={lang.language?.name || ""}
              onChange={(e) =>
                updateItem("languages", index, {
                  ...lang,
                  language: { name: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={lang.level}
              onChange={(e) =>
                updateItem("languages", index, {
                  ...lang,
                  level: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  // Sección de Skills (versión original con prompt)
  const renderSkills = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Habilidades</h3>
        <button
          onClick={() => {
            const newSkill = prompt("Ingresa una nueva habilidad:");
            if (newSkill) {
              handleInputChange("skills", [...formData.skills, newSkill]);
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Agregar
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.skills.map((skill: any, index: any) => (
          <div
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <span>{skill}</span>
            <button
              onClick={() => {
                const newSkills = formData.skills.filter(
                  (_: any, i: any) => i !== index
                );
                handleInputChange("skills", newSkills);
              }}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonal();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "projects":
        return renderProjects();
      case "certifications":
        return renderCertifications();
      case "skills":
        return renderSkills();
      case "languages":
        return renderLanguages();
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Sección en desarrollo...
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Notificación Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal Principal */}
      <AnimatePresence>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                title="Cancelar y cerrar"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">{renderContent()}</div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                title="Cancelar todos los cambios"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default EditProfileModal;