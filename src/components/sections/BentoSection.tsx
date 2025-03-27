import React from "react";
import { JobCategoryProps } from "../../interfaces/jobCategory.interface";
import ArrowUpRightIcon from "../../assets/icons/ArrowUpRightIcon";
import LightbulbIcon from "../../assets/icons/LightbulbIcon";
import PackageIcon from "../../assets/icons/PackageIcon";
import FileTextIcon from "../../assets/icons/FileTextIcon";
import PrinterIcon from "../../assets/icons/PrinterIcon";

// Añadiendo la fuente Poppins
// Nota: En un proyecto real, esto se haría en un archivo global o en _app.tsx/document.tsx
// Esta es solo una representación para el componente aislado
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
`;

const JobCategory: React.FC<JobCategoryProps> = ({
  title,
  description,
  icon,
  jobCount,
  isLarge = false,
  imagePath,
}) => {
  return (
    <div className="bg-[#f6f7f9] backdrop-blur-sm p-6 rounded-xl relative h-full border-10 border-white bg-opacity-10">
      <div className="flex justify-between items-start">
        <div className="mb-6">{icon}</div>
        <button className="p-3 bg-blue-300 rounded-full hover:bg-blue-400 transition-colors cursor-pointer">
          <ArrowUpRightIcon className="text-black" />
        </button>
      </div>

      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="text-blue-500 font-medium flex items-center">
        <span className="text-lg mr-1 text-black font-bold">•</span>{" "}
        <div className="text-black font-bold">
          {" "}
          {jobCount} Empleos Disponibles{" "}
        </div>
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
                target.style.display = "none";
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
      description:
        "Encuentra oportunidades laborales en el ámbito de diseño y desarrollo. Conecta con empresas que buscan talento en programación y experiencia de usuario.",
      icon: <div className="p-0 relative"></div>,
      jobCount: 49,
      customIcons: true,
      imagePath: developmentImagePath,
    },
    {
      title: "Negocios y Consultoría",
      description:
        "Explora puestos en consultoría de negocios, gestión de proyectos y asesoramiento empresarial.",
      icon: (
        <div className="p-3 bg-blue-100 rounded-full ">
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
    <div className="min-h-screen bg-[#f6f7f9]">
      <div className="w-[calc(100%-200px)] mx-auto pt-2 pb-4">
        <div className="">
          <div className="px-38">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <h2 className="text-3xl font-bold">
                Categorías Populares de Empleo
              </h2>
              <button className="flex items-center gap-2 text-black bg-blue-300 px-6 py-3 rounded-full hover:bg-blue-400 transition-colors cursor-pointer">
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
                  isLarge={true}
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
