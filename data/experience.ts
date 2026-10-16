import type { Experience } from "@/lib/types";

export const experiences = [
  {
    order: 1,
    company: "SIDIGS",
    role: "Quality Assurance",
    period: "2026 – Present",
    location: "Malang, Indonesia",
    summary:
      "Executing rigorous test plans, automated API contract validations, and defect lifecycle tracking across client delivery pipelines.",
    tech: ["Manual Testing", "Postman", "Bug Tracking", "API Testing"],
    thumbnail: "/images/experience/sidigs.svg",
  },
  {
    order: 2,
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    period: "2025 – Present",
    location: "Remote",
    summary:
      "Building resilient web platforms, transactional backends, and custom management systems for businesses under the CoreCraft studio.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
    thumbnail: "/images/experience/independent.svg",
  },
  {
    order: 3,
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    period: "2024 – Present",
    location: "Malang, Indonesia",
    summary:
      "Studying core computer science principles, database modeling, object-oriented design, and enterprise application architectures.",
    tech: ["PHP", "Node.js", "MySQL", "JavaScript", "HTML/CSS"],
    thumbnail: "/images/experience/smk-telkom-malang.svg",
  },
] satisfies Experience[];
