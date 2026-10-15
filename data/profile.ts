import type { Profile } from "@/lib/types";

/**
 * Source: data/whoami.ts on the previous (main) version of the site.
 * Only the fields the redesign needs are kept, plus the headline metrics the
 * Statement section renders.
 */
export const profile: Profile = {
  firstName: "MOHAMMAD",
  lastName: "KEVIN",
  fullName: "Mohammad Kevin Arif Rudianto",
  role: "Backend & Fullstack Software Engineer",
  subtitle:
    "Backend & Fullstack Developer building reliable APIs, POS systems and digital archives.",
  manifesto: [
    "I build the unglamorous parts well — the schema, the query plan, the retry that never fires twice.",
    "Every system I ship is measured by one thing: whether it still holds up a year after launch.",
  ],
  availableForProjects: true,
  avatar: "/images/profile-removebg.png",
  email: "kvn4.200581@gmail.com",
  whatsappUrl: "https://wa.me/6282131588846",
  cvUrl: "/CV Mohammad Kevin.pdf",
  location: "Malang, East Java",
  timezone: "Asia/Jakarta",
  socials: [
    { label: "GitHub", url: "https://github.com/MohammadKevin" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mohammad-kevin16",
    },
    { label: "WhatsApp", url: "https://wa.me/6282131588846" },
  ],
  stats: [
    {
      value: "2+",
      label: "Years of Engineering",
      detail: "Shipping production systems since 2024, from schema to interface.",
    },
    {
      value: "07",
      label: "Production Platforms Built",
      detail: "Booking, archiving, POS, inventory and commerce systems in live use.",
    },
    {
      value: "13",
      label: "Industry Certifications",
      detail: "Verified by HackerRank, Dicoding and national competition bodies.",
    },
  ],
};

/** Short bio reused on the home page and in the project detail "Contact Me" block. */
export const bio =
  "I am a Fullstack & Backend Developer specializing in the Next.js, NestJS, Express and Prisma ORM ecosystem, along with PostgreSQL & MySQL relational database management. I focus on solving API architecture integration issues, optimizing SQL query performance, and building reliable POS & Digital Archive systems.";
