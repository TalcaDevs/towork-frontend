import React from 'react';

// Añadiendo la fuente Poppins
// Nota: En un proyecto real, esto se haría en un archivo global o en _app.tsx/document.tsx
// Esta es solo una representación para el componente aislado
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
`;

interface JobCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  jobCount: number;
  isLarge?: boolean;
  imagePath?: string;
}

// Simple arrow icon component using SVG
const ArrowUpRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

// Simple icon components using SVG
const LightbulbIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 18h6M10 22h4M12 2v5M4.9 4.9l3.53 3.53M2 12h5M4.9 19.1l3.53-3.53M19.1 4.9l-3.53 3.53M22 12h-5M19.1 19.1l-3.53-3.53"/>
    <path d="M12 8a4 4 0 0 1 4 4 4.1 4.1 0 0 1-1.05 2.75A4 4 0 0 1 12 16a4 4 0 0 1-2.95-1.25A4.1 4.1 0 0 1 8 12a4 4 0 0 1 4-4Z"/>
  </svg>
);

const PackageIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
    <polyline points="2.32 6.16 12 11 21.68 6.16" />
    <line x1="12" y1="22.76" x2="12" y2="11" />
  </svg>
);

const FileTextIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const PrinterIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
);

const JobCategory: React.FC<JobCategoryProps> = ({ title, description, icon, jobCount, isLarge = false, imagePath }) => {
  return (
    <div className="bg-[#f6f7f9] backdrop-blur-sm p-6 rounded-xl relative h-full border-10 border-white bg-opacity-10">
      <div className="flex justify-between items-start">
        <div className="mb-6">
          {icon}
        </div>
        <button className="p-3 bg-[#f6f7f9] rounded-full hover:bg-blue-200 transition-colors">
          <ArrowUpRightIcon className="text-blue-500" />
        </button>
      </div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <div className="text-blue-500 font-medium flex items-center">
        <span className="text-lg mr-1 text-black font-bold">•</span> <div className="text-black font-bold"> {jobCount} Empleos Disponibles </div>
      </div>

      {isLarge && imagePath && (
        <div className="flex justify-end mt-4">
          <div className="w-50 h-50 relative">
            <img 
              src={imagePath} 
              alt={`Ilustración para ${title}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error("Error cargando imagen:", imagePath);
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

const JobCategories: React.FC = () => {

  const developmentImagePath = "images/img_bento.png";

  const categories = [
    {
      title: "Diseño y Desarrollo",
      description: "Encuentra oportunidades laborales en el ámbito de diseño y desarrollo. Conecta con empresas que buscan talento en programación y experiencia de usuario.",
      icon: <div className="p-0 relative">
      </div>,
      jobCount: 49,
      customIcons: true,
      imagePath: developmentImagePath,
    },
    {
      title: "Negocios y Consultoría",
      description: "Explora puestos en consultoría de negocios, gestión de proyectos y asesoramiento empresarial.",
      icon: <div className="p-3 bg-blue-100 rounded-full"><LightbulbIcon /></div>,
      jobCount: 37,
    },
    {
      title: "Operaciones y Producción",
      description: "Vacantes para profesionales de cadena de suministro, producción industrial y control de calidad.",
      icon: <div className="p-3 bg-blue-100 rounded-full"><PackageIcon /></div>,
      jobCount: 42,
    },
    {
      title: "Educación y Formación",
      description: "Oportunidades para docentes, formadores y especialistas en educación y capacitación profesional.",
      icon: <div className="p-3 bg-blue-100 rounded-full"><FileTextIcon /></div>,
      jobCount: 28,
    },
    {
      title: "Marketing y Ventas",
      description: "Posiciones disponibles en marketing digital, ventas, relaciones públicas y gestión comercial.",
      icon: <div className="p-3 bg-blue-100 rounded-full"><PrinterIcon /></div>,
      jobCount: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <div className="w-[calc(100%-200px)] mx-auto pt-2 pb-4">
        <div className="">
          <div className="px-38">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <h2 className="text-3xl font-bold">Categorías Populares de Empleo</h2>
              <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-200 transition-colors">
                Comenzar
                <ArrowUpRightIcon />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 lg:row-span-2">
                <JobCategory 
                  key={0}
                  title={categories[0].title} 
                  description={categories[0].description}
                  icon={categories[0].icon}
                  jobCount={categories[0].jobCount}
                  isLarge = {true}
                  imagePath={categories[0].imagePath}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:col-span-7">
                {categories.slice(1).map((category, index) => (
                  <JobCategory 
                    key={index + 1}
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
      </div>
    </div>
  );
};

export default JobCategories;