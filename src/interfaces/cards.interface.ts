export interface CardProps {
    id: string;
    title: string;
    tags: string[];
    hoursAgo: number;
    description?: string;
    imageUrl?: string;
    author?: string;
    likes?: number;
    className?: string;
  }
  
  export interface CardSectionProps {
    title: string;
    cards: CardProps[];
  }