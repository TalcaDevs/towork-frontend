import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EditToast } from "../common/EditMessage";
import { tabsEditProfile } from "./TabsEditProfile";
import { PersonalInfoSection } from "./ProfileInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProjectsSection } from "./ProjectsSection";
import { EducationSection } from "./EducationSection";
import { CertificationsSection } from "./CertificationSection";
import { LanguagesSection } from "./LanguagesSection";
import { SkillsSection } from "./SkillsSection";
import { CancelButton } from "../buttons/CancelButton";
import { SaveButton } from "../buttons/SaveButton";
import { FormDataType } from "../../interfaces/types";
import { mapUserDataToFormData } from "../../utils/mapUserData";

const EditProfileModal = ({ isOpen, onClose, userData, onSave }: any) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<FormDataType>({
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
    template: 1,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (userData) {
      setFormData(mapUserDataToFormData(userData));
    }
  }, [userData]);

  const resetFormData = () => {
    if (userData) {
      setFormData(mapUserDataToFormData(userData));
    }
  };

  const handleCancel = () => {
    resetFormData(); // Resetea todos los cambios
    onClose(); // Cierra el modal
  };


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
        template: formData.template || 1, 
      };

      console.log("Datos a enviar al API:", apiData);

      await onSave(apiData);
      showToast("¡Perfil actualizado exitosamente!", "success");
      onClose();

      window.scrollTo({ top: 0, behavior: 'instant' });
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


  const renderPersonal = () => (
    <PersonalInfoSection
      formData={formData}
      handleInputChange={handleInputChange}
    />
  );

  const renderExperience = () => (
    <ExperienceSection
      experience={formData.experience}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );

  const renderProjects = () => (
    <ProjectsSection
      projects={formData.projects}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );

  // Sección de Educación
  const renderEducation = () => (
    <EducationSection
      education={formData.education}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );

  // Sección de Certificaciones
  const renderCertifications = () => (
    <CertificationsSection
      certifications={formData.certifications}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );

  // Sección de Idiomas
  const renderLanguages = () => (
    <LanguagesSection
      languages={formData.languages}
      addItem={addItem}
      removeItem={removeItem}
      updateItem={updateItem}
    />
  );

  // Sección de Skills (versión original con prompt)
  const renderSkills = () => (
    <SkillsSection
      skills={formData.skills}
      handleInputChange={handleInputChange}
    />
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
          <EditToast
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
                {tabsEditProfile.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
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

            
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <CancelButton onClick={handleCancel} />
              <SaveButton onClick={handleSave} loading={loading} />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default EditProfileModal;