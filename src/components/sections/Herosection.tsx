import React from "react";
import Button from "../Button";
import SearchInput from "../SearchInput";

interface PopularJobCategoryProps {
  label: string;
}

const PopularJobCategory: React.FC<PopularJobCategoryProps> = ({ label }) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200">
      {label}
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen pt-10">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <Button variant="secondary" size="sm">
              Comienza Gratis
            </Button>
          </div>

          <h1 className="text-5xl font-bold mb-8">
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
            12,548 Empleos Publicados! La forma más rápida y conforme a la ley
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
            {/* <div className="w-full h-full">

              <img
                src="/professional.svg"
                alt="Profesional buscando trabajo"
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/500x400?text=Profesional+ToWork";
                }}
              />
            </div> */}

            <div className="absolute bottom-10 right-0">
              <div className="bg-white p-2 rounded-full shadow-md">
                {/*
                <img
                  src="/google-icon.svg"
                  alt="Google"
                  className="w-8 h-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/32?text=G";
                  }}
                />
                */}
              </div>
            </div>

            <div className="absolute top-10 right-10">
              <div className="bg-white p-2 rounded-full shadow-md">
                {/*
                <img
                  src="/search-icon.svg"
                  alt="Buscar"
                  className="w-8 h-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/32?text=S";
                  }}
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
