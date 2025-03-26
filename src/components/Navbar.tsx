import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  return (
    <Link 
      to={to} 
      className="text-black hover:text-blue-500 transition-colors duration-200 px-4 py-2"
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-evenly px-8 py-4 bg-[#f6f7f9] sticky top-0">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          ToWork
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-1">
        <NavItem to="/" label="Inicio" />
        <NavItem to="/encontrar-trabajos" label="Encontrar Trabajos" />
        <NavItem to="/encontrar-candidatos" label="Encontrar Candidatos" />
        <NavItem to="/paginas" label="Páginas" />
        <NavItem to="/blog" label="Blog" />
        <NavItem to="/contacto" label="Contacto" />
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/iniciar-sesion" className="text-black hover:text-blue-500 transition-colors">
          Iniciar Sesión
        </Link>
        <Link 
          to="/signup" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200 flex items-center"
        >
          Comenzar
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2" 
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
    </nav>
  );
};

export default Navbar;