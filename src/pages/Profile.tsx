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
import ProfileSection from "../components/profiles/ProfileSection";
import { SkillsList } from "../components/profiles/SkillsList";
import { EducationList } from "../components/profiles/EducationList";
import { LanguagesList } from "../components/profiles/LanguagesList";
import { ExperienceList } from "../components/profiles/ExperienceList";
import { ProjectsList } from "../components/profiles/ProjectsList";
import { CertificationsList } from "../components/profiles/CertificationsList";
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
              <ProfileSection title="Habilidades">
                <SkillsList skills={userData.skills} />
              </ProfileSection>

              {userData.education.length > 0 && (
                <ProfileSection title="Educación">
                  <EducationList education={userData.education} />
                </ProfileSection>
              )}

              {userData.languages.length > 0 && (
                <ProfileSection title="Idiomas">
                  <LanguagesList languages={userData.languages} />
                </ProfileSection>
              )}
            </div>

            <div className="xl:col-span-2 space-y-8">
              <ProfileSection title="Experiencia profesional">
                <ExperienceList experience={userData.experience} />
              </ProfileSection>

              {userData.projects.length > 0 && (
                <ProfileSection title="Proyectos destacados">
                  <ProjectsList projects={userData.projects} />
                </ProfileSection>
              )}

              {userData.certifications.length > 0 && (
                <ProfileSection title="Certificaciones">
                  <CertificationsList
                    certifications={userData.certifications}
                  />
                </ProfileSection>
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
