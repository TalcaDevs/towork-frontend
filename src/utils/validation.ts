export interface ProfileFormErrors {
  description?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio_url?: string;
  skills?: string;
  education?: string;
  experience?: string;
  certifications?: string;
  projects?: string;
  languages?: string;
}

export const validateProfileForm = (userData: any): { isValid: boolean; errors: ProfileFormErrors } => {
  let isValid = true;
  const errors: ProfileFormErrors = {};

  if (!userData.description || userData.description.trim() === '') {
    errors.description = 'La descripción profesional es requerida';
    isValid = false;
  }

  if (!userData.location || userData.location.trim() === '') {
    errors.location = 'La ubicación es requerida';
    isValid = false;
  }

  if (!userData.phone || !userData.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio';
    isValid = false;
  } else if (!isValidPhone(userData.phone)) {
    errors.phone = 'El formato del teléfono no es válido';
    isValid = false;
  }

  if (!userData.education || !Array.isArray(userData.education) || userData.education.length === 0) {
    errors.education = 'Debes agregar al menos un registro de educación';
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
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true;
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
    errors.password = 'Se requiere una contraseña';
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