import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { EducationItem } from '../../../interfaces/signup.interface';

interface EducationFormProps {
  educationItems: EducationItem[];
  updateEducation: (education: any[]) => void;
  error?: string; // Añade esta propiedad opcional
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  educationItems = [],
  updateEducation,
}) => {
  // Estado local para el nuevo ítem de educación
  const [newEducation, setNewEducation] = useState<EducationItem>({
    institucion: '',
    titulo: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  
  // Estado para manejar la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Manejadores
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value
    });
    
    // Limpiar errores cuando el usuario corrige
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
    
    if (!newEducation.institucion.trim()) {
      newErrors.institucion = 'La institución es requerida';
    }
    
    if (!newEducation.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    
    if (!newEducation.fecha_inicio) {
      newErrors.fecha_inicio = 'La fecha de inicio es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newEducation.fecha_inicio)) {
      newErrors.fecha_inicio = 'El formato debe ser YYYY-MM-DD';
    }
    
    if (newEducation.fecha_fin && !/^\d{4}-\d{2}-\d{2}$/.test(newEducation.fecha_fin)) {
      newErrors.fecha_fin = 'El formato debe ser YYYY-MM-DD';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const addEducation = () => {
    if (!validateForm()) return;
    
    if (isEditing && editIndex !== null) {
      // Actualizar un ítem existente
      const updatedItems = [...educationItems];
      updatedItems[editIndex] = newEducation;
      updateEducation(updatedItems);
      
      // Resetear el estado de edición
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Añadir un nuevo ítem
      if (newEducation.institucion && newEducation.titulo) {
        const updatedEducation = [...educationItems, newEducation];
        updateEducation(updatedEducation);
      }
    }
    
    // Reset form
    setNewEducation({
      institucion: '',
      titulo: '',
      fecha_inicio: '',
      fecha_fin: ''
    });
  };
  
  const editEducation = (index: number) => {
    setNewEducation(educationItems[index]);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewEducation({
      institucion: '',
      titulo: '',
      fecha_inicio: '',
      fecha_fin: ''
    });
    setIsEditing(false);
    setEditIndex(null);
    setErrors({});
  };
  
  const removeEducation = (index: number) => {
    const updatedEducation = educationItems.filter((_, i) => i !== index);
    updateEducation(updatedEducation);
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Educación</h3>
      
      {/* Lista de educación */}
      {educationItems.length > 0 && (
        <div className="mb-4 space-y-3">
          {educationItems.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{edu.titulo}</h4>
                <p className="text-gray-600 text-sm">{edu.institucion}</p>
                <p className="text-gray-500 text-xs">
                  {edu.fecha_inicio} - {edu.fecha_fin || 'Presente'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editEducation(index)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
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
      
      {/* Formulario para añadir educación */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700">
          {isEditing ? 'Editar Educación' : 'Agregar Nueva Educación'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="institucion"
              name="institucion"
              type="text"
              label="Institución"
              placeholder="Universidad o centro educativo"
              value={newEducation.institucion}
              onChange={handleEducationChange}
              error={errors.institucion}
            />
            {errors.institucion && (
              <p className="text-red-500 text-xs mt-1">{errors.institucion}</p>
            )}
          </div>
          
          <div>
            <Input
              id="titulo"
              name="titulo"
              type="text"
              label="Título"
              placeholder="Grado obtenido"
              value={newEducation.titulo}
              onChange={handleEducationChange}
              error={errors.titulo}
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DateInput
            id="fecha_inicio"
            name="fecha_inicio"
            label="Fecha de inicio"
            placeholder="YYYY-MM-DD"
            value={newEducation.fecha_inicio}
            onChange={handleEducationChange}
            required
            error={errors.fecha_inicio}
          />
          
          <DateInput
            id="fecha_fin"
            name="fecha_fin"
            label="Fecha de fin (o dejar en blanco si es actual)"
            placeholder="YYYY-MM-DD"
            value={newEducation.fecha_fin || ''}
            onChange={handleEducationChange}
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
            onClick={addEducation}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Educación'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationForm;