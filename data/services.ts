export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Backend & RESTful API Architecture",
    description:
      "Modular APIs with NestJS & Express, DTO validation, JWT/OAuth2 authentication and OpenAPI/Swagger documentation. Every endpoint is designed to stay predictable as the product grows.",
    tags: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
  },
  {
    number: "02",
    title: "Database Engineering & Query Tuning",
    description:
      "Relational schema design, indexing and query optimization built for surge traffic.",
    tags: ["PostgreSQL", "MySQL", "Prisma ORM"],
  },
  {
    number: "03",
    title: "Fullstack Web Applications",
    description:
      "Clean, intuitive interfaces on top of strict API contracts.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "04",
    title: "POS & Inventory Management Systems",
    description:
      "Transaction-safe stock and sales flows with barcode scanning and invoicing.",
    tags: ["Express.js", "MySQL"],
  },
  {
    number: "05",
    title: "Digital Document & Archive Systems",
    description:
      "Structured archiving with file encryption and role-based access control.",
    tags: ["PostgreSQL", "RBAC"],
  },
  {
    number: "06",
    title: "Payment Gateway & Third-Party Integrations",
    description:
      "Webhook-safe payments and external integrations with retry handling.",
    tags: ["Webhooks", "REST"],
  },
];

export const servicesId: ServiceItem[] = [
  {
    number: "01",
    title: "Arsitektur Backend & RESTful API",
    description:
      "API modular dengan NestJS & Express, validasi DTO, autentikasi JWT/OAuth2, serta dokumentasi OpenAPI/Swagger. Setiap endpoint dirancang agar tetap terprediksi seiring pertumbuhan produk.",
    tags: ["NestJS", "Express.js", "Node.js", "OpenAPI", "Postman"],
  },
  {
    number: "02",
    title: "Rekayasa Basis Data & Optimasi Query",
    description:
      "Perancangan skema relasional, pengindeksan strategis, dan optimasi query SQL untuk menopang lonjakan trafik.",
    tags: ["PostgreSQL", "MySQL", "Prisma ORM"],
  },
  {
    number: "03",
    title: "Aplikasi Web Fullstack",
    description:
      "Antarmuka bersih dan intuitif yang berdiri di atas kontrak API yang ketat dan bertipe aman.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "04",
    title: "Sistem Kasir POS & Manajemen Inventori",
    description:
      "Alur transaksi penjualan dan stok aman transaksi atomik lengkap dengan pemindaian barcode serta cetak faktur.",
    tags: ["Express.js", "MySQL"],
  },
  {
    number: "05",
    title: "Sistem Dokumen Digital & Arsip",
    description:
      "Pengarsipan terstruktur dengan enkripsi file dan kendali akses berbasis peran (RBAC).",
    tags: ["PostgreSQL", "RBAC"],
  },
  {
    number: "06",
    title: "Integrasi Payment Gateway & Pihak Ketiga",
    description:
      "Alur pembayaran aman webhook dan integrasi eksternal dengan manajemen retry otomatis.",
    tags: ["Webhook", "REST"],
  },
];
