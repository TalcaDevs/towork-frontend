import { 
  EducationItem, 
  ExperienceItem, 
  CertificationItem, 
  ProjectItem, 
  LanguageItem 
} from '../../interfaces/signup.interface';

export interface ProfileServiceResponse {
  data: ProfileInfo | ProfileInfo[] | PublicProfileInfo; 
  message: string;
  success?: boolean;
  error?: string;
  status?: string;
}

export interface ProfileInfo {
  id: number;
  
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  location?: string;
  description?: string;
  bio?: string; 
  
  profile_photo?: string;
  avatar?: string;
  avatarUrl?: string;
  linkedin?: string;
  portfolio_url?: string;
  github?: string;
  website?: string;
  
  role?: string;
  position?: string;
  current_job?: string;
  years_experience?: number;
  salary_expectation?: number;
  
  education: EducationItem[];
  experience: ExperienceItem[];
  
  skills: string[];
  hard_skills?: string[];
  soft_skills?: string[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  
  template?: number;
  is_public?: boolean;
  is_available?: boolean;
  
  profile_views?: number;
  applications_sent?: number;
  offers_received?: number;
  
  created_at: string;
  updated_at: string;
  last_login?: string;
}
export interface ProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  location?: string;
  description?: string;
  bio?: string;
  linkedin?: string;
  portfolio_url?: string;
  github?: string;
  website?: string;
  role?: string;
  years_experience?: number;
  salary_expectation?: number;
  skills?: string[];
  is_public?: boolean;
  is_available?: boolean;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
  languages?: LanguageItem[];
}

export interface ProfileMutationResponse {
  data: ProfileInfo;
  message: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

export interface ProfileSearchFilters {
  skills?: string[];
  location?: string;
  experience_years?: {
    min?: number;
    max?: number;
  };
  role?: string;
  is_available?: boolean;
  languages?: string[];
}

export interface ProfileStats {
  profile_views: number;
  applications_sent: number;
  offers_received: number;
  profile_completion: number;
  last_updated: string;
}

export interface PublicProfileInfo extends ProfileInfo {
  original_user_id?: number;
  published_at?: string;
  last_updated?: string;
  terms_accepted?: boolean;
  terms_accepted_date?: string;
  template_name?: 'modern' | 'creative' | 'professional';
}

export default ProfileInfo;