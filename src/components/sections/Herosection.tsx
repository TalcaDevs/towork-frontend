import React from "react";
import Button from "../Button";
import SearchInput from "../SearchInput";

interface PopularJobCategoryProps {
  label: string;
}

const PopularJobCategory: React.FC<PopularJobCategoryProps> = ({ label }) => {
  return (
    <div className="bg-blue-400 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer transition-colors duration-200">
      {label}
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      {/* Contenedor principal con padding reducido en los lados y arriba */}
      <div className="w-[calc(100%-100px)] mx-auto">
        {/* Contenedor del hero con bordes redondeados y fondo semitransparente */}
        <div className="bg-blue-100 rounded-md px-50 py-10">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="mb-8">
                <Button variant="secondary" size="sm">
                  Comienza Gratis
                </Button>
              </div>

              <h1 className="text-6xl font-bold mb-8">
                Modernizando la
                <div className="flex items-center space-x-2 my-2">
                  <span className="text-blue-500 relative">
                    Búsqueda
                    <span className="absolute -left-4 -top-4">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 5L23.66 15.52H35L25.67 22.48L29.33 33L20 26.04L10.67 33L14.33 22.48L5 15.52H16.34L20 5Z"
                          fill="#00a1e3"
                        />
                      </svg>
                    </span>
                  </span>
                  <span>de Empleo</span>
                </div>
                <span className="text-indigo-400">Profesional</span>
                <span className="inline-block ml-2">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#8B5CF6"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-gray-700 mb-8 text-lg">
                12.548 Empleos Publicados! La forma más rápida y conforme a la ley
                para descubrir, contratar y gestionar talento freelance.
              </p>

              <div className="mb-8">
                <SearchInput
                  placeholder="Busca tu trabajo ideal..."
                  buttonText="Buscar"
                  onSearch={(query) => {
                    console.log("Búsqueda realizada:", query);
                    // Aquí iría la lógica de búsqueda cuando se implemente
                  }}
                />
              </div>

              <div>
                <p className="text-gray-500 mb-3">Categorías Populares:</p>
                <div className="flex flex-wrap gap-2">
                  <PopularJobCategory label="Tecnología" />
                  <PopularJobCategory label="Comercio Electrónico" />
                  <PopularJobCategory label="Salud y Bienestar" />
                  <PopularJobCategory label="Desarrollo" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
              <div className="relative">
                <div className="w-full h-full">
                  <img
                    src="/professional.svg"
                    alt="Profesional buscando trabajo"
                    className="w-full h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "images/img_hero.png";
                    }}
                  />
                </div>
                
                {/* Íconos flotantes similares a la imagen original */}
                <div className="absolute top-10 right-10">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-yellow-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute bottom-10 right-0">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                        fill="#DB4437"
                      />
                      <path
                        d="M12 5C10.11 5 8.5 5.67 7.31 6.81L4.5 4V9H9.5L7.14 6.64C8 5.92 9 5.5 10 5.5C13 5.5 15.5 8 15.5 11H16C16 7.13 12.87 4 9 4H8.5L11 1.5L8.5 1L4.5 5H4L7.5 8.5L11 5H12Z"
                        fill="#4285F4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;