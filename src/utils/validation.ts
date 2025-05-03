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

  if (!userData.descripcion || userData.descripcion.trim() === '') {
    errors.descripcion = 'La descripción profesional es requerida';
    isValid = false;
  }

  if (!userData.ubicacion || userData.ubicacion.trim() === '') {
    errors.ubicacion = 'La ubicación es requerida';
    isValid = false;
  }

  if (!userData.telefono || !userData.telefono.trim()) {
    errors.telefono = 'El teléfono es obligatorio';
    isValid = false;
  } else if (!isValidPhone(userData.telefono)) {
    errors.telefono = 'El formato del teléfono no es válido';
    isValid = false;
  }

  if (!userData.educacion || !Array.isArray(userData.educacion) || userData.educacion.length === 0) {
    errors.educacion = 'Debes agregar al menos un registro de educación';
    isValid = false;
  }

  return { isValid, errors };
};


export const isRequired = (value: string): boolean => {
  return value.trim() !== '';
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};


export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Permitir vacío
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Permitir vacío
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return regex.test(phone);
};

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
  
  if (!isRequired(firstName)) {
    errors.first_name = 'El nombre es requerido';
    isValid = false;
  }
  
  if (!isRequired(lastName)) {
    errors.last_name = 'El apellido es requerido';
    isValid = false;
  }
  
  if (!isRequired(email)) {
    errors.email = 'El email es requerido';
    isValid = false;
  } else if (!isValidEmail(email)) {
    errors.email = 'El email no es válido';
    isValid = false;
  }
  
  if (!isRequired(password)) {
    errors.password = 'La contraseña es requerida';
    isValid = false;
  } else if (!hasMinLength(password, 8)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
    isValid = false;
  }
  
  if (!passwordsMatch(password, passwordConfirm)) {
    errors.password_confirm = 'Las contraseñas no coinciden';
    isValid = false;
  }

  return { isValid, errors };
};
