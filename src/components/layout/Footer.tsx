import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import Logo from "../../assets/icons/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-slate-900 text-white pt-16 pb-12 mx-4 sm:mx-8 lg:mx-12 mt-8 rounded-t-2xl shadow-lg">
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Contáctanos</h2>
            <Link 
              to="/contacto"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors duration-300 font-medium shadow-sm"
            >
              Enviar mensaje
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </Link>
          </div>
          <hr className="border-slate-700 my-8" />
        </div>

        {/* Main footer sections */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-6">
                <Logo className="w-10 h-10 mr-3" />
                <h3 className="text-2xl font-bold text-white">ToWork</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                La plataforma líder para encontrar tu trabajo ideal. Conectamos profesionales talentosos con las mejores oportunidades laborales.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Twitter"
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
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">
                Servicios
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Buscar empleo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Publicar ofertas</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Servicios para empresas</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Formación profesional</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Enlaces Útiles</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Acerca de Nosotros</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Recursos para candidatos</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Blog de empleo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Contacto</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Soporte */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Soporte</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Preguntas Frecuentes</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Términos y Condiciones</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Política de Privacidad</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Centro de Ayuda</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Copyright © {new Date().getFullYear()} Todos los Derechos Reservados por{" "}
            <a 
              href="https://talcadevs.vercel.app/" 
              className="text-blue-600 hover:underline font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              TalcaDevs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;