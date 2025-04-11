import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import { itemVariants } from '../../../utils/animation';

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
  error?: string;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills = [], updateSkills, error }) => {
  const [skillInput, setSkillInput] = useState('');
  
  // Manejar cambio en el input de habilidad
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };
  
  // Añadir habilidad
  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      updateSkills([...skills, trimmedSkill]);
      setSkillInput('');
    }
  };
  
  // Añadir habilidad con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };
  
  // Eliminar habilidad
  const removeSkill = (skill: string) => {
    updateSkills(skills.filter(item => item !== skill));
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Habilidades
      </h3>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600">Añade tus habilidades técnicas y blandas para destacar tus fortalezas.</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill, index) => (
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
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow"
          // Eliminamos la prop error aquí para que no muestre el mensaje de error
        />
        <button
          type="button"
          onClick={addSkill}
          className="ml-2 bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Añadir
        </button>
      </div>
      
      {skills.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">
          Ejemplo de habilidades: React, JavaScript, Trabajo en equipo, Comunicación efectiva...
        </p>
      )}
    </motion.div>
  );
};

export default SkillsForm;