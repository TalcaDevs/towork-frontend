/**
 * Valida el perfil completo antes de guardarlo
 */
export interface ProfileFormErrors {
  descripcion?: string;
  telefono?: string;
  ubicacion?: string;
  linkedin?: string;
  id_portafolio_web?: string;
  skills?: string;
  educacion?: string;
  experiencia?: string;
}

export const validateProfileForm = (userData: any): { isValid: boolean; errors: ProfileFormErrors } => {
  let isValid = true;
  const errors: ProfileFormErrors = {};

  // Campos obligatorios
  if (!userData.descripcion || userData.descripcion.trim() === '') {
    errors.descripcion = 'La descripción profesional es requerida';
    isValid = false;
  }

  if (!userData.ubicacion || userData.ubicacion.trim() === '') {
    errors.ubicacion = 'La ubicación es requerida';
    isValid = false;
  }

  // Validación de habilidades (debe tener al menos una)
  if (!userData.skills || !Array.isArray(userData.skills) || userData.skills.length === 0) {
    errors.skills = 'Debe agregar al menos una habilidad';
    isValid = false;
  }

  // Validaciones opcionales - formato
  if (userData.telefono && !isValidPhone(userData.telefono)) {
    errors.telefono = 'El formato del teléfono no es válido';
    isValid = false;
  }

  if (userData.linkedin && !isValidUrl(userData.linkedin)) {
    errors.linkedin = 'La URL de LinkedIn no es válida';
    isValid = false;
  }

  if (userData.id_portafolio_web && !isValidUrl(userData.id_portafolio_web)) {
    errors.id_portafolio_web = 'La URL del sitio web no es válida';
    isValid = false;
  }

  // Validación de educación (opcional pero recomendado)
  if (!userData.educacion || !Array.isArray(userData.educacion) || userData.educacion.length === 0) {
    errors.educacion = 'Recomendamos agregar al menos una entrada de educación';
    // No marcamos inválido porque es opcional
  }

  // Validación de experiencia (opcional pero recomendado)
  if (!userData.experiencia || !Array.isArray(userData.experiencia) || userData.experiencia.length === 0) {
    errors.experiencia = 'Recomendamos agregar al menos una experiencia laboral';
    // No marcamos inválido porque es opcional
  }

  return { isValid, errors };
};

// Funciones auxiliares
// (Mantenemos las existentes)

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