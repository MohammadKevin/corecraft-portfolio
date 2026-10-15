export type ProjectCategory = "Fullstack" | "Backend" | "E-Commerce";

/** A single quantified outcome shown in the case study's Key Metrics row. */
export interface ProjectMetric {
  /** The number itself, e.g. "40%" or "< 3s". */
  value: string;
  /** What the number measures. */
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short name used on the work card and in the case-study breadcrumb. */
  shortTitle?: string;
  category: ProjectCategory;
  client?: string;
  studio?: string;
  year: number;
  /** Status pill shown on the work card, e.g. "Real Project" or "SaaS". */
  badge?: string;
  role: string[];
  /** Concrete outputs, listed in the case-study meta grid. */
  deliverables: string[];
  /** Tech stack, rendered as pills. */
  tags: string[];
  thumbnail: string;
  summary: string;
  /** Case-study narrative, derived from the project's own process notes. */
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
  /** Maximum two sentences. */
  description: string;
  /** What the client actually receives. */
  deliverables: string[];
  stack: string[];
  preview: string;
}

/** A single skill inside a Tech Matrix column. */
export interface SkillItem {
  name: string;
  /** 0–100 proficiency, used for the meter and the sort order. */
  level: number;
  levelTag: "Advanced" | "Intermediate" | "Familiar";
  /** What the skill was actually used to build. */
  highlights: string[];
  /** Key into the local Lucide icon map in `TechMatrix`. */
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** One-line description of what the column covers. */
  blurb: string;
  skills: SkillItem[];
}

export interface Certificate {
  id: string;
  /** Grouping label, e.g. "National Hackathon". */
  category: string;
  title: string;
  issuer: string;
  /** Human-readable issue date, e.g. "Aug 2026". */
  date: string;
  /** Credential ID, when the issuer exposes one. */
  credentialId?: string;
  /** Public verification URL. */
  url?: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  /** e.g. "2024 – Present" */
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  tech: string[];
  thumbnail: string;
}

/** A single headline number in the Statement & Metrics section. */
export interface ProfileStat {
  value: string;
  label: string;
  detail: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  /** Full legal name, used in the footer colophon. */
  fullName: string;
  /** Job title used in the hero's left column. */
  role: string;
  subtitle: string;
  /** Two-sentence positioning statement shown under the hero. */
  manifesto: string[];
  availableForProjects: boolean;
  avatar: string;
  email: string;
  whatsappUrl: string;
  cvUrl: string;
  location: string;
  /** IANA timezone used by the footer clock. */
  timezone: string;
  socials: { label: string; url: string }[];
  stats: ProfileStat[];
}
