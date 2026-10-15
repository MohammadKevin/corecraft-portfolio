import type { Experience } from "@/lib/types";

/**
 * Remapped from the previous `data/timeline.ts` (3 entries).
 *
 * Ordered most recent first, matching the old timeline order. `summary`,
 * `achievements` and `tech` are carried over verbatim from that file so the
 * Obsidian Experience rows can expand without inventing new claims.
 */
export const experiences: Experience[] = [
  {
    company: "SIDIGS",
    role: "Quality Assurance",
    period: "2026 – Present",
    location: "Malang, Indonesia",
    summary:
      "Testing applications to make sure every feature behaves as specified and ships free of defects.",
    achievements: [
      "Completed functional testing and structured bug reporting.",
      "Collaborated with the developer team to raise overall product quality.",
    ],
    tech: ["Manual Testing", "Postman", "Bug Tracking"],
    thumbnail: "/images/experience/sidigs.svg",
  },
  {
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    period: "2025 – Present",
    location: "Remote",
    summary:
      "Building systems and RESTful APIs for small to medium business needs under the CoreCraft studio.",
    achievements: [
      "Deployed a full-stack POS cashier system (Next.js & MySQL).",
      "Developed a warehouse stock management API (NestJS & Prisma).",
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM"],
    thumbnail: "/images/experience/independent.svg",
  },
  {
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    period: "2024 – Present",
    location: "Malang, Indonesia",
    summary:
      "Studying the fundamentals of algorithms, software development and database architecture.",
    achievements: [
      "Built a web-based digital archive system project.",
      "Achieved excellent vocational competency marks.",
    ],
    tech: ["PHP", "Node.js", "MySQL", "JavaScript"],
    thumbnail: "/images/experience/smk-telkom-malang.svg",
  },
];
