import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    role: 'Profesional',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    experience: [
      {
        id: 1,
        company: 'Empresa ABC',
        position: 'Desarrollador Frontend',
        period: 'Ene 2020 - Presente'
      },
      {
        id: 2,
        company: 'Startup XYZ',
        position: 'UI/UX Designer',
        period: 'Mar 2018 - Dic 2019'
      }
    ],
    skills: ['React', 'TypeScript', 'UI/UX', 'HTML/CSS', 'Node.js']
  });

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      name: 'Nuevo Usuario',
      email: 'nuevo@ejemplo.com'
    }));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Perfil cargado:', userData);
  }, []);

  const handleLogout = () => {
    AuthService.signOut();
    navigate('/signin');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
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
                <motion.p 
                  className="text-gray-600"
                  variants={itemVariants}
                >
                  {userData.email}
                </motion.p>
                <motion.div 
                  className="mt-2"
                  variants={itemVariants}
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {userData.role}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            variants={itemVariants}
          >
            {[
              { label: 'Aplicaciones', value: '12', icon: '📝' },
              { label: 'Vistas de perfil', value: '324', icon: '👁️' },
              { label: 'Ofertas recibidas', value: '3', icon: '🎯' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Two-column layout for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills section */}
            <motion.div 
              className="md:col-span-1"
              variants={itemVariants}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, backgroundColor: "#DBEAFE" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience section */}
            <motion.div 
              className="md:col-span-2"
              variants={itemVariants}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Experiencia</h2>
                <div className="space-y-4">
                  {userData.experience.map((exp, index) => (
                    <motion.div 
                      key={exp.id}
                      className="border-l-2 border-blue-500 pl-4 py-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <h3 className="font-medium text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </motion.div>
                  ))}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Editar Perfil
            </motion.button>
            <motion.button
              className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
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