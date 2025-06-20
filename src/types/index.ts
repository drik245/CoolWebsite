export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: number;
  featured: boolean;
  images?: string[];
  videos?: string[];
}

export interface CursorTrailPoint {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  color: string;
  proficiency: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface AboutContent {
  name: string;
  title: string;
  bio: string;
  journey: string;
  contactEmail: string;
  contactLabel: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

export interface TechStack {
  id: number;
  name: string;
  category: string;
}

export interface TechStackCategory {
  id: number;
  name: string;
  value: string;
}