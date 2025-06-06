

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

interface WorkExperienceItem {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

interface CertificationItem {
  id: number;
  name: string;
  institution: string;
  date_obtained: string;
  certificate_url: string;
  created_at: string;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tools_used: string;
  project_url: string;
  project_image: string;
  created_at: string;
}

interface SkillNested {
  id: number;
  name: string;
}

interface SkillItem {
  skill: SkillNested;
}

interface LanguageNested {
  id: number;
  name: string;
}

interface LanguageItem {
  language: LanguageNested;
  level: string;
}


interface UserData {
  id: number;
  original_user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_photo: string;
  description: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio_url: string;
  role: string;
  template_name: string;
  terms_accepted: boolean;
  terms_accepted_date: string;

  education: EducationItem[];
  work_experience: WorkExperienceItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  languages: LanguageItem[];

  published_at: string;
  last_updated: string;
}

export interface ModernProps {
  userData: UserData;
}

export interface CreativeProps {
  userData: UserData;
}

export interface ProfessionalProps {
  userData: UserData;
}

export interface TemplateLoaderProps {
  userData: UserData;
}
