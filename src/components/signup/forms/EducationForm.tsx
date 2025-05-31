import React, { useState } from 'react';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { EducationErrors, EducationFormProps, EducationItem } from '../../../interfaces/signup.interface';
import Title from '../../Title';

const EducationForm: React.FC<EducationFormProps> = ({
  educationItems = [],
  updateEducation,
  error,
}) => {
  const [newEducation, setNewEducation] = useState<EducationItem>({
    institution: '',
    degree: '',
    start_date: '',
    end_date: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<EducationErrors>({});

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value
    });

    if (errors[name as keyof EducationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!newEducation.institution.trim()) {
      newErrors.institution = 'La institución es requerida';
    }

    if (!newEducation.degree.trim()) {
      newErrors.degree = 'El título es requerido';
    }

    if (!newEducation.start_date) {
      newErrors.start_date = 'La fecha de inicio es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newEducation.start_date)) {
      newErrors.start_date = 'El formato debe ser YYYY-MM-DD';
    }

    if (newEducation.end_date && !/^\d{4}-\d{2}-\d{2}$/.test(newEducation.end_date)) {
      newErrors.end_date = 'El formato debe ser YYYY-MM-DD';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addEducation = () => {
    if (!validateForm()) return;

    if (isEditing && editIndex !== null) {
      const updatedItems = [...educationItems];
      updatedItems[editIndex] = newEducation;
      updateEducation(updatedItems);

      setIsEditing(false);
      setEditIndex(null);
    } else {
      const alreadyExists = educationItems.some(
        (item) =>
          item.institution === newEducation.institution &&
          item.degree === newEducation.degree &&
          item.start_date === newEducation.start_date &&
          item.end_date === newEducation.end_date
      );

      if (alreadyExists) return;

      const updatedEducation = [...educationItems, newEducation];
      updateEducation(updatedEducation);
    }

    setNewEducation({
      institution: '',
      degree: '',
      start_date: '',
      end_date: ''
    });
  };

  const editEducation = (index: number) => {
    setNewEducation({
      ...educationItems[index],
      end_date: educationItems[index].end_date || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setNewEducation({
      institution: '',
      degree: '',
      start_date: '',
      end_date: ''
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
    <div className="border-b border-gray-200 pb-6">

      <Title title="Educación" size="xs" weight="semibold" textAlign='left' margin='sm' color='secondary' />
      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      {educationItems.length > 0 && (
        <div className="mb-4 space-y-3">
          {educationItems.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
                <p className="text-gray-500 text-xs">
                  {edu.start_date} - {edu.end_date || 'Presente'}
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

      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700">
          {isEditing ? 'Editar Educación' : 'Agregar Nueva Educación'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            id="institution"
            name="institution"
            type="text"
            label="Institución"
            placeholder="Universidad o centro educativo"
            value={newEducation.institution}
            onChange={handleEducationChange}
            error={errors.institution}
            required={true}
          />

          <Input
            id="degree"
            name="degree"
            type="text"
            label="Título"
            placeholder="Grado obtenido"
            value={newEducation.degree}
            onChange={handleEducationChange}
            error={errors.degree}
            required={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DateInput
            id="start_date"
            name="start_date"
            label="Fecha de inicio"
            placeholder="YYYY-MM-DD"
            value={newEducation.start_date}
            onChange={handleEducationChange}
            required
            error={errors.start_date}
          />

          <DateInput
            id="end_date"
            name="end_date"
            label="Fecha de fin"
            placeholder="YYYY-MM-DD"
            value={newEducation.end_date || ''}
            onChange={handleEducationChange}
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
            onClick={addEducation}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Educación'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;