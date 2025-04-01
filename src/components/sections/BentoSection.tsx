import React from "react";
import { motion } from "framer-motion";
import { JobCategoryProps } from "../../interfaces/jobCategory.interface";
import ArrowUpRightIcon from "../../assets/icons/ArrowUpRightIcon";
import LightbulbIcon from "../../assets/icons/LightbulbIcon";
import PackageIcon from "../../assets/icons/PackageIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import PrinterIcon from "../../assets/icons/PrinterIcon";

const JobCategory: React.FC<JobCategoryProps & { index: number }> = ({
  title,
  description,
  icon,
  jobCount,
  isLarge = false,
  imagePath,
  index
}) => {
  return (
    <motion.div
      className="bg-white backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 relative h-full transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2 + (index * 0.1), 
        ease: "easeOut" 
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start">
        <motion.div 
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
        >
          {icon}
        </motion.div>
        <motion.button 
          className="p-2 md:p-3 bg-blue-300 rounded-full hover:bg-blue-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label="Ver categoría"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRightIcon className="text-black" />
        </motion.button>
      </div>

      <motion.h3 
        className="text-xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 mb-6 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        className="text-blue-500 font-medium flex items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
      >
        <span className="text-lg mr-1 text-black font-bold">•</span>{" "}
        <div className="text-black font-bold">
          {jobCount} Empleos Disponibles
        </div>
      </motion.div>

      {isLarge && imagePath && (
        <motion.div 
          className="flex justify-end mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div 
            className="w-64 h-64 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"  
            }}
          >
            <img
              src={imagePath}
              alt={`Ilustración para ${title}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error("Error cargando imagen:", imagePath);
                target.style.display = "none";
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

const JobCategories: React.FC = () => {
  const developmentImagePath = "images/img_bento.png";

  const categories = [
    {
      title: "Diseño y Desarrollo",
      description:
        "Encuentra oportunidades laborales en el ámbito de diseño y desarrollo. Conecta con empresas que buscan talento en programación y experiencia de usuario.",
      icon: <div className="p-3 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M16 18l6-6-6-6"></path>
                <path d="M8 6l-6 6 6 6"></path>
              </svg>
            </div>,
      jobCount: 49,
      customIcons: true,
      imagePath: developmentImagePath,
    },
    {
      title: "Negocios y Consultoría",
      description:
        "Explora puestos en consultoría de negocios, gestión de proyectos y asesoramiento empresarial.",
      icon: (
        <div className="p-3 bg-blue-100 rounded-full">
          <LightbulbIcon />
        </div>
      ),
      jobCount: 37,
    },
    {
      title: "Operaciones y Producción",
      description:
        "Vacantes para profesionales de cadena de suministro, producción industrial y control de calidad.",
      icon: (
        <div className="p-3 bg-blue-100 rounded-full">
          <PackageIcon />
        </div>
      ),
      jobCount: 42,
    },
    {
      title: "Educación y Formación",
      description:
        "Oportunidades para docentes, formadores y especialistas en educación y capacitación profesional.",
      icon: (
        <div className="p-3 bg-blue-100 rounded-full">
          <FileTextIcon />
        </div>
      ),
      jobCount: 28,
    },
    {
      title: "Marketing y Ventas",
      description:
        "Posiciones disponibles en marketing digital, ventas, relaciones públicas y gestión comercial.",
      icon: (
        <div className="p-3 bg-blue-100 rounded-full">
          <PrinterIcon />
        </div>
      ),
      jobCount: 45,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f6f7f9]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Categorías Populares de Empleo
            </motion.h2>
            <motion.button 
              className="flex items-center gap-2 text-black bg-blue-300 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-blue-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar
              <ArrowUpRightIcon />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div className="lg:col-span-5 lg:row-span-2">
              <JobCategory
                key={0}
                index={0}
                title={categories[0].title}
                description={categories[0].description}
                icon={categories[0].icon}
                jobCount={categories[0].jobCount}
                isLarge={true}
                imagePath={categories[0].imagePath}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:col-span-7">  
              {categories.slice(1).map((category, index) => (
                <JobCategory
                  key={index + 1}
                  index={index + 1}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  jobCount={category.jobCount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;