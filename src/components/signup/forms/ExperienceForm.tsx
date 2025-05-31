import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { ExperienceFormProps, ExperienceItem } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  experienceItems = [],
  updateExperience
}) => {
  const [newExperience, setNewExperience] = useState<ExperienceItem>({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
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
    
    if (!newExperience.company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }
    
    if (!newExperience.position.trim()) {
      newErrors.position = 'El cargo es requerido';
    }
    
    if (!newExperience.start_date) {
      newErrors.start_date = 'La fecha de inicio es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newExperience.start_date)) {
      newErrors.start_date = 'El formato debe ser YYYY-MM-DD';
    }
    
    if (newExperience.end_date && !/^\d{4}-\d{2}-\d{2}$/.test(newExperience.end_date)) {
      newErrors.end_date = 'El formato debe ser YYYY-MM-DD';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const addExperience = () => {
    if (!validateForm()) return;
    
    if (isEditing && editIndex !== null) {
      const updatedItems = [...experienceItems];
      updatedItems[editIndex] = newExperience;
      updateExperience(updatedItems);
      
      setIsEditing(false);
      setEditIndex(null);
    } else {
      if (newExperience.company && newExperience.position) {
        const updatedExperience = [...experienceItems, newExperience];
        updateExperience(updatedExperience);
      }
    }
    
    setNewExperience({
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: ''
    });
  };
  
  const editExperience = (index: number) => {
    setNewExperience({
      ...experienceItems[index],
      description: experienceItems[index].description || '',
      end_date: experienceItems[index].end_date || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewExperience({
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: ''
    });
    setIsEditing(false);
    setEditIndex(null);
    setErrors({});
  };
  
  const removeExperience = (index: number) => {
    const updatedExperience = experienceItems.filter((_, i) => i !== index);
    updateExperience(updatedExperience);
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Experiencia Laboral</h3>
      
      {/* Lista de experiencia */}
      {experienceItems.length > 0 && (
        <div className="mb-4 space-y-3">
          {experienceItems.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{exp.position}</h4>
                <p className="text-gray-600 text-sm">{exp.company}</p>
                <p className="text-gray-500 text-xs">
                  {exp.start_date} - {exp.end_date || 'Presente'}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editExperience(index)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
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
      
      {/* Formulario para añadir experiencia */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700">
          {isEditing ? 'Editar Experiencia' : 'Agregar Nueva Experiencia'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="company"
              name="company"
              type="text"
              label="Empresa"
              placeholder="Nombre de la empresa"
              value={newExperience.company}
              onChange={handleExperienceChange}
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">{errors.company}</p>
            )}
          </div>
          
          <div>
            <Input
              id="position"
              name="position"
              type="text"
              label="Cargo"
              placeholder="Ej. Desarrollador Web"
              value={newExperience.position}
              onChange={handleExperienceChange}
            />
            {errors.position && (
              <p className="text-red-500 text-xs mt-1">{errors.position}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del cargo
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
            placeholder="Describe brevemente tus responsabilidades..."
            value={newExperience.description || ''}
            onChange={handleExperienceChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DateInput
            id="start_date"
            name="start_date"
            label="Fecha de inicio"
            placeholder="YYYY-MM-DD"
            value={newExperience.start_date}
            onChange={handleExperienceChange}
            required
            error={errors.start_date}
          />
          
          <DateInput
            id="end_date"
            name="end_date"
            label="Fecha de fin (o dejar en blanco si es actual)"
            placeholder="YYYY-MM-DD"
            value={newExperience.end_date || ''}
            onChange={handleExperienceChange}
            error={errors.end_date}
          />
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
            onClick={addExperience}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Experiencia'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceForm;