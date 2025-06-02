import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, containerVariants } from '../../utils/animation';
import { features } from '../../data/featureShowCase';


const FeatureShowcase: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 relative p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565328240088-1cdad16d123a?q=80&w=1000&auto=format&fit=crop" 
          alt="Office background" 
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/80 to-slate-900/90"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Potencia tu carrera profesional
          </motion.h2>
          <motion.p 
            className="text-blue-200 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Únete a nuestra plataforma y accede a las mejores oportunidades laborales
          </motion.p>
        </motion.div>

        <motion.ul 
          className="space-y-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="mt-1 bg-blue-500 p-2 rounded-full mr-4">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div 
          className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" 
              alt="User profile" 
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div>
              <h4 className="text-white font-medium">Ana Rodríguez</h4>
              <p className="text-slate-300 text-xs">Diseñadora UX/UI @ Adobe</p>
            </div>
          </div>
          <p className="text-slate-100 text-sm italic">
            "Gracias a ToWork encontré mi trabajo ideal en menos de un mes. La plataforma es intuitiva y los reclutadores responden rápidamente."
          </p>
        </motion.div>

        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 rounded-full -ml-24 -mb-24"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default FeatureShowcase;