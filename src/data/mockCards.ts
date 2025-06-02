import { CardProps } from '../interfaces/cards.interface';

export const mockCards: CardProps[] = [
  {
    id: "card-1",
    title: "Introducción a React",
    tags: ["react", "frontend", "javascript"],
    hoursAgo: 3,
    description: "Aprende los conceptos básicos de React y cómo crear tu primera aplicación.",
    imageUrl: "public/images/react.jpg",
    author: "Juan Pérez",
    likes: 42
  },
  {
    id: "card-2",
    title: "TypeScript para principiantes",
    tags: ["typescript", "javascript", "desarrollo"],
    hoursAgo: 5,
    description: "Una guía completa para empezar con TypeScript en tus proyectos.",
    imageUrl: "public/images/typescript.png",
    author: "María García",
    likes: 28
  },
  {
    id: "card-3",
    title: "Configurando Vite con React",
    tags: ["vite", "react", "configuración"],
    hoursAgo: 24,
    description: "Aprende cómo configurar un proyecto React con Vite para un desarrollo más rápido.",
    imageUrl: "public/images/vite-react.png",
    likes: 15
  },
  {
    id: "card-4",
    title: "Componentes reutilizables",
    tags: ["react", "componentes", "frontend"],
    hoursAgo: 48,
    description: "Cómo crear componentes reutilizables en React para mejorar tu flujo de trabajo.",
    imageUrl: "public/images/react-component.jpg",
    author: "Carlos Rodríguez",
    likes: 33
  }
];

export const featuredCards = mockCards.slice(0,4);