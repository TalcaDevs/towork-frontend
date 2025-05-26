import { TemplateOption } from '../interfaces/signup.interface';

export interface TemplateCardProps {
  template: TemplateOption;
  isSelected: boolean;
  onSelect: (templateId: number) => void; 
  index: number;
}