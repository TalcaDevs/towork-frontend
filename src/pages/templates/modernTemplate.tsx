import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EducationItem,
  ExperienceItem,
  CertificationItem,
  ProjectItem,
  LanguageItem,
} from "../../interfaces/signup.interface";
import DownLoadIcon from "../../assets/icons/DownLoadIcon";
import EditIcon from "../../assets/icons/EditIcon";
import { containerVariants, itemVariants } from "../../utils/animation";
import EditProfileModal from "../../components/profiles/EditProfileModal";
import { ProfileService } from "../../services/profile/ProfileService";
import Button from "../../components/Button";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";

interface ModernTemplateProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    location?: string;
    phone?: string;
    description?: string;
    profilePhoto: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
    website?: string;
    stats: {
      applications: number;
      profileViews: number;
      offers: number;
    };
    skills: string[];
    experience: ExperienceItem[];
    education: EducationItem[];
    projects: ProjectItem[];
    certifications: CertificationItem[];
    languages: LanguageItem[];
  };
  onLogout: () => void;
  loading?: boolean;
  error?: string | null;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  userData,
  onLogout,
  loading = false,
  error = null,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = async (updatedData: any) => {
    try {
      await ProfileService.saveProfile(updatedData);
      alert("Perfil actualizado correctamente");
      window.location.reload(); // Para recargar los datos
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    }
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header con gradiente mejorado */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white/25 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-32 relative z-10">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400">⚠️</div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-8">
              <div className="space-y-6">
                {/* Header principal */}
                <div className="text-center lg:text-left">
                  <motion.h1
                    className="text-4xl font-bold text-gray-900 mb-2"
                    variants={itemVariants}
                  >
                    {userData.firstName} {userData.lastName}
                  </motion.h1>
                  <motion.p
                    className="text-xl text-gray-600 mb-4"
                    variants={itemVariants}
                  >
                    {userData.email}
                  </motion.p>
                </div>

                {/* Información de contacto y profesional */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Información de contacto */}
                  <div className="space-y-3">
                    {userData.location && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ubicación</p>
                          <p className="font-medium text-gray-900">
                            {userData.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {userData.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.8 10.8a11.003 11.003 0 005.4 5.4l1.413-3.424a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-medium text-gray-900">
                            {userData.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Estado profesional */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rol</p>
                        <p className="font-medium text-gray-900">
                          {userData.role || "Profesional"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estado</p>
                        <p className="font-medium text-emerald-600">
                          Disponible
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enlaces sociales y profesionales */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Enlaces
                    </h3>
                    <div className="space-y-2">
                      {userData.linkedin && (
                        <a
                          href={userData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}

                      {userData.portfolio && (
                        <a
                          href={userData.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                        >
                          <ArrowRightIcon />
                          Portfolio
                        </a>
                      )}

                      {userData.github && (
                        <a
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}

                      {userData.website && (
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                {userData.description &&
                  userData.description !== "Sin descripción disponible" && (
                    <div className="pt-6 border-t border-gray-100">
                      <motion.p
                        className="text-gray-700 leading-relaxed text-lg"
                        variants={itemVariants}
                      >
                        {userData.description}
                      </motion.p>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          ></motion.div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Habilidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.length > 0 &&
                  userData.skills[0] !== "No hay habilidades registradas" ? (
                    userData.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No hay habilidades registradas
                    </p>
                  )}
                </div>
              </motion.div>

              {userData.education.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Educación
                  </h3>
                  <div className="space-y-4">
                    {userData.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="border-l-4 border-green-500 pl-4 py-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <h4 className="font-semibold text-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">
                          {edu.start_date} - {edu.end_date || "Presente"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {userData.languages.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Idiomas
                  </h3>
                  <div className="space-y-2">
                    {userData.languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <span className="font-medium">
                          {lang.language?.name || "Idioma"}
                        </span>
                        <span className="text-sm text-gray-600 capitalize">
                          {lang.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="xl:col-span-2 space-y-8">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Experiencia Profesional
                </h3>
                <div className="space-y-6">
                  {userData.experience.length > 0 ? (
                    userData.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="border-l-4 border-purple-500 pl-6 py-4 bg-gray-50 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h4>
                        <p className="text-purple-600 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.start_date} - {exp.end_date || "Presente"}
                        </p>
                        {exp.description && (
                          <p className="text-gray-700">{exp.description}</p>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No hay experiencia registrada
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Proyectos */}
              {userData.projects.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Proyectos Destacados
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {userData.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {project.description}
                        </p>
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
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Certificaciones */}
              {userData.certifications.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Certificaciones
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {userData.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        className="border-l-4 border-red-500 pl-4 py-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <h4 className="font-medium text-gray-800">
                          {cert.name}
                        </h4>
                        <p className="text-gray-600">{cert.institution}</p>
                        <p className="text-sm text-gray-500">
                          {cert.date_obtained}
                        </p>
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
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Botones de acción mejorados */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="primary lg"
            >
              Editar Perfil
            </Button>

            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              userData={userData}
              onSave={handleSaveProfile}
            />
            <motion.button
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DownLoadIcon />
              Descargar CV
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Espaciado inferior */}
      <div className="h-16"></div>
    </div>
  );
};

export default ModernTemplate;
