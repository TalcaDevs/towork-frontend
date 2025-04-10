/**
 * Funciones de validación para formularios
 */

// Validar que un campo no esté vacío
export const isRequired = (value: string): boolean => {
    return value.trim() !== '';
  };
  
  // Validar email con regex
  export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validar longitud mínima
  export const hasMinLength = (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  };
  
  // Validar que dos contraseñas coincidan
  export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };
  
  // Validar URL
  export const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Permitir vacío
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  // Validar teléfono (formato básico)
  export const isValidPhone = (phone: string): boolean => {
    if (!phone) return true; // Permitir vacío
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return regex.test(phone);
  };
  
  // Validar formulario de registro (paso 1)
  export interface RegistrationFormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password_confirm?: string;
  }
  
  export const validateRegistrationForm = (
    firstName: string,
    lastName: string,
    email: string,
    password: string, 
    passwordConfirm: string
  ): { isValid: boolean; errors: RegistrationFormErrors } => {
    let isValid = true;
    const errors: RegistrationFormErrors = {};
    
    // Validar nombre
    if (!isRequired(firstName)) {
      errors.first_name = 'El nombre es requerido';
      isValid = false;
    }
    
    // Validar apellido
    if (!isRequired(lastName)) {
      errors.last_name = 'El apellido es requerido';
      isValid = false;
    }
    
    // Validar email
    if (!isRequired(email)) {
      errors.email = 'El email es requerido';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'El email no es válido';
      isValid = false;
    }
    
    // Validar contraseña
    if (!isRequired(password)) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (!hasMinLength(password, 8)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (!passwordsMatch(password, passwordConfirm)) {
      errors.password_confirm = 'Las contraseñas no coinciden';
      isValid = false;
    }
    
    return { isValid, errors };
  };
  
  // Validar perfil básico
  export interface BasicProfileErrors {
    descripcion?: string;
    telefono?: string;
    ubicacion?: string;
    linkedin?: string;
    id_portafolio_web?: string;
  }
  
  export const validateBasicProfile = (
    telefono: string,
    linkedin: string,
    id_portafolio_web: string
  ): { isValid: boolean; errors: BasicProfileErrors } => {
    let isValid = true;
    const errors: BasicProfileErrors = {};
    
    // Validar teléfono
    if (telefono && !isValidPhone(telefono)) {
      errors.telefono = 'El formato del teléfono no es válido';
      isValid = false;
    }
    
    // Validar LinkedIn
    if (linkedin && !isValidUrl(linkedin)) {
      errors.linkedin = 'El URL de LinkedIn no es válido';
      isValid = false;
    }
    
    // Validar sitio web
    if (id_portafolio_web && !isValidUrl(id_portafolio_web)) {
      errors.id_portafolio_web = 'El URL del sitio web no es válido';
      isValid = false;
    }
    
    return { isValid, errors };
  };