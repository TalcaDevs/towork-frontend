import React from "react";
import { Link } from "react-router-dom";
import { NavLinkProps } from "../interfaces/navLink.interface";
import ArrowRightIcon from "../assets/icons/ArrowRightIcon";

const NavItem: React.FC<NavLinkProps> = ({ to, label }) => {
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
        <Link
          to="/iniciar-sesion"
          className="text-black hover:text-blue-500 transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/signup"
          className="bg-blue-300 hover:bg-blue-400 text-black px-6 py-3 rounded-full transition-colors duration-200 flex items-center"
        >
          Comenzar
          <ArrowRightIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
