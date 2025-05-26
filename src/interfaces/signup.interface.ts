export interface UserRegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  
  profile_photo?: string;    
  description?: string;      
  phone?: string;        
  location?: string;      
  linkedin?: string;   
  portfolio_url?: string;     
  
  education: EducationItem[];  
  experience: ExperienceItem[]; 
  certifications: CertificationItem[]; 
  projects: ProjectItem[];      
  skills: string[];            
  languages: LanguageItem[];     
  
  // Decidir: usar 'template' para coincidir con el endpoint
  template: number;            
}

export interface EducationItem {
  institution: string;         
  degree: string;             
  start_date: string;          
  end_date?: string;           
}

export interface ExperienceItem {
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string;
}

export interface CertificationItem {
  name: string;
  institution: string;
  date_obtained: string;
  certificate_url?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tools_used: string;
  project_url?: string;
  project_image?: string;
}

export interface LanguageItem {
  language: {
    name: string;
  };
  level: string;
}

export interface TemplateOption {
  id: number;
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
  description?: string;    
  phone?: string;
  location?: string;      
  linkedin?: string;         
  portfolio_url?: string;  
}

// Props para los steps
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

// Props para los formularios
export interface BasicInfoFormProps {
  userData: {
    description: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio_url: string;
  };

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors?: {
    description?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    portfolio_url?: string;
  };
}

export interface EducationErrors {
  institution?: string;
  degree?: string;
  start_date?: string;
  end_date?: string;
}

export interface EducationFormProps {
  educationItems: EducationItem[];
  updateEducation: (education: EducationItem[]) => void;
  error?: string;
}

export interface ExperienceFormProps {
  experienceItems: ExperienceItem[];
  updateExperience: (experience: ExperienceItem[]) => void;
  error?: string; 
}

export interface CertificationsFormProps {
  certifications: CertificationItem[];
  updateCertifications: (certifications: CertificationItem[]) => void;
}

export interface ProjectsFormProps {
  projects: ProjectItem[];
  updateProjects: (projects: ProjectItem[]) => void;
}

export interface LanguagesFormProps {
  languages: LanguageItem[];
  updateLanguages: (languages: LanguageItem[]) => void;
}

export interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
  error?: string;
}

// Interface para errores de validación del perfil completo
export interface ProfileFormErrors extends BasicProfileErrors {
  education?: string;
  experience?: string;
  skills?: string;
  certifications?: string;
  projects?: string;
  languages?: string;
}