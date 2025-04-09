import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../Input';
import Button from '../Button';

interface Step2Props {
  userData: any;
  updateUserData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

const Step2FillInfo: React.FC<Step2Props> = ({ 
  userData, 
  updateUserData, 
  nextStep, 
  prevStep,
  skipStep,
  loading, 
  error, 
  setLoading, 
  setError, 
  setSuccess 
}) => {
  // State for education and experience form fields
  const [newEducation, setNewEducation] = useState({
    institucion: '',
    titulo: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  
  const [newExperience, setNewExperience] = useState({
    empresa: '',
    puesto: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  
  // State for skills input
  const [skillInput, setSkillInput] = useState('');
  
  // Handle basic info changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };
  
  // Handle education form changes
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value
    });
  };
  
  // Add new education item
  const addEducation = () => {
    if (newEducation.institucion && newEducation.titulo) {
      const updatedEducation = [...userData.educacion, newEducation];
      updateUserData({ educacion: updatedEducation });
      
      // Reset form
      setNewEducation({
        institucion: '',
        titulo: '',
        fecha_inicio: '',
        fecha_fin: ''
      });
    }
  };
  
  // Remove education item
  const removeEducation = (index: number) => {
    const updatedEducation = userData.educacion.filter((_: any, i: number) => i !== index);
    updateUserData({ educacion: updatedEducation });
  };
  
  // Handle experience form changes
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
      [name]: value
    });
  };
  
  // Add new experience item
  const addExperience = () => {
    if (newExperience.empresa && newExperience.puesto) {
      const updatedExperience = [...userData.experiencia, newExperience];
      updateUserData({ experiencia: updatedExperience });
      
      // Reset form
      setNewExperience({
        empresa: '',
        puesto: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: ''
      });
    }
  };
  
  // Remove experience item
  const removeExperience = (index: number) => {
    const updatedExperience = userData.experiencia.filter((_: any, i: number) => i !== index);
    updateUserData({ experiencia: updatedExperience });
  };
  
  // Handle skills input
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };
  
  // Add new skill
  const addSkill = () => {
    if (skillInput.trim() && !userData.skills.includes(skillInput.trim())) {
      const updatedSkills = [...userData.skills, skillInput.trim()];
      updateUserData({ skills: updatedSkills });
      setSkillInput('');
    }
  };
  
  // Remove skill
  const removeSkill = (skill: string) => {
    const updatedSkills = userData.skills.filter((s: string) => s !== skill);
    updateUserData({ skills: updatedSkills });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://184.73.49.129:8000/users/save-profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({
          first_name: userData.first_name,
          last_name: userData.last_name,
          descripcion: userData.descripcion,
          telefono: userData.telefono,
          ubicacion: userData.ubicacion,
          linkedin: userData.linkedin,
          id_portafolio_web: userData.id_portafolio_web,
          educacion: userData.educacion,
          experiencia: userData.experiencia,
          skills: userData.skills
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message || 'Perfil actualizado exitosamente');
        nextStep();
      } else {
        setError(data.message || data.detail || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Error al conectar con el servidor. Intente nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Animation variants
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
  
  // Handle keypress for adding skills
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };
  
  return (
    <motion.div
      className="flex-1 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <motion.p variants={itemVariants} className="text-gray-600 mb-2">
          Esta información nos ayudará a personalizar tu experiencia y mostrar tu perfil a reclutadores interesados. Puedes saltarte este paso y completarlo más tarde desde tu perfil.
        </motion.p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 overflow-y-auto max-h-[65vh] pr-2 pb-6">
          {/* Basic Information Section */}
          <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Básica</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción / Biografía
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
                  placeholder="Cuéntanos brevemente sobre ti y tu experiencia profesional..."
                  value={userData.descripcion || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  label="Teléfono"
                  placeholder="+52 123 456 7890"
                  value={userData.telefono || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  id="ubicacion"
                  name="ubicacion"
                  type="text"
                  label="Ubicación"
                  placeholder="Ciudad, País"
                  value={userData.ubicacion || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/tu-usuario"
                  value={userData.linkedin || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  id="id_portafolio_web"
                  name="id_portafolio_web"
                  type="url"
                  label="Sitio Web / Portafolio"
                  placeholder="https://tu-sitio-web.com"
                  value={userData.id_portafolio_web || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Education Section */}
          <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Educación</h3>
            
            {/* Added Education List */}
            {userData.educacion && userData.educacion.length > 0 && (
              <div className="mb-4 space-y-3">
                {userData.educacion.map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{edu.titulo}</h4>
                      <p className="text-gray-600 text-sm">{edu.institucion}</p>
                      <p className="text-gray-500 text-xs">
                        {edu.fecha_inicio} - {edu.fecha_fin || 'Presente'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add Education Form */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="institucion"
                  name="institucion"
                  type="text"
                  label="Institución"
                  placeholder="Universidad o centro educativo"
                  value={newEducation.institucion}
                  onChange={handleEducationChange}
                />
                
                <Input
                  id="titulo"
                  name="titulo"
                  type="text"
                  label="Título"
                  placeholder="Grado obtenido"
                  value={newEducation.titulo}
                  onChange={handleEducationChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="fecha_inicio"
                  name="fecha_inicio"
                  type="text"
                  label="Fecha de inicio"
                  placeholder="Ej. 2018"
                  value={newEducation.fecha_inicio}
                  onChange={handleEducationChange}
                />
                
                <Input
                  id="fecha_fin"
                  name="fecha_fin"
                  type="text"
                  label="Fecha de fin (o 'Presente')"
                  placeholder="Ej. 2022 o Presente"
                  value={newEducation.fecha_fin}
                  onChange={handleEducationChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addEducation}
                >
                  Agregar Educación
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Experience Section */}
          <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Experiencia Laboral</h3>
            
            {/* Added Experience List */}
            {userData.experiencia && userData.experiencia.length > 0 && (
              <div className="mb-4 space-y-3">
                {userData.experiencia.map((exp: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{exp.puesto}</h4>
                      <p className="text-gray-600 text-sm">{exp.empresa}</p>
                      <p className="text-gray-500 text-xs">
                        {exp.fecha_inicio} - {exp.fecha_fin || 'Presente'}
                      </p>
                      {exp.descripcion && (
                        <p className="text-gray-700 text-sm mt-1">{exp.descripcion}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add Experience Form */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="empresa"
                  name="empresa"
                  type="text"
                  label="Empresa"
                  placeholder="Nombre de la empresa"
                  value={newExperience.empresa}
                  onChange={handleExperienceChange}
                />
                
                <Input
                  id="puesto"
                  name="puesto"
                  type="text"
                  label="Puesto"
                  placeholder="Ej. Desarrollador Web"
                  value={newExperience.puesto}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div>
                <label htmlFor="descripcion_exp" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del puesto
                </label>
                <textarea
                  id="descripcion_exp"
                  name="descripcion"
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
                  placeholder="Describe brevemente tus responsabilidades..."
                  value={newExperience.descripcion}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="fecha_inicio_exp"
                  name="fecha_inicio"
                  type="text"
                  label="Fecha de inicio"
                  placeholder="Ej. Enero 2020"
                  value={newExperience.fecha_inicio}
                  onChange={handleExperienceChange}
                />
                
                <Input
                  id="fecha_fin_exp"
                  name="fecha_fin"
                  type="text"
                  label="Fecha de fin (o 'Presente')"
                  placeholder="Ej. Diciembre 2022 o Presente"
                  value={newExperience.fecha_fin}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addExperience}
                >
                  Agregar Experiencia
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Habilidades</h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {userData.skills && userData.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center group"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex">
              <Input
                id="skill"
                name="skill"
                type="text"
                placeholder="Añade una habilidad y presiona Enter"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyPress={handleKeyPress}
                className="flex-grow"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addSkill}
                className="ml-2 whitespace-nowrap"
              >
                Añadir
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Error message */}
        {error && (
          <motion.div 
            className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </motion.div>
        )}
        
        {/* Action buttons */}
        <motion.div 
          className="mt-6 flex justify-between"
          variants={itemVariants}
        >
          <div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
            >
              Atrás
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={skipStep}
            >
              Saltar por ahora
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </div>
              ) : 'Continuar'}
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Step2FillInfo;