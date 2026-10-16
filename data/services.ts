import type { Service } from "@/lib/types";

export const services = [
  {
    id: "backend-api",
    title: "Backend & RESTful API Architecture",
    description:
      "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication and OpenAPI/Swagger documentation. Every endpoint is designed to stay predictable as the product grows.",
    deliverables: [
      "Resource-oriented REST endpoints",
      "DTO validation & typed contracts",
      "JWT / OAuth2 authentication",
      "OpenAPI documentation",
    ],
    stack: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
    preview: "/images/services/backend-api.svg",
  },
  {
    id: "database-tuning",
    title: "Database Engineering & Query Tuning",
    description:
      "Efficient relational PostgreSQL/MySQL schemas, structured query indexing, Prisma ORM migrations and Redis caching. On the inventory engine this cut search time by 40%.",
    deliverables: [
      "Normalised schema design",
      "Index strategy for hot paths",
      "Prisma migrations",
      "Redis caching layer",
    ],
    stack: ["PostgreSQL", "MySQL", "Prisma ORM", "Redis"],
    preview: "/images/services/database-tuning.svg",
  },
  {
    id: "fullstack-apps",
    title: "Fullstack Web Applications",
    description:
      "End-to-end web apps with Next.js App Router, React Server Components, type-safe TypeScript and Tailwind CSS. Built for SEO, speed and long-term maintainability.",
    deliverables: [
      "Server-rendered Next.js app",
      "Type-safe client & server",
      "Responsive Tailwind interface",
      "SEO, sitemap & metadata",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma ORM"],
    preview: "/images/services/fullstack-apps.svg",
  },
  {
    id: "pos-inventory",
    title: "POS & Inventory Management Systems",
    description:
      "Multi-branch cashier systems with barcode scanner, real-time stock mutation, digital invoices and precise transaction audit logs. Daily reconciliation replaces manual counting.",
    deliverables: [
      "Cashier & transaction flow",
      "Barcode scanner integration",
      "Thermal receipt printing",
      "Daily reconciliation report",
    ],
    stack: ["React.js", "Express.js", "MySQL", "Prisma ORM"],
    preview: "/images/services/pos-inventory.svg",
  },
  {
    id: "digital-archive",
    title: "Digital Document & Archive Systems",
    description:
      "Structured archiving with metadata tagging, role-based access control (RBAC) and encrypted file storage. Retrieval that used to take hours now takes seconds.",
    deliverables: [
      "Metadata-indexed archive",
      "Document-level RBAC",
      "Encrypted upload pipeline",
      "Full access audit trail",
    ],
    stack: ["Next.js", "Express.js", "PostgreSQL", "RBAC"],
    preview: "/images/services/digital-archive.svg",
  },
  {
    id: "integrations",
    title: "Payment Gateway & Third-Party Integrations",
    description:
      "Payment gateway integration (Midtrans/Xendit), idempotent webhooks and asynchronous data synchronization. Each integration is wrapped behind a typed, testable boundary.",
    deliverables: [
      "Payment gateway integration",
      "Idempotent webhook handling",
      "Async data synchronisation",
      "Typed integration boundary",
    ],
    stack: ["Midtrans", "Xendit", "Cloudinary", "Webhooks"],
    preview: "/images/services/integrations.svg",
  },
] satisfies Service[];
