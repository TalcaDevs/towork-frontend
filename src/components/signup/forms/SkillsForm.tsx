import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ 
  skills = [],
  updateSkills
}) => {
  // Estado local para el input de habilidades
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Manejadores
  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
    if (error) setError('');
  };
  
  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    
    if (!trimmedSkill) {
      setError('La habilidad no puede estar vacía');
      return;
    }
    
    if (skills.includes(trimmedSkill) && !isEditing) {
      setError('Esta habilidad ya está en la lista');
      return;
    }
    
    if (isEditing && editIndex !== null) {
      // Actualizar una habilidad existente
      const updatedSkills = [...skills];
      updatedSkills[editIndex] = trimmedSkill;
      updateSkills(updatedSkills);
      
      // Resetear estado de edición
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Añadir una nueva habilidad
      if (trimmedSkill && !skills.includes(trimmedSkill)) {
        const updatedSkills = [...skills, trimmedSkill];
        updateSkills(updatedSkills);
      }
    }
    
    setSkillInput('');
    setError('');
  };
  
  const editSkill = (index: number) => {
    setSkillInput(skills[index]);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setSkillInput('');
    setIsEditing(false);
    setEditIndex(null);
    setError('');
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateSkills(updatedSkills);
  };
  
  // Handle keypress para añadir skills con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };
  
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Habilidades</h3>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center group"
          >
            {skill}
            <div className="ml-2 flex items-center space-x-1">
              <button
                type="button"
                onClick={() => editSkill(index)}
                className="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Editar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <div className="flex-grow">
          <Input
            id="skill"
            name="skill"
            type="text"
            label={isEditing ? "Editar habilidad" : "Añadir habilidad"}
            placeholder="Añade una habilidad y presiona Enter"
            value={skillInput}
            onChange={handleSkillInputChange}
            onKeyPress={handleKeyPress}
            error={error}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}
        </div>
        
        <div className="flex items-end space-x-2">
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={cancelEdit}
              className="mb-0"
            >
              Cancelar
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addSkill}
            className="mb-0"
          >
            {isEditing ? 'Actualizar' : 'Añadir'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsForm;