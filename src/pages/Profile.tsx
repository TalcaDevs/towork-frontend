import { useEffect, useState } from "react";
import { AuthService, ProfileService } from "../services";
import { useNavigate } from "react-router-dom";
import { mockProfileData } from "../data/profileData";
import { errorMessages } from "../data/errorMessages";
import { ProfileData } from "../interfaces/profileData.interface";
import EditProfile from "./EditProfile";

interface Skill {
  name: string;
}

interface SkillWrapper {
  skill: Skill;
}

interface DirectSkill {
  name: string;
}

type SkillItem = string | SkillWrapper | DirectSkill;

const Profile = () => {
  const [userData, setUserData] = useState<ProfileData>({
    id: 0,
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
    template: 1,
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
          const apiData = response.data || response;

          // Transformo el array de skills a un array de strings
          const skills: string[] =
            apiData?.skills
              ?.map((skillItem: SkillItem): string | null => {
                if (typeof skillItem === "string") {
                  return skillItem;
                }
                if ("skill" in skillItem && typeof skillItem.skill.name === "string") {
                  return skillItem.skill.name;
                }
                if ("name" in skillItem) {
                  return skillItem.name;
                }
                return null;
              })
              ?.filter((s: string | null): s is string => s !== null) ?? [];

              console.log(apiData.template)
          setUserData({
            id: apiData?.id || 0,
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
            template: apiData?.template || 1,
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

  console.log("Datos del usuario:", userData);

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
      <EditProfile
        userData={userData}
        onLogout={handleLogout}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Profile;
