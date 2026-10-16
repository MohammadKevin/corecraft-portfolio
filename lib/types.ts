export type ProjectCategory = "Fullstack" | "Backend" | "E-Commerce";

export interface ProjectMetric {
  value: string;

  label: string;
}

export interface Project {
  slug: string;
  order: number;
  title: string;

  shortTitle?: string;
  category: ProjectCategory;
  client?: string;
  studio?: string;
  year: number;

  badge?: string;
  role: string[];

  deliverables: string[];

  tags: string[];
  thumbnail: string;
  image?: string;
  summary: string;

  problem: string;
  architecture: string[];
  solution: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  sourceUrl?: string;
  gallery: { src: string; alt: string; caption?: string }[];
  timeline?: { phase: string; period: string; detail: string }[];
}

export interface Service {
  id: string;
  title: string;

  description: string;

  deliverables: string[];
  stack: string[];
  preview: string;
}

export interface SkillItem {
  name: string;

  level: number;
  levelTag: "Advanced" | "Intermediate" | "Familiar";

  highlights: string[];

  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;

  blurb: string;
  skills: SkillItem[];
}

export interface Certificate {
  id: string;

  category: string;
  title: string;
  issuer: string;

  date: string;

  credentialId?: string;

  url?: string;
  image?: string;
  skills: string[];
}

export interface Experience {
  order: number;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements?: string[];
  highlights?: string[];
  tech: string[];
  thumbnail?: string;
}

export interface ProfileStat {
  value: string;
  label: string;
  detail: string;
}

export interface Profile {
  firstName: string;
  lastName: string;

  fullName: string;

  role: string;
  subtitle: string;

  manifesto: string[];
  availableForProjects: boolean;
  avatar: string;
  email: string;
  whatsappUrl: string;
  cvUrl: string;
  location: string;

  timezone: string;
  socials: { label: string; url: string }[];
  stats: ProfileStat[];
  aboutHeadline?: string;
  aboutText?: string;
  specialization?: string;
  architectureNote?: string;
}
