import type { Service } from "@/lib/types";

/**
 * Remapped from the previous `components/AllServicesModal.tsx` (6 services)
 * plus `data/skills.ts`. Descriptions were tightened to two sentences max,
 * as required by the spec.
 */
export const services: Service[] = [
  {
    id: "backend-api",
    title: "Backend & RESTful API",
    description:
      "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication and OpenAPI/Swagger documentation. Every endpoint is designed to stay predictable as the product grows.",
    stack: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
    preview: "/images/services/backend-api.svg",
  },
  {
    id: "database-tuning",
    title: "Database & Query Tuning",
    description:
      "Efficient relational PostgreSQL/MySQL schemas, structured query indexing, Prisma ORM migrations and Redis caching. On the inventory engine this cut search time by 40%.",
    stack: ["PostgreSQL", "MySQL", "Prisma ORM", "Redis"],
    preview: "/images/services/database-tuning.svg",
  },
  {
    id: "fullstack-apps",
    title: "Fullstack Web Apps",
    description:
      "End-to-end web apps with Next.js App Router, React Server Components, type-safe TypeScript and Tailwind CSS. Built for SEO, speed and long-term maintainability.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma ORM"],
    preview: "/images/services/fullstack-apps.svg",
  },
  {
    id: "pos-inventory",
    title: "POS & Inventory Systems",
    description:
      "Multi-branch cashier systems with barcode scanner, real-time stock mutation, digital invoices and precise transaction audit logs. Daily reconciliation replaces manual counting.",
    stack: ["React.js", "Express.js", "MySQL", "Prisma ORM"],
    preview: "/images/services/pos-inventory.svg",
  },
  {
    id: "digital-archive",
    title: "Digital Archive & Records",
    description:
      "Structured archiving with metadata tagging, role-based access control (RBAC) and encrypted file storage. Retrieval that used to take hours now takes seconds.",
    stack: ["Next.js", "Express.js", "PostgreSQL", "RBAC"],
    preview: "/images/services/digital-archive.svg",
  },
  {
    id: "integrations",
    title: "Third-Party API & Payments",
    description:
      "Payment gateway integration (Midtrans/Xendit), idempotent webhooks and asynchronous data synchronization. Each integration is wrapped behind a typed, testable boundary.",
    stack: ["Cloudinary", "Google Sheets API", "WhatsApp", "Webhooks"],
    preview: "/images/services/integrations.svg",
  },
];
