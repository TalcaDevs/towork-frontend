import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';
import Button from '../../Button';
import DateInput from '../../common/DateInput';
import { CertificationItem } from '../../../interfaces/signup.interface';

interface Certification {
  nombre: string;
  institucion: string;
  fecha_obtencion: string;
  url_certificado: string;
}

interface CertificationsFormProps {
    certifications: CertificationItem[];
    updateCertifications: (certifications: CertificationItem[]) => void;
  }

const CertificationsForm: React.FC<CertificationsFormProps> = ({ 
  certifications = [],
  updateCertifications
}) => {
  const [newCertification, setNewCertification] = useState<Certification>({
    nombre: '',
    institucion: '',
    fecha_obtencion: '',
    url_certificado: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
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
    
    if (!newCertification.nombre.trim()) {
      newErrors.nombre = 'El nombre de la certificación es requerido';
    }
    
    if (!newCertification.institucion.trim()) {
      newErrors.institucion = 'La institución es requerida';
    }
    
    if (!newCertification.fecha_obtencion) {
      newErrors.fecha_obtencion = 'La fecha de obtención es requerida';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(newCertification.fecha_obtencion)) {
      newErrors.fecha_obtencion = 'El formato debe ser YYYY-MM-DD';
    }
    
    // Validar que la URL tenga un formato correcto si se proporciona
    if (newCertification.url_certificado && 
        !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(newCertification.url_certificado)) {
      newErrors.url_certificado = 'Ingrese una URL válida';
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
      if (newCertification.nombre && newCertification.institucion) {
        const updatedCertifications = [...certifications, newCertification];
        updateCertifications(updatedCertifications);
      }
    }
    
    // Reset form
    setNewCertification({
      nombre: '',
      institucion: '',
      fecha_obtencion: '',
      url_certificado: ''
    });
  };
  
  const editCertification = (index: number) => {
    setNewCertification({
      ...certifications[index],
      url_certificado: certifications[index].url_certificado || ''
    });
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const cancelEdit = () => {
    setNewCertification({
      nombre: '',
      institucion: '',
      fecha_obtencion: '',
      url_certificado: ''
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
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Certificaciones</h3>
      
      {/* Lista de certificaciones */}
      {certifications.length > 0 && (
        <div className="mb-4 space-y-3">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{cert.nombre}</h4>
                <p className="text-gray-600 text-sm">{cert.institucion}</p>
                <p className="text-gray-500 text-xs">Obtenido el: {cert.fecha_obtencion}</p>
                {cert.url_certificado && (
                  <a 
                    href={cert.url_certificado} 
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
              id="nombre"
              name="nombre"
              type="text"
              label="Nombre de la certificación"
              placeholder="Ej. Scrum Master, AWS Solutions Architect"
              value={newCertification.nombre}
              onChange={handleCertificationChange}
              error={errors.nombre}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>
          
          <div>
            <Input
              id="institucion"
              name="institucion"
              type="text"
              label="Institución emisora"
              placeholder="Ej. Microsoft, AWS, Scrum Alliance"
              value={newCertification.institucion}
              onChange={handleCertificationChange}
              error={errors.institucion}
            />
            {errors.institucion && (
              <p className="text-red-500 text-xs mt-1">{errors.institucion}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DateInput
            id="fecha_obtencion"
            name="fecha_obtencion"
            label="Fecha de obtención"
            placeholder="YYYY-MM-DD"
            value={newCertification.fecha_obtencion}
            onChange={handleCertificationChange}
            required
            error={errors.fecha_obtencion}
          />
          
          <div>
            <Input
              id="url_certificado"
              name="url_certificado"
              type="url"
              label="URL del certificado (opcional)"
              placeholder="https://credenciales.com/certificado"
              value={newCertification.url_certificado}
              onChange={handleCertificationChange}
              error={errors.url_certificado}
            />
            {errors.url_certificado && (
              <p className="text-red-500 text-xs mt-1">{errors.url_certificado}</p>
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