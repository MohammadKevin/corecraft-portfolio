import type { Profile } from "@/lib/types";

/**
 * Source: data/whoami.ts on the previous (main) version of the site.
 * Only the fields the redesign needs are kept.
 */
export const profile: Profile = {
  firstName: "MOHAMMAD",
  lastName: "KEVIN",
  subtitle:
    "Backend & Fullstack Developer building reliable APIs, POS systems and digital archives.",
  availableForProjects: true,
  avatar: "/images/profile-photo.webp",
  email: "kvn4.200581@gmail.com",
  whatsappUrl: "https://wa.me/6282131588846",
  socials: [
    { label: "GitHub", url: "https://github.com/MohammadKevin" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347/",
    },
    { label: "WhatsApp", url: "https://wa.me/6282131588846" },
  ],
};

/** Short bio reused on the home page and in the project detail "Contact Me" block. */
export const bio =
  "I am a Fullstack & Backend Developer specializing in the Next.js, NestJS, Express and Prisma ORM ecosystem, along with PostgreSQL & MySQL relational database management. I focus on solving API architecture integration issues, optimizing SQL query performance, and building reliable POS & Digital Archive systems.";
