import React from 'react';
import { motion } from 'framer-motion';
import { UserRegistrationData } from '../../../interfaces/signup.interface';
import { itemVariants } from '../../../utils/animation';

interface ProfileSummaryProps {
  userData: UserRegistrationData;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ userData }) => {
  return (
    <motion.div
      className="mt-12 bg-gray-50 p-6 rounded-lg shadow-sm max-w-md w-full"
      variants={itemVariants}
    >
      <h3 className="font-semibold text-gray-800 mb-4 text-left">Resumen de tu perfil:</h3>
      
      <div className="space-y-3 text-left">
        <div>
          <span className="text-gray-600 text-sm">Nombre:</span>
          <p className="font-medium text-gray-800">{userData.first_name} {userData.last_name}</p>
        </div>
        
        <div>
          <span className="text-gray-600 text-sm">Email:</span>
          <p className="font-medium text-gray-800">{userData.email}</p>
        </div>
        
        {userData.ubicacion && (
          <div>
            <span className="text-gray-600 text-sm">Ubicación:</span>
            <p className="font-medium text-gray-800">{userData.ubicacion}</p>
          </div>
        )}
        
        {userData.skills && userData.skills.length > 0 && (
          <div>
            <span className="text-gray-600 text-sm">Habilidades principales:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {userData.skills.slice(0, 3).map((skill: string, index: number) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {userData.skills.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{userData.skills.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}
        
        {userData.templateId && (
          <div>
            <span className="text-gray-600 text-sm">Plantilla seleccionada:</span>
            <p className="font-medium text-gray-800 capitalize">{userData.templateId}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileSummary;