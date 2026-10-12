import type { Project } from "@/lib/types";

/**
 * Remapped from the previous `data/projects.ts` (7 projects).
 *
 * Asumsi:
 * - The old `type` field only knew Backend / Frontend / Fullstack, while the
 *   new `ProjectCategory` union is Fullstack / Backend / E-Commerce. The two
 *   former "Frontend" entries were therefore reclassified: the Clinic &
 *   Pharmacy Portal is a fullstack web app (Next.js + Prisma + JWT), and
 *   Outer.Co is genuinely an e-commerce build.
 * - `year`, `role` and `timeline` did not exist before. `year` comes from the
 *   previous `data/timeline.ts` entries, `role` from each project's stack, and
 *   `timeline` was written from the problem/impact notes that already existed.
 * - `client` / `studio` were never recorded. Self-built products use
 *   `studio: "Independent"`, the portfolio uses `studio: "CoreCraft"`, and
 *   Outer.Co uses `client: "Outer.Co"`.
 */
export const projects: Project[] = [
  {
    slug: "worknest",
    title: "WorkNest — Smart Space Booking & Management",
    category: "Fullstack",
    studio: "Independent",
    year: 2026,
    role: ["Fullstack Development", "API Architecture", "Database Design"],
    tags: [
      "Next.js 16",
      "Express.js",
      "MySQL",
      "Prisma ORM",
      "Tailwind CSS",
      "JWT Auth",
    ],
    thumbnail: "/images/work/worknest-cover.svg",
    summary:
      "Comprehensive coworking space reservation and management SaaS platform featuring real-time space search, QR Code check-in terminal, and multi-role access control.",
    liveUrl: "https://booking.corecraft.my.id",
    sourceUrl: "https://github.com/MohammadKevin",
    gallery: [
      {
        src: "/images/work/worknest-01.svg",
        alt: "WorkNest real-time space search screen",
        caption: "Real-time availability search across rooms and time slots.",
      },
      {
        src: "/images/work/worknest-02.svg",
        alt: "WorkNest QR code check-in terminal",
        caption: "Encrypted QR code check-in terminal.",
      },
      {
        src: "/images/work/worknest-03.svg",
        alt: "WorkNest multi-role access control panel",
        caption: "Multi-role access control for staff, members and admins.",
      },
    ],
    timeline: [
      {
        phase: "Discovery",
        period: "Week 1–2",
        detail:
          "Mapped the double-booking problem and defined reservation states before writing any code.",
      },
      {
        phase: "Build",
        period: "Week 3–7",
        detail:
          "Shipped the Express API, the Prisma schema and the Next.js booking flow in parallel.",
      },
      {
        phase: "Ship",
        period: "Week 8",
        detail:
          "Added encrypted QR check-in and deployed the platform for live bookings.",
      },
    ],
  },
  {
    slug: "invdocs",
    title: "InvDocs — Digital Archive & Document Workflow",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    role: ["Fullstack Development", "RBAC", "Metadata Indexing"],
    tags: ["Next.js", "Express.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    thumbnail: "/images/work/invdocs-cover.svg",
    summary:
      "Structured digital document archiving and management system for organizations with file encryption and role-based access control (RBAC).",
    sourceUrl: "https://github.com/MohammadKevin/InvDocs-Archive",
    gallery: [
      {
        src: "/images/work/invdocs-01.svg",
        alt: "InvDocs document archive listing",
        caption: "Structured archive with metadata-driven search.",
      },
      {
        src: "/images/work/invdocs-02.svg",
        alt: "InvDocs role-based access control settings",
        caption: "Role-based access control down to the document level.",
      },
      {
        src: "/images/work/invdocs-03.svg",
        alt: "InvDocs encrypted document upload flow",
        caption: "Encrypted uploads with a full audit trail.",
      },
    ],
    timeline: [
      {
        phase: "Problem",
        period: "Phase 01",
        detail:
          "Messy physical archiving made retrieving old administrative documents take hours.",
      },
      {
        phase: "Build",
        period: "Phase 02",
        detail:
          "Introduced structured metadata indexing, file encryption and tiered permissions.",
      },
      {
        phase: "Result",
        period: "Phase 03",
        detail: "File retrieval time dropped from hours to under 3 seconds.",
      },
    ],
  },
  {
    slug: "corepos",
    title: "CorePOS — Multi-Outlet Cashier & Stock Engine",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    role: ["Fullstack Development", "Inventory Logic", "Receipt Printing"],
    tags: ["React.js", "Express.js", "MySQL", "Prisma ORM", "Tailwind CSS"],
    thumbnail: "/images/work/corepos-cover.svg",
    summary:
      "POS system for shops & SMEs with real-time transaction logging, barcode scanner, invoice receipt printing, and daily inventory reconciliation.",
    gallery: [
      {
        src: "/images/work/corepos-01.svg",
        alt: "CorePOS cashier transaction screen",
        caption: "Real-time transaction logging with barcode scanning.",
      },
      {
        src: "/images/work/corepos-02.svg",
        alt: "CorePOS invoice receipt printing",
        caption: "Invoice receipt printing tuned for thermal printers.",
      },
      {
        src: "/images/work/corepos-03.svg",
        alt: "CorePOS daily inventory reconciliation report",
        caption: "Daily inventory reconciliation across outlets.",
      },
    ],
    timeline: [
      {
        phase: "Problem",
        period: "Phase 01",
        detail:
          "Manual cashier recording caused stock discrepancies and change calculation errors.",
      },
      {
        phase: "Build",
        period: "Phase 02",
        detail: "Automated stock deduction, barcode scanning and receipt printing.",
      },
      {
        phase: "Result",
        period: "Phase 03",
        detail:
          "100% automatic stock deduction accuracy on every POS transaction.",
      },
    ],
  },
  {
    slug: "inventory-api",
    title: "Inventory Management High-Throughput API",
    category: "Backend",
    studio: "Independent",
    year: 2025,
    role: ["Backend Engineering", "Query Optimization", "API Design"],
    tags: ["NestJS", "Node.js", "PostgreSQL", "Prisma ORM", "Redis"],
    thumbnail: "/images/work/inventory-api-cover.svg",
    summary:
      "High-throughput RESTful API for warehouse inventory tracking, multi-warehouse batch logging, and critical stock notifications.",
    sourceUrl: "https://github.com/MohammadKevin/inventory-backend-engine",
    gallery: [
      {
        src: "/images/work/inventory-api-01.svg",
        alt: "Inventory API endpoint documentation",
        caption: "Documented REST endpoints with request validation.",
      },
      {
        src: "/images/work/inventory-api-02.svg",
        alt: "Inventory API multi-warehouse batch logging",
        caption: "Multi-warehouse batch logging.",
      },
      {
        src: "/images/work/inventory-api-03.svg",
        alt: "Inventory API critical stock notification flow",
        caption: "Critical stock notifications pushed to operations.",
      },
    ],
    timeline: [
      {
        phase: "Problem",
        period: "Phase 01",
        detail:
          "Legacy warehouse queries crawled across tens of thousands of rows.",
      },
      {
        phase: "Build",
        period: "Phase 02",
        detail:
          "Applied database indexing and Prisma query tuning to the hot paths.",
      },
      {
        phase: "Result",
        period: "Phase 03",
        detail: "Inventory search queries became 40% faster.",
      },
    ],
  },
  {
    slug: "clinic-portal",
    title: "Clinic & Pharmacy Portal — Public Archive & JWT Auth",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    role: ["Fullstack Development", "JWT Authentication", "Public Archiving"],
    tags: ["Next.js", "Tailwind CSS", "Prisma ORM", "MySQL"],
    thumbnail: "/images/work/clinic-portal-cover.svg",
    summary:
      "Public data archiving and administrative record platform with JWT authentication protection and granular file access security.",
    gallery: [
      {
        src: "/images/work/clinic-portal-01.svg",
        alt: "Clinic portal public document archive",
        caption: "Public document archive open to the community.",
      },
      {
        src: "/images/work/clinic-portal-02.svg",
        alt: "Clinic portal JWT authentication screen",
        caption: "JWT-protected administrative area.",
      },
      {
        src: "/images/work/clinic-portal-03.svg",
        alt: "Clinic portal granular file access settings",
        caption: "Granular access control for internal files.",
      },
    ],
    timeline: [
      {
        phase: "Problem",
        period: "Phase 01",
        detail:
          "Public archives had to be published without exposing internal files.",
      },
      {
        phase: "Build",
        period: "Phase 02",
        detail: "Split public and internal records behind JWT authentication.",
      },
      {
        phase: "Result",
        period: "Phase 03",
        detail:
          "Thousands of public document downloads handled with granular access security.",
      },
    ],
  },
  {
    slug: "corecraft",
    title: "CoreCraft Personal Engineering Portfolio",
    category: "Fullstack",
    studio: "CoreCraft",
    year: 2026,
    role: ["Design", "Frontend Development", "SEO"],
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS"],
    thumbnail: "/images/work/corecraft-cover.svg",
    summary:
      "Personal engineering portfolio with an editorial liquid-glass aesthetic, Dynamic Island transitions, and a 100% Lighthouse performance score.",
    liveUrl: "https://corecraft.my.id",
    sourceUrl: "https://github.com/MohammadKevin/corecraft-portfolio",
    gallery: [
      {
        src: "/images/work/corecraft-01.svg",
        alt: "CoreCraft portfolio hero section",
        caption: "Editorial hero with the liquid-glass surface treatment.",
      },
      {
        src: "/images/work/corecraft-02.svg",
        alt: "CoreCraft portfolio project gallery",
        caption: "Project gallery with filterable categories.",
      },
      {
        src: "/images/work/corecraft-03.svg",
        alt: "CoreCraft portfolio performance score",
        caption: "100% Lighthouse performance score.",
      },
    ],
  },
  {
    slug: "outerco",
    title: "Outer.Co — Boutique Florist E-Commerce",
    category: "E-Commerce",
    client: "Outer.Co",
    year: 2025,
    role: ["Frontend Development", "Catalog Architecture", "Admin Panel"],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "Cloudinary",
      "Google Sheets API",
    ],
    thumbnail: "/images/work/outerco-cover.svg",
    summary:
      "Boutique florist e-commerce platform with rich product catalog, multi-image galleries, WhatsApp checkout, multi-branch support (Surabaya, Kediri, Denpasar), and a full admin CRUD panel.",
    liveUrl: "https://outerco.id",
    gallery: [
      {
        src: "/images/work/outerco-01.svg",
        alt: "Outer.Co product catalog listing",
        caption: "Rich product catalog with multi-image galleries.",
      },
      {
        src: "/images/work/outerco-02.svg",
        alt: "Outer.Co WhatsApp checkout flow",
        caption: "Formatted WhatsApp checkout without a payment gateway.",
      },
      {
        src: "/images/work/outerco-03.svg",
        alt: "Outer.Co admin CRUD panel",
        caption: "Admin CRUD panel built for non-programmers.",
      },
    ],
    timeline: [
      {
        phase: "Problem",
        period: "Phase 01",
        detail:
          "A local florist needed an online store manageable by non-programmers, with simple checkout and no payment gateway.",
      },
      {
        phase: "Build",
        period: "Phase 02",
        detail:
          "Built the catalog, multi-branch support and a full admin CRUD panel.",
      },
      {
        phase: "Result",
        period: "Phase 03",
        detail:
          "Customers order bouquets independently through an interactive catalog with instant WhatsApp checkout.",
      },
    ],
  },
];

export const projectCategories = [
  "All",
  "Fullstack",
  "Backend",
  "E-Commerce",
] as const;

export type ProjectFilter = (typeof projectCategories)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  return {
    previous: projects[(safeIndex - 1 + projects.length) % projects.length],
    next: projects[(safeIndex + 1) % projects.length],
  };
}
