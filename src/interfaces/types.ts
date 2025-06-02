export interface JobCategory {
  id: string;
  name: string;
  slug: string;
}

export type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  linkedin: string;
  portfolio_url: string;
  education: any[];
  experience: any[];
  projects: any[];
  certifications: any[];
  skills: string[];
  languages: any[];
  template: number;
};  