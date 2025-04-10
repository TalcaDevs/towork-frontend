/**
 * Interfaces básicas para los datos de registro
 */
export interface UserRegistrationData {
    // Datos básicos (paso 1)
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    
    // Datos de perfil (paso 2)
    foto_perfil?: string;
    descripcion?: string;
    telefono?: string;
    ubicacion?: string;
    linkedin?: string;
    id_portafolio_web?: string;
    
    // Colecciones de datos
    educacion: EducationItem[];
    experiencia: ExperienceItem[];
    certificaciones: CertificationItem[];
    proyectos: ProjectItem[];
    skills: string[];
    idiomas: LanguageItem[];
    
    // Plantilla seleccionada (paso 3)
    templateId?: string;
  }
  
  // Educación
  export interface EducationItem {
    institucion: string;
    titulo: string;
    fecha_inicio: string;
    fecha_fin?: string;
  }
  
  // Experiencia laboral
  export interface ExperienceItem {
    empresa: string;
    puesto: string;
    descripcion?: string;
    fecha_inicio: string;
    fecha_fin?: string;
  }
  
  // Certificaciones
  export interface CertificationItem {
    nombre: string;
    institucion: string;
    fecha_obtencion: string;
    url_certificado?: string;
  }
  
  // Proyectos
  export interface ProjectItem {
    titulo: string;
    descripcion: string;
    herramientas_usadas: string;
    url_proyecto?: string;
    imagen_proyecto?: string;
  }
  
  // Idiomas
  export interface LanguageItem {
    language: {
      nombre: string;
    };
    nivel: string;
  }
  
  // Plantilla
  export interface TemplateOption {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }
  
  // Props compartidas entre componentes de pasos
  export interface BaseStepProps {
    userData: UserRegistrationData;
    updateUserData: (data: Partial<UserRegistrationData>) => void;
    nextStep: () => void;
    prevStep?: () => void;
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: string | null) => void;
  }
  
  // Interfaces para errores de validación
  export interface RegistrationFormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password_confirm?: string;
  }
  
  export interface BasicProfileErrors {
    descripcion?: string;
    telefono?: string;
    ubicacion?: string;
    linkedin?: string;
    id_portafolio_web?: string;
  }
  
  // Props específicas para cada paso
  export interface Step1Props extends BaseStepProps {}
  
  export interface Step2Props extends BaseStepProps {
    skipStep: () => void;
  }
  
  export interface Step3Props extends BaseStepProps {}
  
  export interface Step4Props {
    userData: UserRegistrationData;
    navigate: (path: string) => void;
    error: string | null;
    success: string | null;
  }