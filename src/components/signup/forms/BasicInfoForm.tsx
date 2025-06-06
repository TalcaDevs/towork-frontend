  import React from 'react';
  import { motion } from 'framer-motion';
  import Input from '../../Input';
  import { itemVariants } from '../../../utils/animation';
  import { BasicInfoFormProps } from '../../../interfaces/signup.interface';
  import Title from '../../ui/Title';

  const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ userData, handleChange, errors = {} }) => {
    return (
      <motion.div variants={itemVariants} className="border-b border-gray-200 pb-6">
        <Title size="xs" weight="semibold" textAlign='left' margin='sm' color='secondary'>
          Información Básica
        </Title>
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción / Biografía <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Cuéntanos brevemente sobre ti y tu experiencia profesional..."
              value={userData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          <div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Teléfono"
              placeholder="+569 23 456 789"
              value={userData.phone}
              onChange={handleChange}
              error={errors.phone}
              required={true}
            />
          </div>
          
          <div>
            <Input
              id="location"
              name="location"
              type="text"
              label="Ubicación"
              placeholder="Ciudad, País"
              value={userData.location}
              onChange={handleChange}
              error={errors.location}
              required={true}
            />
          </div>
          
          <div>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              label="LinkedIn"
              placeholder="https://linkedin.com/in/tu-usuario"
              value={userData.linkedin}
              onChange={handleChange}
              error={errors.linkedin}
            />
          </div>
          
          <div>
            <Input
              id="portfolio_url"
              name="portfolio_url"
              type="url"
              label="Sitio Web / Portafolio"
              placeholder="https://tu-sitio-web.com"
              value={userData.portfolio_url}
              onChange={handleChange}
              error={errors.portfolio_url}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  export default BasicInfoForm;