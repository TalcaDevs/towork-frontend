import React from 'react';
import { motion } from 'framer-motion';
import Input from '../../Input';

interface BasicInfoFormProps {
  userData: {
    descripcion: string;
    telefono: string;
    ubicacion: string;
    linkedin: string;
    id_portafolio_web: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ 
  userData, 
  handleChange 
}) => {
  // Animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Básica</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción / Biografía
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
            placeholder="Cuéntanos brevemente sobre ti y tu experiencia profesional..."
            value={userData.descripcion || ''}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            label="Teléfono"
            placeholder="+529 1234 5678"
            value={userData.telefono || ''}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Input
            id="ubicacion"
            name="ubicacion"
            type="text"
            label="Ubicación"
            placeholder="Ciudad, País"
            value={userData.ubicacion || ''}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/tu-usuario"
            value={userData.linkedin || ''}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Input
            id="id_portafolio_web"
            name="id_portafolio_web"
            type="url"
            label="Sitio Web / Portafolio"
            placeholder="https://tu-sitio-web.com"
            value={userData.id_portafolio_web || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInfoForm;