import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { CertificationItem, CertificationsFormProps } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';
import Title from '../../Title';

const CertificationsForm: React.FC<CertificationsFormProps> = ({ 
  certifications = [],
  updateCertifications
}) => {
  const [newCertification, setNewCertification] = useState<CertificationItem>({
    name: '',
    institution: '',
    date_obtained: '',
    certificate_url: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleCertificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertification({
      ...newCertification,
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
    
    if (!newCertification.name.trim()) {
      newErrors.name = 'El nombre de la certificación es requerido';
    }
    
    if (!newCertification.institution.trim()) {
      newErrors.institution = 'La institución es requerida';
    }
    
    if (!newCertification.date_obtained) {
      newErrors.date_obtained = 'La fecha de obtención es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newCertification.date_obtained)) {
      newErrors.date_obtained = 'El formato debe ser YYYY-MM-DD';
    }
    
    // Validar que la URL tenga un formato correcto si se proporciona
    if (newCertification.certificate_url && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newCertification.certificate_url)) {
      newErrors.certificate_url = 'Ingrese una URL válida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const addCertification = () => {
    if (!validateForm()) return;
    
    if (isEditing && editIndex !== null) {
      // Actualizar un ítem existente
      const updatedItems = [...certifications];
      updatedItems[editIndex] = newCertification;
      updateCertifications(updatedItems);
      
      // Resetear el estado de edición
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Añadir un nuevo ítem
      if (newCertification.name && newCertification.institution) {
        const updatedCertifications = [...certifications, newCertification];
        updateCertifications(updatedCertifications);
      }
    }
    
    // Reset form
    setNewCertification({
      name: '',
      institution: '',
      date_obtained: '',
      certificate_url: ''
    });
  };
  
  const editCertification = (index: number) => {
    setNewCertification({
      ...certifications[index],
      certificate_url: certifications[index].certificate_url || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewCertification({
      name: '',
      institution: '',
      date_obtained: '',
      certificate_url: ''
    });
    setIsEditing(false);
    setEditIndex(null);
    setErrors({});
  };
  
  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    updateCertifications(updatedCertifications);
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <Title title="Certificaciones" size="xs" weight="semibold" textAlign='left' margin='sm' color='secondary'/>
      
      {/* Lista de certificaciones */}
      {certifications.length > 0 && (
        <div className="mb-4 space-y-3">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{cert.name}</h4>
                <p className="text-gray-600 text-sm">{cert.institution}</p>
                <p className="text-gray-500 text-xs">Obtenido el: {cert.date_obtained}</p>
                {cert.certificate_url && (
                  <a 
                    href={cert.certificate_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Ver certificado
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editCertification(index)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
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
      
      {/* Formulario para añadir certificación */}
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700">
          {isEditing ? 'Editar Certificación' : 'Agregar Nueva Certificación'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              id="name"
              name="name"
              type="text"
              label="Nombre de la certificación"
              placeholder="Ej. Scrum Master, AWS Solutions Architect"
              value={newCertification.name}
              onChange={handleCertificationChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <Input
              id="institution"
              name="institution"
              type="text"
              label="Institución emisora"
              placeholder="Ej. Microsoft, AWS, Scrum Alliance"
              value={newCertification.institution}
              onChange={handleCertificationChange}
            />
            {errors.institution && (
              <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DateInput
            id="date_obtained"
            name="date_obtained"
            label="Fecha de obtención"
            placeholder="YYYY-MM-DD"
            value={newCertification.date_obtained}
            onChange={handleCertificationChange}
            required
            error={errors.date_obtained}
          />
          
          <div>
            <Input
              id="certificate_url"
              name="certificate_url"
              type="url"
              label="URL del certificado (opcional)"
              placeholder="https://credenciales.com/certificado"
              value={newCertification.certificate_url || ''}
              onChange={handleCertificationChange}
              error={errors.certificate_url}
            />
            {errors.certificate_url && (
              <p className="text-red-500 text-xs mt-1">{errors.certificate_url}</p>
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
            onClick={addCertification}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar Certificación'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationsForm;