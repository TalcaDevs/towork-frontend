export interface JobCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  jobCount: number;
  isLarge?: boolean;
  imagePath?: string;
}