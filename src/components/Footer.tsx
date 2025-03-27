import React from "react";
import FacebookIcon from "../assets/icons/FacebookIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";

const Footer: React.FC = () => {
  return (
    <>
      {/* Contenedor principal del footer con margen lateral de 50px */}
      <footer className="bg-[#120F1A] text-white py-14 mx-[50px] rounded-lg">
        {/* Sección superior con "Contáctanos" */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-6xl font-bold">Contáctanos</h2>
            <div className="ml-4 w-12 h-12 rounded-full bg-[#A08BEA] flex items-center justify-center">
              {/* Icono de flecha SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          <hr className="border-gray-700 my-10" />
        </div>

        {/* Sección de información, enlaces y soporte */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna 1 - Información del Portal de Estudiantes */}
            <div>
              <h3 className="text-2xl font-bold mb-6">To Work</h3>
              <p className="text-gray-300 mb-6">
                Encuentra tu trabajo ideal...
              </p>
              <div className="flex space-x-3">
                {/* Facebook SVG */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-md bg-[#A08BEA] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                >
                  <FacebookIcon />
                </a>
                {/* Instagram SVG */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-md bg-[#A08BEA] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                >
                  <InstagramIcon />
                </a>
                {/* Twitter SVG */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-md bg-[#A08BEA] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                {/* YouTube SVG */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-md bg-[#A08BEA] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Columna 2 - Servicios Académicos */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Servicios Académicos
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Portal de Cursos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Biblioteca Digital
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Calendario Académico
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Descarga de Recursos
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Enlaces Útiles */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Enlaces Útiles</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Acerca de Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Servicios Estudiantiles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Blog Académico
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 4 - Soporte */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Soporte</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Centro de Ayuda
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright separado debajo del footer */}
      <div className="text-center py-4">
        <p>
          Copyright ©2025 Todos los Derechos Reservados por{" "}
          <a href="https://talcadevs.vercel.app/" className="text-blue-600 hover:underline">
            TalcaDevs
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
