import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import { ProjectItem, ProjectsFormProps } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';

const ProjectsForm: React.FC<ProjectsFormProps> = ({ 
  projects = [],
  updateProjects
}) => {
  const [newProject, setNewProject] = useState<ProjectItem>({
    title: '',
    description: '',
    tools_used: '',
    project_url: '',
    project_image: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  
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
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!newProject.title.trim()) {
      newErrors.title = 'El título del proyecto es requerido';
    }
    
    if (!newProject.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (newProject.project_url && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newProject.project_url)) {
      newErrors.project_url = 'Ingrese una URL válida';
    }
    
    if (newProject.project_image && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newProject.project_image)) {
      newErrors.project_image = 'Ingrese una URL válida para la imagen';
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
      if (newProject.title && newProject.description) {
        const updatedProjects = [...projects, newProject];
        updateProjects(updatedProjects);
      }
    }
    
    setNewProject({
      title: '',
      description: '',
      tools_used: '',
      project_url: '',
      project_image: ''
    });
  };
  
  const editProject = (index: number) => {
    setNewProject({
      ...projects[index],
      project_url: projects[index].project_url || '',
      project_image: projects[index].project_image || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewProject({
      title: '',
      description: '',
      tools_used: '',
      project_url: '',
      project_image: ''
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
                <h4 className="font-medium text-gray-800">{project.title}</h4>
                <p className="text-gray-700 text-sm my-1">{project.description}</p>
                {project.tools_used && (
                  <p className="text-gray-600 text-xs"><span className="font-medium">Herramientas:</span> {project.tools_used}</p>
                )}
                <div className="flex space-x-4 mt-1">
                  {project.project_url && (
                    <a 
                      href={project.project_url} 
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
                  {project.project_image && (
                    <a 
                      href={project.project_image} 
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
            id="title"
            name="title"
            type="text"
            label="Título del proyecto"
            placeholder="Ej. Sistema de Gestión de Inventario"
            value={newProject.title}
            onChange={handleProjectChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del proyecto
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
            placeholder="Describe brevemente el proyecto y tus responsabilidades..."
            value={newProject.description}
            onChange={handleProjectChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        
        <div>
          <Input
            id="tools_used"
            name="tools_used"
            type="text"
            label="Herramientas y tecnologías usadas"
            placeholder="Ej. React, Node.js, MongoDB, Docker"
            value={newProject.tools_used}
            onChange={handleProjectChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="project_url"
              name="project_url"
              type="url"
              label="URL del proyecto (opcional)"
              placeholder="https://github.com/usuario/proyecto"
              value={newProject.project_url || ''}
              onChange={handleProjectChange}
              error={errors.project_url}
            />
            {errors.project_url && (
              <p className="text-red-500 text-xs mt-1">{errors.project_url}</p>
            )}
          </div>
          
          <div>
            <Input
              id="project_image"
              name="project_image"
              type="url"
              label="URL de imagen del proyecto (opcional)"
              placeholder="https://ejemplo.com/captura.jpg"
              value={newProject.project_image || ''}
              onChange={handleProjectChange}
              error={errors.project_image}
            />
            {errors.project_image && (
              <p className="text-red-500 text-xs mt-1">{errors.project_image}</p>
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