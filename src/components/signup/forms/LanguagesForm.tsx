import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from "../../buttons/Button";
import { LanguageItem, LanguagesFormProps } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';
import { languageLevels } from '../../../data/constant';

const LanguagesForm: React.FC<LanguagesFormProps> = ({ 
  languages = [],
  updateLanguages
}) => {
  const [newLanguage, setNewLanguage] = useState<LanguageItem>({
    language: {
      name: ''
    },
    level: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setNewLanguage({
        ...newLanguage,
        language: {
          name: value
        }
      });
    } else if (name === 'level') {
      setNewLanguage({
        ...newLanguage,
        level: value
      });
    }
    
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
    
    if (!newLanguage.language.name.trim()) {
      newErrors.name = 'El nombre del idioma es requerido';
    }
    
    if (!newLanguage.level) {
      newErrors.level = 'El nivel es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const addLanguage = () => {
    if (!validateForm()) return;
    
    if (isEditing && editIndex !== null) {
      const updatedItems = [...languages];
      updatedItems[editIndex] = newLanguage;
      updateLanguages(updatedItems);
      
      setIsEditing(false);
      setEditIndex(null);
    } else {
      if (newLanguage.language.name && newLanguage.level) {
        const updatedLanguages = [...languages, newLanguage];
        updateLanguages(updatedLanguages);
      }
    }
    
    setNewLanguage({
      language: {
        name: ''
      },
      level: ''
    });
  };
  
  const editLanguage = (index: number) => {
    setNewLanguage(languages[index]);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewLanguage({
      language: {
        name: ''
      },
      level: ''
    });
    setIsEditing(false);
    setEditIndex(null);
    setErrors({});
  };
  
  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    updateLanguages(updatedLanguages);
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Idiomas</h3>
      
      {/* Lista de idiomas */}
      {languages.length > 0 && (
        <div className="mb-4 space-y-3">
          {languages.map((lang, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{lang.language.name}</h4>
                <p className="text-gray-600 text-sm">Nivel: {lang.level}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editLanguage(index)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
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
          {isEditing ? 'Editar Idioma' : 'Agregar Nuevo Idioma'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="name"
              name="name"
              type="text"
              label="Idioma"
              placeholder="Ej. Inglés, Francés, Español"
              value={newLanguage.language.name}
              onChange={handleLanguageChange}
              error={errors.name}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Nivel <span className="text-red-500">*</span>
            </label>
            <select
              id="level"
              name="level"
              value={newLanguage.level}
              onChange={handleLanguageChange}
              className={`w-full px-3 py-2 border ${
                errors.level ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            >
              <option value="">Selecciona un nivel</option>
              {languageLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.level && (
              <p className="text-red-500 text-xs mt-1">{errors.level}</p>
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
            onClick={addLanguage}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Idioma'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguagesForm;