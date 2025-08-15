export interface About {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  image?: string;
  githubUsername?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
}
/**
 * About type for admin profile information
 */
export interface About {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  image?: string;
  githubUsername?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}
/**
 * Skill type for admin skills
 */
export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  description: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string or undefined
  isCurrent: boolean;
}
/**
 * Experience type for admin work experience
 */
export interface Experience {
  id: number;
  position: string;
  company: string;
  description: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string or undefined
  isCurrent: boolean;
}
