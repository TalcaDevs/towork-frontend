import { processSkills } from "./skills";

export function mapUserDataToFormData(userData: any) {
  return {
    first_name: userData.firstName || "",
    last_name: userData.lastName || "",
    email: userData.email || "",
    phone: userData.phone || "",
    location: userData.location || "",
    description: userData.description || "",
    linkedin: userData.linkedin || "",
    portfolio_url: userData.portfolio || "",
    education: userData.education || [],
    experience: userData.experience || [],
    projects: userData.projects || [],
    certifications: userData.certifications || [],
    skills: processSkills(userData.skills || []),
    languages: userData.languages || [],
  };
}
