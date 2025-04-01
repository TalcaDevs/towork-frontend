import React from "react";
import { motion } from "framer-motion";
import SearchInput from "../SearchInput";
import StarPurple from "../../assets/icons/StarPurpleIcon";
import StarBlue from "../../assets/icons/StarBlueIcon";

interface PopularJobCategoryProps {
  label: string;
  index: number;
}

const PopularJobCategory: React.FC<PopularJobCategoryProps> = ({ label, index }) => {
  return (
    <motion.div 
      className="bg-blue-100 rounded-full border-2 border-blue-200 text-black px-4 py-2 text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.8 + (index * 0.1),
        ease: "easeOut" 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const categories = [
    "Tecnología", 
    "Comercio Electrónico", 
    "Salud y Bienestar", 
    "Desarrollo"
  ];

  return (
    <section className="bg-[#f6f7f9] py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="bg-blue-100 rounded-2xl px-6 py-10 md:p-12 lg:p-16 shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.button 
                  className="text-black bg-white rounded-full border-2 border-blue-200 px-4 py-2 text-sm font-bold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Comienza Gratis
                </motion.button>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Modernizando la
                <div className="flex items-center space-x-2 my-2">
                  <motion.span 
                    className="text-blue-500 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Búsqueda
                    <motion.span 
                      className="absolute -left-4 -top-4 hidden sm:block"
                      animate={{ 
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1, 1.1, 1]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                    >
                      <StarBlue />
                    </motion.span>
                  </motion.span>
                  <span>de Empleo</span>
                </div>
                <motion.span 
                  className="text-indigo-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Profesional
                </motion.span>
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ 
                    rotate: [0, -10, 0, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <StarPurple />
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-gray-700 mb-8 text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span className="font-semibold">12.548 Empleos Publicados!</span> La forma más rápida y conforme a la
                ley para descubrir, contratar y gestionar talento freelance.
              </motion.p>

              <motion.div 
                className="mb-8 w-full max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <SearchInput
                  placeholder="Busca tu trabajo ideal..."
                  buttonText="Buscar"
                  onSearch={(query) => {
                    console.log("Búsqueda realizada:", query);
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-gray-700 font-medium mb-3">Categorías Populares:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <PopularJobCategory 
                      key={index} 
                      label={category} 
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <div className="relative max-w-md mx-auto">
                <motion.div 
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src="/professional.svg"
                    alt="Profesional buscando trabajo"
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "images/img_hero.png";
                    }}
                  />
                </motion.div>

                {/* Floating icons with animation */}
                <motion.div 
                  className="absolute top-10 right-10 hidden md:block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    delay: 0.8,
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-10 right-0 hidden md:block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;