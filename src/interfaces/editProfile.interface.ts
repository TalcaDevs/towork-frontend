import {
  EducationItem,
  ExperienceItem,
  CertificationItem,
  ProjectItem,
  LanguageItem,
} from "../interfaces/signup.interface";

export interface EditProfileProps {
  userData: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    location?: string;
    phone?: string;
    description?: string;
    profilePhoto: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
    website?: string;
    stats: {
      applications: number;
      profileViews: number;
      offers: number;
    };
    skills: string[];
    experience: ExperienceItem[];
    education: EducationItem[];
    projects: ProjectItem[];
    certifications: CertificationItem[];
    languages: LanguageItem[];
    template: number;
  };
  loading?: boolean;
  error?: string | null;
  onLogout?: () => void;
}