
export interface Service {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface WorkCategory {
  name: string;
  format: string;
  image: string;
  previews: string[]; // Added for the preview feature
}

export interface Film {
  title: string;
  category: 'Released' | 'Upcoming' | 'In Production';
  description: string;
  poster: string;
  year?: string;
}

export enum Page {
  Home = 'home',
  Work = 'work',
  Films = 'films',
  About = 'about',
  Contact = 'contact'
}
