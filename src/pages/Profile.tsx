import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthService, ProfileService } from "../services";
import { useNavigate } from "react-router-dom";
import {
  EducationItem,
  ExperienceItem,
  CertificationItem,
  ProjectItem,
  LanguageItem,
} from "../interfaces/signup.interface";
import { itemVariants, containerVariants } from "../utils/animation";
import { MiniCardBento } from "../components/profiles/MiniCardBento";
import AlertMessage from "../components/common/AlertMessage";
import { mockProfileData } from "../data/profileData";
import { errorMessages } from "../data/errorMessages";
import { successMessages } from "../data/successMessages";

interface UserData {
  name: string;
  description: string;
  role: string;
  avatarUrl: string;
  experience: ExperienceItem[];
  skills: string[];
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "Cargando...",
    description: "Cargando...",
    role: "Usuario",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    experience: [],
    skills: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await ProfileService.getCurrentUser();

        if (response) {
          console.log("Datos del usuario obtenidos:", response);

          // Adaptarse a la estructura de tu API
          const userData = response.data || response;
          const name =
            userData?.name ||
            (userData?.first_name && userData?.last_name
              ? `${userData.first_name} ${userData.last_name}`
              : userData?.first_name || "Usuario");

          const skills =
            userData?.skills?.map((skillItem: any) => skillItem.skill?.name) ||
            [];
          if (skills.length === 0) {
            skills.push(successMessages.noSkills);
          }

          console.log(successMessages.skillsObtained, skills);

          setUserData({
            name: name,
            description: userData?.description || errorMessages.noDescription,
            role: userData?.role || mockProfileData.role,
            avatarUrl: userData?.avatarUrl || mockProfileData.avatarUrl,
            experience: userData?.experience || mockProfileData.experience,
            skills: skills,
          });
        } else {
          console.error("No se recibieron datos del usuario");
          setError(errorMessages.noData);

          setUserData((prev) => ({
            ...prev,
            name: "Usuario",
            description: errorMessages.noDescription,
          }));
        }
      } catch (error) {
        setError(errorMessages.serverError);

        // Mantener datos básicos si hay error
        setUserData((prev) => ({
          ...prev,
          name: "Usuario",
          description: errorMessages.noDescription,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aún así navegar al signin
      navigate("/signin");
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
    <motion.div
      className="min-h-screen bg-gray-50 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {error && <AlertMessage type="error" message={error} />}

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
            variants={itemVariants}
          >
            <div className="relative h-32 bg-gradient-to-r from-blue-400 to-blue-600">
              <motion.button
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar Sesión
              </motion.button>
            </div>
            <div className="flex flex-col md:flex-row p-6 relative">
              <div className="relative -mt-16 mb-4 md:mb-0 md:mr-6 w-24 h-24">
                <motion.img
                  src={userData.avatarUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                />
              </div>
              <div>
                <motion.h1
                  className="text-2xl font-bold text-gray-800"
                  variants={itemVariants}
                >
                  {userData.name}
                </motion.h1>
                <motion.p className="text-gray-600" variants={itemVariants}>
                  {userData.description || errorMessages.noDescription}
                </motion.p>
                <motion.div className="mt-2" variants={itemVariants}>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {userData.role}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <MiniCardBento />

          {/* Two-column layout for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills section */}
            <motion.div className="md:col-span-1" variants={itemVariants}>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.length > 0 &&
                  userData.skills[0] !== "No hay habilidades registradas" ? (
                    userData.skills.map((skill, index) => (
                      <motion.span
                        key={`skill-${index}-${skill}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#DBEAFE" }}
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
              </div>
            </motion.div>

            {/* Experience section */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Experiencia
                </h2>
                <div className="space-y-4">
                  {userData.experience.length > 0 &&
                  userData.experience[0].company !==
                    "No hay experiencia registrada" ? (
                    userData.experience.map((exp, index) => (
                      <motion.div
                        key={`experience-${index}-${exp.company}`}
                        className="border-l-2 border-blue-500 pl-4 py-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <h3 className="font-medium text-gray-800">
                          {exp.position}
                        </h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">
                          {exp.start_date} - {exp.end_date || "Presente"}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {exp.description}
                          </p>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No hay experiencia registrada
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action buttons */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
            variants={itemVariants}
          >
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Editar Perfil
            </motion.button>
            <motion.button
              className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Descargar CV
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
