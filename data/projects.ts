export interface LocalizedString {
  id: string;
  en: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  type: "Backend" | "Frontend" | "Fullstack";
  color: string;
  desc: LocalizedString | string;
  problem?: LocalizedString | string;
  impact?: LocalizedString | string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "project-worknest",
    title: "WorkNest — Smart Space Booking & Management",
    category: "Fullstack SaaS Platform",
    type: "Fullstack",
    color: "border-sky-500/40 bg-sky-950/10",
    desc: {
      id: "Platform SaaS reservasi dan manajemen coworking space terintegrasi dengan pencarian ruangan real-time, terminal check-in QR Code, serta multi-role access control.",
      en: "Comprehensive coworking space reservation and management SaaS platform featuring real-time space search, QR Code check-in terminal, and multi-role access control."
    },
    problem: {
      id: "Kompleksitas penjadwalan ruang kerja bersama dan validasi check-in kehadiran manual yang rentan tumpang tindih waktu.",
      en: "Complex shared workspace scheduling and manual attendance check-in validation prone to double bookings."
    },
    impact: {
      id: "Menyederhanakan alur reservasi instan dengan validasi jadwal otomatis dan verifikasi check-in berbasis QR code terenkripsi.",
      en: "Streamlined instant reservation workflows with automated schedule validation and encrypted QR code check-in verification."
    },
    tech: ["Next.js 16", "Express.js", "MySQL", "Prisma ORM", "Tailwind CSS", "JWT Auth"],
    demoUrl: "https://booking.corecraft.my.id",
    repoUrl: "https://github.com/MohammadKevin",
    featured: true
  },
  {
    id: "project-1",
    title: "InvDocs — Digital Archive & Document Workflow",
    category: "Digital Archive System",
    type: "Fullstack",
    color: "border-amber-500/40 bg-amber-950/10",
    desc: {
      id: "Sistem pengarsipan dan manajemen dokumen digital terstruktur untuk organisasi dengan enkripsi berkas dan hak akses bertingkat (RBAC).",
      en: "Structured digital document archiving and management system for organizations with file encryption and role-based access control (RBAC)."
    },
    problem: {
      id: "Pengarsipan fisik yang berantakan dan lambatnya pencarian dokumen administratif lama.",
      en: "Messy physical archiving and slow retrieval of old administrative documents."
    },
    impact: {
      id: "Mempercepat waktu pencarian berkas dari hitungan jam menjadi < 3 detik dengan indeks metadata terstruktur.",
      en: "Accelerated file retrieval time from hours to < 3 seconds with structured metadata indexing."
    },
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/InvDocs-Archive",
    featured: true
  },
  {
    id: "project-2",
    title: "CorePOS — Multi-Outlet Cashier & Stock Engine",
    category: "Point of Sale System",
    type: "Fullstack",
    color: "border-emerald-500/40 bg-emerald-950/10",
    desc: {
      id: "Sistem kasir toko & UMKM dengan pencatatan transaksi real-time, barcode scanner, cetak struk faktur, serta rekonsiliasi inventaris harian.",
      en: "POS system for shops & SMEs with real-time transaction logging, barcode scanner, invoice receipt printing, and daily inventory reconciliation."
    },
    problem: {
      id: "Pencatatan kasir manual yang rawan selisih persediaan barang dan kesalahan kalkulasi kembalian.",
      en: "Manual cashier recording prone to inventory discrepancies and change calculation errors."
    },
    impact: {
      id: "Menghilangkan selisih persediaan fisik dengan akurasi pemotongan stok otomatis 100% pada transaksi kasir.",
      en: "Eliminated physical inventory discrepancies with 100% automatic stock deduction accuracy on POS transactions."
    },
    tech: ["React.js", "Express.js", "MySQL", "Prisma ORM", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: "",
    featured: true
  },
  {
    id: "project-3",
    title: "Inventory Management High-Throughput API",
    category: "Backend Engine",
    type: "Backend",
    color: "border-cyan-500/40 bg-cyan-950/10",
    desc: {
      id: "RESTful API high-throughput untuk pelacakan persediaan gudang, multi-warehouse batch logging, dan notifikasi stok kritis.",
      en: "High-throughput RESTful API for warehouse inventory tracking, multi-warehouse batch logging, and critical stock notifications."
    },
    problem: {
      id: "Lambatnya query pencarian stok barang dalam jumlah puluhan ribu baris data pada sistem gudang lama.",
      en: "Slow item stock search queries across tens of thousands of data rows in the legacy warehouse system."
    },
    impact: {
      id: "Mempercepat kueri pencarian persediaan sebesar 40% setelah penerapan database indexing dan Prisma query tuning.",
      en: "Sped up inventory search queries by 40% after implementing database indexing and Prisma query tuning."
    },
    tech: ["NestJS", "Node.js", "PostgreSQL", "Prisma ORM", "Redis"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/inventory-backend-engine",
    featured: true
  },
  {
    id: "project-4",
    title: "Digital Public Record Platform",
    category: "Web Application",
    type: "Fullstack",
    color: "border-blue-500/40 bg-blue-950/10",
    desc: {
      id: "Platform pengarsipan data publik dan catatan administratif sekolah/organisasi dengan proteksi otentikasi JWT.",
      en: "Public data archiving and school/organization administrative record platform with JWT authentication protection."
    },
    problem: {
      id: "Kebutuhan publikasi data arsip terbuka yang tetap menjamin kerahasiaan berkas internal.",
      en: "The need for open archive data publication while ensuring the confidentiality of internal files."
    },
    impact: {
      id: "Sistem berhasil menangani ribuan pengunduhan berkas dokumen publik dengan pengamanan akses granular.",
      en: "The system successfully handled thousands of public document file downloads with granular access security."
    },
    tech: ["Next.js", "Tailwind CSS", "Prisma ORM", "MySQL"],
    demoUrl: "",
    repoUrl: "",
    featured: false
  },
  {
    id: "project-5",
    title: "CoreCraft Personal Engineering Portfolio",
    category: "System Interface",
    type: "Frontend",
    color: "border-amber-500/40 bg-amber-950/10",
    desc: {
      id: "Website portofolio personal bertema studio editorial liquid-glass dengan transisi Dynamic Island, bilingual switch, dan performa tinggi.",
      en: "Personal engineering portfolio website featuring an editorial liquid-glass aesthetic, Dynamic Island transitions, bilingual switch, and high performance."
    },
    problem: {
      id: "Template portofolio SaaS generik yang tidak mencerminkan fokus arsitektur backend & system dev.",
      en: "Generic SaaS portfolio templates that do not reflect the focus on backend architecture & system development."
    },
    impact: {
      id: "Memberikan pengalaman visual unik bergaya Apple Dynamic Island dengan skor performa 100% Lighthouse.",
      en: "Provides a unique visual experience in an Apple Dynamic Island style with 100% Lighthouse performance score."
    },
    tech: ["Next.js 16", "Tailwind CSS", "TypeScript", "EmailJS"],
    demoUrl: "https://corecraft.my.id",
    repoUrl: "https://github.com/MohammadKevin/corecraft-portfolio",
    featured: true
  }
];
