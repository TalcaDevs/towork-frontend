import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import { ProjectItem } from '../../../interfaces/signup.interface';

interface Project {
  titulo: string;
  descripcion: string;
  herramientas_usadas: string;
  url_proyecto: string;
  imagen_proyecto: string;
}

interface ProjectsFormProps {
    projects: ProjectItem[];
    updateProjects: (projects: ProjectItem[]) => void;
  }

const ProjectsForm: React.FC<ProjectsFormProps> = ({ 
  projects = [],
  updateProjects
}) => {
  // Estado local para el nuevo proyecto
  const [newProject, setNewProject] = useState<Project>({
    titulo: '',
    descripcion: '',
    herramientas_usadas: '',
    url_proyecto: '',
    imagen_proyecto: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!newProject.titulo.trim()) {
      newErrors.titulo = 'El título del proyecto es requerido';
    }
    
    if (!newProject.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    
    // Validar que las URLs tengan un formato correcto si se proporcionan
    if (newProject.url_proyecto && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newProject.url_proyecto)) {
      newErrors.url_proyecto = 'Ingrese una URL válida';
    }
    
    if (newProject.imagen_proyecto && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newProject.imagen_proyecto)) {
      newErrors.imagen_proyecto = 'Ingrese una URL válida para la imagen';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const addProject = () => {
    if (!validateForm()) return;
    
    if (isEditing && editIndex !== null) {
      const updatedItems = [...projects];
      updatedItems[editIndex] = newProject;
      updateProjects(updatedItems);
      
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Añadir un nuevo ítem
      if (newProject.titulo && newProject.descripcion) {
        const updatedProjects = [...projects, newProject];
        updateProjects(updatedProjects);
      }
    }
    
    // Reset form
    setNewProject({
      titulo: '',
      descripcion: '',
      herramientas_usadas: '',
      url_proyecto: '',
      imagen_proyecto: ''
    });
  };
  
  const editProject = (index: number) => {
    setNewProject({
      ...projects[index],
      url_proyecto: projects[index].url_proyecto || '',
      imagen_proyecto: projects[index].imagen_proyecto || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewProject({
      titulo: '',
      descripcion: '',
      herramientas_usadas: '',
      url_proyecto: '',
      imagen_proyecto: ''
    });
    setIsEditing(false);
    setEditIndex(null);
    setErrors({});
  };
  
  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    updateProjects(updatedProjects);
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Proyectos</h3>
      
      {/* Lista de proyectos */}
      {projects.length > 0 && (
        <div className="mb-4 space-y-3">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{project.titulo}</h4>
                <p className="text-gray-700 text-sm my-1">{project.descripcion}</p>
                {project.herramientas_usadas && (
                  <p className="text-gray-600 text-xs"><span className="font-medium">Herramientas:</span> {project.herramientas_usadas}</p>
                )}
                <div className="flex space-x-4 mt-1">
                  {project.url_proyecto && (
                    <a 
                      href={project.url_proyecto} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 text-xs hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Ver proyecto
                    </a>
                  )}
                  {project.imagen_proyecto && (
                    <a 
                      href={project.imagen_proyecto} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 text-xs hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Ver imagen
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editProject(index)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700">
          {isEditing ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}
        </h4>
        
        <div>
          <Input
            id="titulo"
            name="titulo"
            type="text"
            label="Título del proyecto"
            placeholder="Ej. Sistema de Gestión de Inventario"
            value={newProject.titulo}
            onChange={handleProjectChange}
            error={errors.titulo}
          />
          {errors.titulo && (
            <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="descripcion_proyecto" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del proyecto
          </label>
          <textarea
            id="descripcion_proyecto"
            name="descripcion"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
            placeholder="Describe brevemente el proyecto y tus responsabilidades..."
            value={newProject.descripcion}
            onChange={handleProjectChange}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>
          )}
        </div>
        
        <div>
          <Input
            id="herramientas_usadas"
            name="herramientas_usadas"
            type="text"
            label="Herramientas y tecnologías usadas"
            placeholder="Ej. React, Node.js, MongoDB, Docker"
            value={newProject.herramientas_usadas}
            onChange={handleProjectChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="url_proyecto"
              name="url_proyecto"
              type="url"
              label="URL del proyecto (opcional)"
              placeholder="https://github.com/usuario/proyecto"
              value={newProject.url_proyecto}
              onChange={handleProjectChange}
              error={errors.url_proyecto}
            />
            {errors.url_proyecto && (
              <p className="text-red-500 text-xs mt-1">{errors.url_proyecto}</p>
            )}
          </div>
          
          <div>
            <Input
              id="imagen_proyecto"
              name="imagen_proyecto"
              type="url"
              label="URL de imagen del proyecto (opcional)"
              placeholder="https://ejemplo.com/captura.jpg"
              value={newProject.imagen_proyecto}
              onChange={handleProjectChange}
              error={errors.imagen_proyecto}
            />
            {errors.imagen_proyecto && (
              <p className="text-red-500 text-xs mt-1">{errors.imagen_proyecto}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={cancelEdit}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addProject}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Proyecto'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsForm;