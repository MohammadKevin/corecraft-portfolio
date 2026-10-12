export type ProjectCategory = "Fullstack" | "Backend" | "E-Commerce";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  client?: string;
  studio?: string;
  year: number;
  role: string[];
  /** Tech stack, rendered as pills. */
  tags: string[];
  thumbnail: string;
  summary: string;
  liveUrl?: string;
  sourceUrl?: string;
  gallery: { src: string; alt: string; caption?: string }[];
  timeline?: { phase: string; period: string; detail: string }[];
}

export interface Service {
  id: string;
  title: string;
  /** Maximum two sentences. */
  description: string;
  stack: string[];
  preview: string;
}

export interface Experience {
  company: string;
  role: string;
  /** e.g. "2022 – Present" */
  period: string;
  location: string;
  thumbnail: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  subtitle: string;
  availableForProjects: boolean;
  avatar: string;
  email: string;
  whatsappUrl: string;
  socials: { label: string; url: string }[];
}
