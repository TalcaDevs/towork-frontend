import React, { useState } from "react";
import EditProfileModal from "../components/profiles/EditProfileModal";
import { ProfileService } from "../services/profile/ProfileService";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/ArrowRightIcon";
import { EditProfileProps } from "../interfaces/editProfile.interface";
import ShareProfileButton from "../components/ShareButton";
import Title from "../components/ui/Title";
import Paragraph from "../components/ui/Paragraph";
import LinkedInIcon from "../assets/icons/LinkedInIcon";
import GitHubIcon from "../assets/icons/GitHubIcon";
import ProfileIconText from "../components/ProfileIconText";
import BentoWhiteBox from "../components/ui/BentoWhiteBox";
import { useNavigate } from "react-router-dom";
import { AuthService, useCurrentUser } from "../services";

const Profile: React.FC<EditProfileProps> = ({}) => {
  const navigate = useNavigate();
  const { userData, loading, error, refetch } = useCurrentUser();
  void refetch;

  console.log("Datos del usuario:", userData);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleSaveProfile = async (
    updatedData: EditProfileProps["userData"]
  ) => {
    try {
      await ProfileService.saveProfile(updatedData);
      await refetch();
      alert("Perfil actualizado correctamente");
      setIsEditModalOpen(false);
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

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                {/* Header principal */}
                <div className="text-center lg:text-left">
                  <Title
                    size="md"
                    weight="bold"
                    color="primary"
                    margin="xs"
                    as="h5"
                  >
                    {userData.firstName} {userData.lastName}
                  </Title>

                  <Paragraph size="xl" color="muted" className="mb-4">
                    {userData.email}
                  </Paragraph>
                  <ShareProfileButton />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    {userData.location && (
                      <ProfileIconText
                        label="Ubicación"
                        text={userData.location}
                      />
                    )}

                    {userData.phone && (
                      <ProfileIconText label="Teléfono" text={userData.phone} />
                    )}
                  </div>

                  {/* Estado profesional */}
                  <div className="space-y-3">
                    <ProfileIconText
                      label="Rol"
                      text={userData.role || "Profesional"}
                    />
                  </div>

                  <div className="space-y-3">
                    <Title
                      size="xxs"
                      weight="medium"
                      color="secondary"
                      margin="xs"
                      className="uppercase tracking-wide text-sm"
                      as="h3"
                    >
                      Enlaces
                    </Title>
                    <div className="space-y-2">
                      {userData.linkedin && (
                        <a
                          href={userData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <LinkedInIcon />
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

                      {/* PENDIENTE */}
                      {userData.github && (
                        <a
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <GitHubIcon />
                          GitHub
                        </a>
                      )}

                      {/* PENDIENTE */}
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
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {userData.description}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="space-y-8">
              <BentoWhiteBox>
                <Title
                  size="xs"
                  weight="semibold"
                  color="primary"
                  margin="sm"
                  textAlign="left"
                >
                  Habilidades
                </Title>

                <div className="flex flex-wrap gap-2">
                  {userData.skills.length > 0 &&
                  userData.skills[0] !== "No hay habilidades registradas" ? (
                    userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No hay habilidades registradas
                    </p>
                  )}
                </div>
              </BentoWhiteBox>

              {userData.education.length > 0 && (
                <BentoWhiteBox>
                  <Title
                    size="xs"
                    weight="semibold"
                    color="primary"
                    margin="sm"
                    textAlign="left"
                  >
                    Educación
                  </Title>
                  <div className="space-y-4">
                    {userData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 pl-4 py-2"
                      >
                        <h4 className="font-semibold text-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">
                          {edu.start_date} - {edu.end_date || "Presente"}
                        </p>
                      </div>
                    ))}
                  </div>
                </BentoWhiteBox>
              )}

              {userData.languages.length > 0 && (
                <BentoWhiteBox>
                  <Title
                    size="xs"
                    weight="semibold"
                    color="primary"
                    margin="sm"
                    textAlign="left"
                  >
                    Idiomas
                  </Title>
                  <div className="space-y-2">
                    {userData.languages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="font-medium">
                          {lang.language?.name || "Idioma"}
                        </span>
                        <span className="text-sm text-gray-600 capitalize">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </BentoWhiteBox>
              )}
            </div>

            <div className="xl:col-span-2 space-y-8">
              <BentoWhiteBox>
                <Title
                  size="xs"
                  weight="semibold"
                  color="primary"
                  margin="sm"
                  textAlign="left"
                >
                  Experiencia profesional
                </Title>
                <div className="space-y-6">
                  {userData.experience.length > 0 ? (
                    userData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-purple-500 pl-6 py-4 bg-gray-50 rounded-r-lg"
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
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No hay experiencia registrada
                    </p>
                  )}
                </div>
              </BentoWhiteBox>

              {/* Proyectos */}
              {userData.projects.length > 0 && (
                <BentoWhiteBox>
                  <Title
                    size="xs"
                    weight="semibold"
                    color="primary"
                    margin="sm"
                    textAlign="left"
                  >
                    Proyectos destacados
                  </Title>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {userData.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
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
                      </div>
                    ))}
                  </div>
                </BentoWhiteBox>
              )}

              {/* Certificaciones */}
              {userData.certifications.length > 0 && (
                <BentoWhiteBox>
                  <Title
                    size="xs"
                    weight="semibold"
                    color="primary"
                    margin="sm"
                    textAlign="left"
                  >
                    Certificaciones
                  </Title>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {userData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-red-500 pl-4 py-2"
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
                      </div>
                    ))}
                  </div>
                </BentoWhiteBox>
              )}
            </div>
          </div>

          {/* Botones de acción mejorados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              variant="primary"
              size="lg"
            >
              Editar Perfil
            </Button>

            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              userData={userData}
              onSave={handleSaveProfile}
            />
          </div>
        </div>
      </div>

      {/* Espaciado inferior */}
      <div className="h-16"></div>
    </div>
  );
};

export default Profile;
