export interface UserRegistrationData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    
    foto_perfil?: string;
    descripcion?: string;
    telefono?: string;
    ubicacion?: string;
    linkedin?: string;
    id_portafolio_web?: string;
    
    educacion: EducationItem[];
    experiencia: ExperienceItem[];
    certificaciones: CertificationItem[];
    proyectos: ProjectItem[];
    skills: string[];
    idiomas: LanguageItem[];
    
    templateId?: string;
  }
  
  
  export interface EducationItem {
    institucion: string;
    titulo: string;
    fecha_inicio: string;
    fecha_fin?: string;
  }
  
  export interface ExperienceItem {
    empresa: string;
    puesto: string;
    descripcion?: string;
    fecha_inicio: string;
    fecha_fin?: string;
  }
  
  export interface CertificationItem {
    nombre: string;
    institucion: string;
    fecha_obtencion: string;
    url_certificado?: string;
  }
  
  export interface ProjectItem {
    titulo: string;
    descripcion: string;
    herramientas_usadas: string;
    url_proyecto?: string;
    imagen_proyecto?: string;
  }
  
  export interface LanguageItem {
    language: {
      nombre: string;
    };
    nivel: string;
  }
  
  export interface TemplateOption {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }
  
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