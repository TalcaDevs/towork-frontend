import { useEffect, useState } from "react";
import { AuthService, ProfileService } from "../services";
import { useNavigate } from "react-router-dom";
import {
  EducationItem,
  ExperienceItem,
  CertificationItem,
  ProjectItem,
  LanguageItem,
} from "../interfaces/signup.interface";
import { mockProfileData } from "../data/profileData";
import { errorMessages } from "../data/errorMessages";
import { successMessages } from "../data/successMessages";
import ModernTemplate from "../pages/templates/modernTemplate"; // Ajusta la ruta

interface ProfileData {
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
}

const Profile = () => {
  const [userData, setUserData] = useState<ProfileData>({
    firstName: "Cargando...",
    lastName: "",
    email: "Cargando...",
    role: "Usuario",
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    stats: {
      applications: 0,
      profileViews: 0,
      offers: 0,
    },
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        const response = await ProfileService.getCurrentUser();

        if (response) {
          console.log("Datos del usuario obtenidos:", response);

          const apiData = response.data || response;

          const skills =
            apiData?.skills
              ?.map((skillItem: any) => {
                if (typeof skillItem === "string") {
                  return skillItem;
                }
                if (skillItem?.skill?.name) {
                  return skillItem.skill.name;
                }
                if (skillItem?.name) {
                  return skillItem.name;
                }
                return null;
              })
              .filter((skill: any) => skill !== null) || [];

          if (skills.length === 0) {
            skills.push("No hay habilidades registradas");
          }

          setUserData({
            firstName: apiData?.first_name || "Usuario",
            lastName: apiData?.last_name || "",
            email: apiData?.email || "usuario@ejemplo.com",
            role: apiData?.role || "Profesional",
            location: apiData?.location,
            phone: apiData?.phone,
            description: apiData?.description || apiData?.bio,
            profilePhoto: apiData?.profile_photo || mockProfileData.avatarUrl,
            linkedin: apiData?.linkedin,
            portfolio: apiData?.portfolio_url,
            github: apiData?.github,
            website: apiData?.website,
            stats: {
              applications: apiData?.applications_sent || 0,
              profileViews: apiData?.profile_views || 0,
              offers: apiData?.offers_received || 0,
            },
            skills: skills,
            experience: apiData?.experience || [],
            education: apiData?.education || [],
            projects: apiData?.projects || [],
            certifications: apiData?.certifications || [],
            languages: apiData?.languages || [],
          });
        } else {
          console.error("No se recibieron datos del usuario");
          setError(errorMessages.noData);

          setUserData((prev) => ({
            ...prev,
            firstName: "Usuario",
            email: "usuario@ejemplo.com",
            profilePhoto:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            stats: {
              applications: 0,
              profileViews: 0,
              offers: 0,
            },
            skills: [],
            experience: [],
            education: [],
            projects: [],
            certifications: [],
            languages: [],
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setError(errorMessages.serverError);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <ModernTemplate
        userData={userData}
        onLogout={handleLogout}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Profile;
