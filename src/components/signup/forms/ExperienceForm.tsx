import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { ExperienceItem } from '../../../interfaces/signup.interface';

interface ExperienceFormProps {
  experienceItems: ExperienceItem[];
  updateExperience: (experience: ExperienceItem[]) => void;
  error?: string; 
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  experienceItems = [],
  updateExperience
}) => {
  const [newExperience, setNewExperience] = useState<ExperienceItem>({
    empresa: '',
    puesto: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
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
    
    if (!newExperience.empresa.trim()) {
      newErrors.empresa = 'La empresa es requerida';
    }
    
    if (!newExperience.puesto.trim()) {
      newErrors.puesto = 'El puesto es requerido';
    }
    
    if (!newExperience.fecha_inicio) {
      newErrors.fecha_inicio = 'La fecha de inicio es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newExperience.fecha_inicio)) {
      newErrors.fecha_inicio = 'El formato debe ser YYYY-MM-DD';
    }
    
    if (newExperience.fecha_fin && !/^\d{4}-\d{2}-\d{2}$/.test(newExperience.fecha_fin)) {
      newErrors.fecha_fin = 'El formato debe ser YYYY-MM-DD';
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
      if (newExperience.empresa && newExperience.puesto) {
        const updatedExperience = [...experienceItems, newExperience];
        updateExperience(updatedExperience);
      }
    }
    
    setNewExperience({
      empresa: '',
      puesto: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: ''
    });
  };
  
  const editExperience = (index: number) => {
    setNewExperience(experienceItems[index]);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewExperience({
      empresa: '',
      puesto: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: ''
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
                <h4 className="font-medium text-gray-800">{exp.puesto}</h4>
                <p className="text-gray-600 text-sm">{exp.empresa}</p>
                <p className="text-gray-500 text-xs">
                  {exp.fecha_inicio} - {exp.fecha_fin || 'Presente'}
                </p>
                {exp.descripcion && (
                  <p className="text-gray-700 text-sm mt-1">{exp.descripcion}</p>
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
              id="empresa"
              name="empresa"
              type="text"
              label="Empresa"
              placeholder="Nombre de la empresa"
              value={newExperience.empresa}
              onChange={handleExperienceChange}
              error={errors.empresa}
            />
            {errors.empresa && (
              <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>
            )}
          </div>
          
          <div>
            <Input
              id="puesto"
              name="puesto"
              type="text"
              label="Puesto"
              placeholder="Ej. Desarrollador Web"
              value={newExperience.puesto}
              onChange={handleExperienceChange}
              error={errors.puesto}
            />
            {errors.puesto && (
              <p className="text-red-500 text-xs mt-1">{errors.puesto}</p>
            )}
          </div>
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
          <DateInput
            id="fecha_inicio_exp"
            name="fecha_inicio"
            label="Fecha de inicio"
            placeholder="YYYY-MM-DD"
            value={newExperience.fecha_inicio}
            onChange={handleExperienceChange}
            required
            error={errors.fecha_inicio}
          />
          
          <DateInput
            id="fecha_fin_exp"
            name="fecha_fin"
            label="Fecha de fin (o dejar en blanco si es actual)"
            placeholder="YYYY-MM-DD"
            value={newExperience.fecha_fin || ''}
            onChange={handleExperienceChange}
            error={errors.fecha_fin}
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