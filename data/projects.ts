import type { Project } from "@/lib/types";
export const projects = [
  {
    slug: "worknest",
    order: 1,
    title: "WorkNest — Smart Space Booking & Management",
    shortTitle: "WorkNest",
    category: "Fullstack",
    studio: "Independent",
    year: 2026,
    badge: "SaaS",
    role: ["Fullstack Development", "API Architecture", "Database Design"],
    deliverables: [
      "Express REST API",
      "Prisma schema & migrations",
      "Next.js booking flow",
      "Encrypted QR check-in terminal",
      "Multi-role access control",
    ],
    tags: [
      "Next.js 16",
      "Express.js",
      "MySQL",
      "Prisma ORM",
      "Tailwind CSS",
      "JWT Auth",
    ],
    thumbnail: "/images/work/worknest.png",
    image: "/images/work/worknest.png",
    summary:
      "Comprehensive coworking space reservation and management SaaS platform featuring real-time space search, QR Code check-in terminal, and multi-role access control.",
    problem:
      "Coworking spaces tracked room bookings by hand, so the same slot could be promised to two different members and the front desk became the single point of failure.",
    architecture: [
      "Next.js 16 client rendering the booking flow",
      "Express.js REST API as the single write path",
      "Prisma ORM over MySQL with explicit reservation states",
      "JWT sessions with role-scoped access for staff, members and admins",
    ],
    solution: [
      "Reservations move through explicit states, so an invalid transition is rejected before it reaches the database.",
      "Availability is queried in real time against the same rows the check-in terminal writes to.",
      "Encrypted QR codes replace the front-desk booking sheet entirely.",
    ],
    metrics: [
      { value: "8 wks", label: "Discovery to live bookings" },
      { value: "3", label: "Access roles: staff, member, admin" },
      { value: "Real-time", label: "Availability across every room and slot" },
    ],
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
    order: 3,
    title: "InvDocs — Digital Archive & Document Workflow",
    shortTitle: "InvDocs",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    badge: "Real Project",
    role: ["Fullstack Development", "RBAC", "Metadata Indexing"],
    deliverables: [
      "Structured archive with metadata search",
      "RBAC down to the document level",
      "Encrypted upload pipeline",
      "Audit trail",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    thumbnail: "/images/work/invdocs.png",
    image: "/images/work/invdocs.png",
    summary:
      "Structured digital document archiving and management system for organizations with file encryption and role-based access control (RBAC).",
    problem:
      "Administrative records lived in physical binders, so retrieving a single old document could take hours and nothing recorded who had touched it.",
    architecture: [
      "Next.js front end over an Express.js API",
      "PostgreSQL with Prisma ORM and metadata-driven indexing",
      "Role-based access control evaluated per document",
      "Encrypted file storage with a full audit trail",
    ],
    solution: [
      "Documents are described by structured metadata, so search runs against the database instead of a shelf.",
      "Permissions are checked before a file is streamed, not after.",
      "Every read and write is logged, so the archive can answer who accessed what.",
    ],
    metrics: [
      { value: "< 3s", label: "Retrieval, down from hours" },
      { value: "RBAC", label: "Enforced to the document level" },
      { value: "Encrypted", label: "Uploads, with a full audit trail" },
    ],
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
    order: 4,
    title: "CorePOS — Multi-Outlet Cashier & Stock Engine",
    shortTitle: "CorePOS",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    badge: "SaaS",
    role: ["Fullstack Development", "Inventory Logic", "Receipt Printing"],
    deliverables: [
      "Cashier & transaction screen",
      "Barcode scanner integration",
      "Thermal receipt printing",
      "Daily inventory reconciliation",
    ],
    tags: ["React.js", "Express.js", "MySQL", "Prisma ORM", "Tailwind CSS"],
    thumbnail: "/images/work/corepos.png",
    image: "/images/work/corepos.png",
    summary:
      "POS system for shops & SMEs with real-time transaction logging, barcode scanner, invoice receipt printing, and daily inventory reconciliation.",
    problem:
      "Shops recorded sales on paper, which produced stock discrepancies and change-calculation errors that only surfaced at the end of the day.",
    architecture: [
      "React.js cashier interface",
      "Express.js API handling stock mutations transactionally",
      "MySQL accessed through Prisma ORM",
      "Thermal printer integration for invoices",
    ],
    solution: [
      "Stock is deducted inside the same transaction that records the sale.",
      "Barcode scanning removes manual SKU entry from the counter.",
      "A daily reconciliation report replaces the manual end-of-day count.",
    ],
    metrics: [
      { value: "100%", label: "Automatic stock deduction accuracy" },
      { value: "Multi-outlet", label: "Reconciled in a single daily report" },
      { value: "Thermal", label: "Receipt printing tuned for counter printers" },
    ],
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
    order: 5,
    title: "Inventory Management High-Throughput API",
    shortTitle: "Inventory API",
    category: "Backend",
    studio: "Independent",
    year: 2025,
    badge: "API",
    role: ["Backend Engineering", "Query Optimization", "API Design"],
    deliverables: [
      "Documented REST endpoints",
      "Multi-warehouse batch logging",
      "Query & index tuning",
      "Critical stock notifications",
    ],
    tags: ["NestJS", "Node.js", "PostgreSQL", "Prisma ORM", "Redis"],
    thumbnail: "/images/work/inventory-api.png",
    image: "/images/work/inventory-api.png",
    summary:
      "High-throughput RESTful API for warehouse inventory tracking, multi-warehouse batch logging, and critical stock notifications.",
    problem:
      "Legacy warehouse queries crawled across tens of thousands of rows, so a simple stock lookup could stall the operations team.",
    architecture: [
      "NestJS modules with DTO-validated endpoints",
      "PostgreSQL as the relational store",
      "Prisma ORM for typed queries and migrations",
      "Redis caching in front of repeated lookups",
    ],
    solution: [
      "Indexes were aligned to the query shapes that actually ran on the hot paths.",
      "Prisma queries were rewritten to stop over-fetching rows the caller never read.",
      "Critical stock levels emit notifications instead of waiting to be noticed.",
    ],
    metrics: [
      { value: "40%", label: "Faster inventory search queries" },
      { value: "Tens of thousands", label: "Rows the legacy queries crawled" },
      { value: "Redis", label: "Caching in front of repeated lookups" },
    ],
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
    order: 6,
    title: "Clinic & Pharmacy Portal — Public Archive & JWT Auth",
    shortTitle: "Madyopuro Clinic",
    category: "Fullstack",
    studio: "Independent",
    year: 2025,
    badge: "Real Project",
    role: ["Fullstack Development", "JWT Authentication", "Public Archiving"],
    deliverables: [
      "Public document archive",
      "JWT-protected admin area",
      "Granular file access control",
      "Community-facing download flow",
    ],
    tags: ["Next.js", "Tailwind CSS", "Prisma ORM", "MySQL"],
    thumbnail: "/images/work/clinic-portal.png",
    image: "/images/work/clinic-portal.png",
    summary:
      "Public data archiving and administrative record platform with JWT authentication protection and granular file access security.",
    problem:
      "The clinic needed to publish records for the community without ever exposing its internal files, and had no way to enforce that boundary.",
    architecture: [
      "Next.js front end styled with Tailwind CSS",
      "Prisma ORM over MySQL",
      "JWT authentication guarding every administrative route",
      "Two record classes — public and internal — separated at the data layer",
    ],
    solution: [
      "Public and internal records are split in the data model rather than hidden in the interface.",
      "JWT sessions gate the administrative area end to end.",
      "File access is granted per record instead of per folder.",
    ],
    metrics: [
      { value: "JWT", label: "Gating every administrative route" },
      { value: "Granular", label: "File-level access control" },
      { value: "Thousands", label: "Public document downloads served" },
    ],
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
    order: 7,
    title: "CoreCraft Personal Engineering Portfolio",
    shortTitle: "CoreCraft Portfolio",
    category: "Fullstack",
    studio: "CoreCraft",
    year: 2026,
    badge: "Portfolio",
    role: ["Design", "Frontend Development", "SEO"],
    deliverables: [
      "Editorial home page",
      "Statically generated case studies",
      "Shared motion system",
      "SEO, sitemap and robots",
    ],
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS"],
    thumbnail: "/images/work/corecraft.png",
    image: "/images/work/corecraft.png",
    summary:
      "Personal engineering portfolio with an editorial aesthetic, a single shared motion system, and a 100% Lighthouse performance score.",
    problem:
      "The previous portfolio described projects in prose, which made the engineering behind each one hard to verify.",
    architecture: [
      "Next.js 16 App Router with React Server Components",
      "TypeScript in strict mode throughout",
      "Tailwind CSS v4 design tokens",
      "Framer Motion and Lenis, gated behind prefers-reduced-motion",
    ],
    solution: [
      "Every project is a statically generated case study rather than a card in a grid.",
      "Motion is progressive enhancement — the site is complete and readable without it.",
      "One spring and one easing curve keep interaction timing consistent everywhere.",
    ],
    metrics: [
      { value: "100", label: "Lighthouse performance score" },
      { value: "Static", label: "Every case study pre-rendered" },
      { value: "A11y", label: "Keyboard and reduced-motion support" },
    ],
    liveUrl: "https://corecraft.my.id",
    sourceUrl: "https://github.com/MohammadKevin/corecraft-portfolio",
    gallery: [
      {
        src: "/images/work/corecraft-01.svg",
        alt: "CoreCraft portfolio hero section",
        caption: "Editorial hero with the outline-and-solid display name.",
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
    order: 2,
    title: "Outer.Co — Boutique Florist E-Commerce",
    shortTitle: "Outer.Co",
    category: "E-Commerce",
    client: "Outer.Co",
    year: 2025,
    badge: "E-Commerce",
    role: ["Frontend Development", "Catalog Architecture", "Admin Panel"],
    deliverables: [
      "Product catalogue with multi-image galleries",
      "WhatsApp checkout flow",
      "Admin CRUD panel",
      "Multi-branch support",
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "Cloudinary",
      "Google Sheets API",
    ],
    thumbnail: "/images/work/outerco.png",
    image: "/images/work/outerco.png",
    summary:
      "Boutique florist e-commerce platform with rich product catalog, multi-image galleries, WhatsApp checkout, multi-branch support (Surabaya, Kediri, Denpasar), and a full admin CRUD panel.",
    problem:
      "A local florist needed an online store that staff without programming experience could maintain, with simple checkout and no payment gateway.",
    architecture: [
      "Next.js 16 with TypeScript and Tailwind CSS 4",
      "Cloudinary for multi-image product galleries",
      "Google Sheets API as the catalogue store",
      "A multi-branch structure for Surabaya, Kediri and Denpasar",
    ],
    solution: [
      "The catalogue is edited in a spreadsheet the staff already understood.",
      "Checkout composes a formatted WhatsApp message instead of redirecting to a gateway.",
      "An admin CRUD panel covers products, branches and galleries.",
    ],
    metrics: [
      { value: "3", label: "Branches: Surabaya, Kediri, Denpasar" },
      { value: "No gateway", label: "Formatted WhatsApp checkout" },
      { value: "CRUD", label: "Admin panel built for non-programmers" },
    ],
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
] satisfies Project[];

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
