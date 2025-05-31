import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLinkProps } from "../../interfaces/navLink.interface";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import Logo from "../../assets/icons/Logo";
import { navLinks } from "../../data/constant";
import { AuthService }  from "../../services/auth/AuthService";

const NavItem: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? "text-blue-500 bg-blue-50" : ""
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar autenticación al cargar el componente y cuando cambie la ruta
useEffect(() => {
  const checkAuthStatus = () => {
    const authStatus = AuthService.isAuthenticated();
    setIsAuthenticated(authStatus);
  };

  checkAuthStatus();
  
  const interval = setInterval(checkAuthStatus, 5000);
  
  return () => {
    clearInterval(interval);
  };
}, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setIsAuthenticated(false);
      setUserDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // El AuthService ya limpia los tokens en el finally
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  const getUserInitials = () => {
    // Generar iniciales simples - puedes mejorarlo después
    return 'U';
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-[#f6f7f9] py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" aria-label="ToWork Home">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold text-slate-900">ToWork</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              /* Usuario autenticado - Mostrar dropdown de perfil */
              <div className="relative user-dropdown">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {getUserInitials()}
                  </div>
                  <span>Mi Cuenta</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Ver Perfil</span>
                      </div>
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Configuración</span>
                      </div>
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Cerrar Sesión</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Usuario no autenticado - Mostrar botones de login/signup */
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200 flex items-center text-sm font-medium"
                >
                  Comenzar
                  <ArrowRightIcon />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-500 focus:outline-none focus:text-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Auth Section */}
          <div className="pt-3 border-t border-gray-100 mt-3">
            {isAuthenticated ? (
              /* Usuario autenticado en móvil */
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  to="/settings"
                  className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Configuración
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              /* Usuario no autenticado en móvil */
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/signin"
                  className="text-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Comenzar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;