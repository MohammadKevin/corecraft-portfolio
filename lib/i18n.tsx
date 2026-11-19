"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { certificates, profile } from "@/data";
import { projects } from "@/data/projects";
import { services, servicesId } from "@/data/services";
import { processSteps, processStepsId } from "@/data/process";
import { stackGroups, stackGroupsId } from "@/data/stack";
import { experience, experienceId } from "@/data/experience";
import {
  formalEducation,
  formalEducationId,
  nonFormalEducation,
  nonFormalEducationId,
} from "@/data/education";
import type { Certificate, EducationType, Profile, Project } from "@/lib/types";

export interface EducationItem {
  date: string;
  institution: string;
  title: string;
  note: string;
  type: EducationType;
}


export type Language = "en" | "id";

const STORAGE_KEY = "corecraft-lang";
const LANG_EVENT = "corecraft-lang-change";

function readStoredLang(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "id" || saved === "en" ? saved : "en";
  } catch {
    return "en";
  }
}

function getServerLang(): Language {
  return "en";
}

function subscribeLang(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_EVENT, callback);
  };
}

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, readStoredLang, getServerLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable
    }
    document.documentElement.lang = next;
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === "en" ? "id" : "en"),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const NAV_SECTIONS: Record<
  Language,
  {
    sections: string[];
    desktopQuickIds: (
      | "hero"
      | "about"
      | "services"
      | "process"
      | "stack"
      | "work"
      | "experience"
      | "education"
      | "contact"
    )[];
    subpageLinks: { label: string; href: string }[];
    subpageMobileLinks: { label: string; href: string }[];
    menuLabel: string;
    closeLabel: string;
    allSectionsLabel: string;
    workArchiveCta: string;
    resumeCta: string;
    letsTalkCta: string;
    navAriaLabel: string;
    langSwitchAriaLabel: string;
  }
> = {
  en: {
    sections: [
      "Hero",
      "About",
      "Services",
      "Process",
      "Stack",
      "Work",
      "Credentials",
      "Experience",
      "Education",
      "Contact",
    ],
    desktopQuickIds: [
      "about",
      "services",
      "process",
      "stack",
      "work",
      "experience",
      "education",
    ],
    subpageLinks: [
      { label: "Home", href: "/" },
      { label: "Work Archive", href: "/work" },
      { label: "Education", href: "/#education" },
      { label: "Experience", href: "/#experience" },
      { label: "Contact", href: "/#contact" },
    ],
    subpageMobileLinks: [
      { label: "Home", href: "/" },
      { label: "All Systems", href: "/work" },
      { label: "Education", href: "/#education" },
      { label: "Experience", href: "/#experience" },
      { label: "Credentials", href: "/#credentials" },
      { label: "Contact", href: "/#contact" },
    ],
    menuLabel: "Menu",
    closeLabel: "Close",
    allSectionsLabel: "All Sections",
    workArchiveCta: "Work Archive (07) ↗",
    resumeCta: "Resume PDF ↗",
    letsTalkCta: "Let's talk ↗",
    navAriaLabel: "Desktop Navigation",
    langSwitchAriaLabel: "Switch language",
  },
  id: {
    sections: [
      "Utama",
      "Tentang",
      "Layanan",
      "Proses",
      "Teknologi",
      "Karya",
      "Sertifikasi",
      "Pengalaman",
      "Pendidikan",
      "Kontak",
    ],
    desktopQuickIds: [
      "about",
      "services",
      "process",
      "stack",
      "work",
      "experience",
      "education",
    ],
    subpageLinks: [
      { label: "Beranda", href: "/" },
      { label: "Arsip Karya", href: "/work" },
      { label: "Pendidikan", href: "/#education" },
      { label: "Pengalaman", href: "/#experience" },
      { label: "Kontak", href: "/#contact" },
    ],
    subpageMobileLinks: [
      { label: "Beranda", href: "/" },
      { label: "Semua Sistem", href: "/work" },
      { label: "Pendidikan", href: "/#education" },
      { label: "Pengalaman", href: "/#experience" },
      { label: "Sertifikasi", href: "/#credentials" },
      { label: "Kontak", href: "/#contact" },
    ],
    menuLabel: "Menu",
    closeLabel: "Tutup",
    allSectionsLabel: "Semua Bagian",
    workArchiveCta: "Arsip Karya (07) ↗",
    resumeCta: "CV PDF ↗",
    letsTalkCta: "Mari diskusi ↗",
    navAriaLabel: "Navigasi Desktop",
    langSwitchAriaLabel: "Ubah bahasa",
  },
};

export function getLocalizedProfile(lang: Language): Profile {
  if (lang === "en") return profile;
  return {
    ...profile,
    role: "Insinyur Perangkat Lunak Backend & Fullstack",
    subtitle:
      "Pengembang Backend & Fullstack yang merancang API andal, sistem kasir POS, dan arsip dokumen digital.",
    manifesto: [
      "Saya membangun bagian penting di balik layar dengan presisi — skema database, rencana query, dan retry transaksi yang tidak pernah gagal ganda.",
      "Setiap sistem yang saya rilis diukur dari satu hal: tetap tangguh setahun setelah peluncuran.",
    ],
    location: "Malang, Jawa Timur",
    stats: [
      {
        value: "2+",
        label: "Tahun Pengalaman",
        detail: "Merilis sistem produksi sejak 2024, dari skema hingga antarmuka.",
      },
      {
        value: "07",
        label: "Platform Produksi",
        detail: "Sistem reservasi, arsip digital, POS, inventori, dan e-commerce aktif.",
      },
      {
        value: "13",
        label: "Sertifikasi Industri",
        detail: "Terverifikasi oleh HackerRank, Dicoding, dan kompetisi nasional.",
      },
    ],
    aboutHeadline:
      "Merancang fondasi backend berkonkurensi tinggi, kontrak API yang tangguh, dan sistem data teroptimasi query — berpadu dengan antarmuka modern yang berpusat pada manusia.",
    aboutText:
      "Perangkat lunak modern jarang tumbang pada jalur normal, melainkan pada kondisi ekstrem: tabel relasional tanpa indeks saat trafik melonjak, race condition transaksi stok, atau retry webhook tanpa pengaman. Pendekatan saya dimulai dari lapisan skema dan protokol — merancang kontrak TypeScript ketat, isolasi transaksi, dan strategi caching terukur sebelum menyajikan pengalaman frontend yang bersih dengan Next.js dan React 19.",
    specialization: "Berpengalaman di Node.js, Express, NestJS, Prisma & Next.js",
    architectureNote: "Arsitektur TypeScript Ketat",
  };
}

const CERTIFICATE_CATEGORY_ID: Record<string, string> = {
  "Technical Skill": "Keahlian Teknis",
  "Backend Engineering": "Rekayasa Backend",
  "Role Certification": "Sertifikasi Peran",
  "Programming Language": "Bahasa Pemrograman",
  "Frontend UI": "UI Frontend",
  "National Hackathon": "Hackathon Nasional",
  "National Competition": "Kompetisi Nasional",
  "Professional Course": "Kursus Profesional",
  "Specialized Course": "Kursus Spesialis",
};

const CERTIFICATE_TITLE_ID: Record<string, string> = {
  "cert-dicoding-js": "Belajar Dasar Pemrograman JavaScript",
  "cert-dicoding-web": "Belajar Dasar Pemrograman Web",
  "cert-dicoding-fin": "Pengenalan Literasi Finansial",
  "cert-codecollab-2024":
    'Hackathon Nasional "CodeCollab: Solving Today\u2019s Challenges Together"',
};

export function getLocalizedCertificates(lang: Language): Certificate[] {
  if (lang === "en") return certificates;
  return certificates.map((cert) => ({
    ...cert,
    category: CERTIFICATE_CATEGORY_ID[cert.category] ?? cert.category,
    title: CERTIFICATE_TITLE_ID[cert.id] ?? cert.title,
  }));
}

const PROJECT_ID_OVERRIDES: Record<string, Partial<Project>> = {
  worknest: {
    title: "WorkNest — Sistem Reservasi & Manajemen Ruang Kerja",
    studio: "Independen",
    role: ["Pengembangan Fullstack", "Arsitektur API", "Perancangan Database"],
    deliverables: [
      "REST API Express",
      "Skema & migrasi Prisma",
      "Alur pemesanan Next.js",
      "Terminal check-in QR terenkripsi",
      "Kontrol akses multi-peran",
    ],
    summary:
      "Platform SaaS reservasi dan manajemen ruang kerja bersama dengan pencarian ketersediaan real-time, terminal check-in kode QR terenkripsi, dan kontrol akses multi-peran.",
    problem:
      "Pengelola coworking masih mencatat reservasi ruangan secara manual, sehingga satu slot waktu sering terpesan ganda dan meja depan menjadi titik rawan kesalahan.",
    architecture: [
      "Klien Next.js 16 untuk alur pencarian dan pemesanan real-time",
      "REST API Express.js sebagai jalur penulisan tunggal",
      "Prisma ORM di atas MySQL dengan state reservasi yang eksplisit",
      "Sesi JWT dengan hak akses terpisah untuk staf, anggota, dan admin",
    ],
    solution: [
      "Reservasi bergerak melalui transisi status eksplisit sehingga perubahan tidak valid langsung ditolak sebelum menyentuh database.",
      "Ketersediaan ruangan dihitung real-time terhadap baris data yang sama dengan terminal check-in.",
      "Kode QR terenkripsi menggantikan lembar pencatatan manual di meja depan sepenuhnya.",
    ],
    metrics: [
      { value: "8 mgg", label: "Dari riset hingga rilis aktif" },
      { value: "3", label: "Peran akses: staf, anggota, admin" },
      { value: "Real-time", label: "Ketersediaan seluruh ruang dan slot" },
    ],
    timeline: [
      {
        phase: "Riset",
        period: "Minggu 1–2",
        detail:
          "Memetakan masalah pemesanan ganda dan menetapkan state reservasi sebelum menulis kode.",
      },
      {
        phase: "Bangun",
        period: "Minggu 3–7",
        detail:
          "Mengembangkan Express API, skema Prisma, dan alur booking Next.js secara paralel.",
      },
      {
        phase: "Rilis",
        period: "Minggu 8",
        detail:
          "Menambahkan check-in QR terenkripsi dan mendeploy platform untuk pemesanan langsung.",
      },
    ],
  },
  invdocs: {
    title: "InvDocs — Arsip Digital & Alur Dokumen",
    studio: "Independen",
    badge: "Proyek Nyata",
    role: ["Pengembangan Fullstack", "RBAC", "Indeks Metadata"],
    deliverables: [
      "Arsip terstruktur dengan pencarian metadata",
      "RBAC hingga level per dokumen",
      "Pipeline unggah terenkripsi",
      "Jejak audit aktivitas",
    ],
    summary:
      "Sistem pengarsipan dan manajemen dokumen digital terstruktur bagi organisasi dengan enkripsi file dan kontrol akses berbasis peran (RBAC).",
    problem:
      "Catatan administrasi tersimpan dalam map fisik sehingga mencari satu berkas lama bisa memakan waktu berjam-jam tanpa catatan siapa yang membukanya.",
    architecture: [
      "Frontend Next.js terhubung ke API Express.js",
      "PostgreSQL dengan Prisma ORM dan pengindeksan berbasis metadata",
      "Evaluasi kontrol akses berbasis peran pada level per dokumen",
      "Penyimpanan file terenkripsi dengan log audit lengkap",
    ],
    solution: [
      "Setiap dokumen dilengkapi metadata terstruktur sehingga pencarian berlangsung cepat di database.",
      "Izin akses diverifikasi sebelum file dikirim ke browser pengguna.",
      "Setiap aksi baca dan tulis tercatat guna menjawab kebutuhan audit kapan saja.",
    ],
    metrics: [
      { value: "< 3 dtk", label: "Waktu pencarian, dari sebelumnya berjam-jam" },
      { value: "RBAC", label: "Diterapkan hingga level dokumen" },
      { value: "Terenkripsi", label: "Unggahan berkas dengan jejak audit lengkap" },
    ],
    timeline: [
      {
        phase: "Masalah",
        period: "Fase 01",
        detail:
          "Pengarsipan fisik yang berantakan membuat pencarian berkas lama memakan waktu berjam-jam.",
      },
      {
        phase: "Bangun",
        period: "Fase 02",
        detail:
          "Menerapkan indeks metadata terstruktur, enkripsi file, dan izin akses bertingkat.",
      },
      {
        phase: "Hasil",
        period: "Fase 03",
        detail: "Waktu pencarian berkas turun drastis menjadi di bawah 3 detik.",
      },
    ],
  },
  corepos: {
    title: "CorePOS — Mesin Kasir & Stok Multi-Outlet",
    studio: "Independen",
    role: ["Pengembangan Fullstack", "Logika Inventori", "Cetak Struk Termal"],
    deliverables: [
      "Layar kasir & transaksi cepat",
      "Integrasi pemindai barcode",
      "Pencetakan struk termal",
      "Rekonsiliasi stok harian",
    ],
    summary:
      "Sistem kasir POS untuk toko dan UMKM dengan pencatatan transaksi real-time, pemindai barcode, cetak struk faktur, dan rekonsiliasi stok harian.",
    problem:
      "Toko mencatat penjualan di kertas sehingga selisih stok dan kesalahan hitung kembalian baru diketahui saat tutup toko.",
    architecture: [
      "Antarmuka kasir berbasis React.js",
      "API Express.js yang memproses pengurangan stok secara transaksional",
      "Basis data MySQL diakses melalui Prisma ORM",
      "Integrasi printer termal untuk struk penjualan",
    ],
    solution: [
      "Stok berkurang dalam satu transaksi atomik yang sama saat penjualan dicatat.",
      "Pemindaian barcode menghilangkan input SKU manual di meja kasir.",
      "Laporan rekonsiliasi harian menggantikan hitung manual di akhir hari.",
    ],
    metrics: [
      { value: "100%", label: "Akurasi pengurangan stok otomatis" },
      { value: "Multi-outlet", label: "Direkonsiliasi dalam satu laporan harian" },
      { value: "Termal", label: "Pencetakan struk teroptimasi printer kasir" },
    ],
    timeline: [
      {
        phase: "Masalah",
        period: "Fase 01",
        detail:
          "Pencatatan kasir manual sering menimbulkan selisih stok dan salah hitung uang.",
      },
      {
        phase: "Bangun",
        period: "Fase 02",
        detail:
          "Mengotomatiskan potong stok transaksional, scan barcode, dan cetak struk.",
      },
      {
        phase: "Hasil",
        period: "Fase 03",
        detail: "Akurasi pemotongan stok otomatis 100% pada setiap transaksi POS.",
      },
    ],
  },
  "inventory-api": {
    title: "Inventory Management High-Throughput API",
    studio: "Independen",
    role: ["Rekayasa Backend", "Optimasi Query", "Desain API"],
    deliverables: [
      "Endpoint REST terdokumentasi",
      "Pencatatan batch multi-gudang",
      "Tuning query & indeks database",
      "Notifikasi stok kritis",
    ],
    summary:
      "RESTful API berkinerja tinggi untuk pelacakan inventori gudang, pencatatan batch multi-gudang, serta notifikasi otomatis saat stok mencapai batas kritis.",
    problem:
      "Query gudang lama harus memindai puluhan ribu baris tanpa indeks memadai, memperlambat tim operasional saat memeriksa stok.",
    architecture: [
      "Modul NestJS dengan endpoint tervalidasi DTO",
      "PostgreSQL sebagai penyimpan data relasional utama",
      "Prisma ORM untuk query bertipe aman dan migrasi skema",
      "Caching Redis di depan lookup data yang sering diulang",
    ],
    solution: [
      "Indeks database diselaraskan dengan bentuk query jalur paling sibuk.",
      "Query Prisma ditulis ulang agar tidak mengambil kolom berlebih yang tidak diperlukan.",
      "Ambang batas stok kritis langsung memicu notifikasi otomatis.",
    ],
    metrics: [
      { value: "40%", label: "Pencarian inventori lebih cepat" },
      { value: "Puluhan ribu", label: "Baris data yang dioptimasi dari query lama" },
      { value: "Redis", label: "Layer cache untuk permintaan berulang" },
    ],
    timeline: [
      {
        phase: "Masalah",
        period: "Fase 01",
        detail: "Query gudang lama lambat memindai puluhan ribu baris stok.",
      },
      {
        phase: "Bangun",
        period: "Fase 02",
        detail:
          "Menerapkan indeks komposit dan penyetelan query Prisma pada jalur kritis.",
      },
      {
        phase: "Hasil",
        period: "Fase 03",
        detail: "Kecepatan pencarian inventori meningkat 40%.",
      },
    ],
  },
  "clinic-portal": {
    title: "Portal Klinik & Apotek — Arsip Publik & Autentikasi JWT",
    shortTitle: "Klinik Madyopuro",
    studio: "Independen",
    badge: "Proyek Nyata",
    role: ["Pengembangan Fullstack", "Autentikasi JWT", "Pengarsipan Publik"],
    deliverables: [
      "Arsip dokumen publik",
      "Area admin dilindungi JWT",
      "Kontrol akses file granular",
      "Alur unduhan untuk masyarakat",
    ],
    summary:
      "Platform pengarsipan data publik dan administrasi klinik dengan proteksi autentikasi JWT serta keamanan akses file granular.",
    problem:
      "Klinik perlu mempublikasikan berkas informasi bagi masyarakat tanpa pernah membuka file internal, namun belum memiliki mekanisme pemisah akses yang tegas.",
    architecture: [
      "Frontend Next.js dengan styling Tailwind CSS",
      "Prisma ORM di atas basis data MySQL",
      "Autentikasi JWT yang mengamankan seluruh rute administratif",
      "Pemisahan data kelas publik dan internal di lapisan skema database",
    ],
    solution: [
      "Rekaman publik dan internal dipisah pada model data, bukan sekadar disembunyikan di UI.",
      "Sesi JWT menjaga akses panel admin secara menyeluruh.",
      "Izin file diberikan per berkas individual, bukan per folder.",
    ],
    metrics: [
      { value: "JWT", label: "Melindungi seluruh rute administrasi" },
      { value: "Granular", label: "Kontrol akses tingkat per-file" },
      { value: "Ribuan", label: "Unduhan dokumen publik dilayani" },
    ],
    timeline: [
      {
        phase: "Masalah",
        period: "Fase 01",
        detail:
          "Dokumen publik harus tayang tanpa risiko membocorkan berkas internal klinik.",
      },
      {
        phase: "Bangun",
        period: "Fase 02",
        detail: "Memisahkan rekaman publik dan internal di balik autentikasi JWT.",
      },
      {
        phase: "Hasil",
        period: "Fase 03",
        detail:
          "Melayani ribuan unduhan dokumen publik dengan keamanan akses granular.",
      },
    ],
  },
  corecraft: {
    title: "Portofolio Pribadi & Arsitektur Sistem CoreCraft",
    shortTitle: "Portofolio CoreCraft",
    badge: "Portofolio",
    role: ["Desain", "Pengembangan Frontend", "SEO"],
    deliverables: [
      "Halaman beranda editorial",
      "Studi kasus statis (SSG)",
      "Sistem gerak terpadu",
      "SEO, sitemap & robots",
    ],
    summary:
      "Portofolio engineering pribadi bergaya editorial dengan sistem animasi terpadu, studi kasus mendalam, dan skor performa Lighthouse 100%.",
    problem:
      "Portofolio sebelumnya hanya menuliskan ringkasan singkat sehingga arsitektur di balik tiap sistem sulit diverifikasi.",
    architecture: [
      "Next.js 16 App Router dengan React Server Components",
      "TypeScript mode ketat di seluruh kode",
      "Token desain Tailwind CSS v4",
      "Animasi adaptif yang menghormati preferensi pengurangan gerak",
    ],
    solution: [
      "Setiap proyek disajikan sebagai studi kasus teknis yang di-render statis.",
      "Animasi berperan sebagai peningkat pengalaman tanpa menghalangi pembacaan konten.",
      "Kurva pegas dan transisi seragam menjaga interaksi konsisten di semua rute.",
    ],
    metrics: [
      { value: "100", label: "Skor performa Lighthouse" },
      { value: "Statis", label: "Seluruh studi kasus ter-prerender cepat" },
      { value: "A11y", label: "Dukungan keyboard dan reduced-motion" },
    ],
  },
  outerco: {
    title: "Outer.Co — E-Commerce Toko Bunga Butik",
    role: ["Pengembangan Frontend", "Arsitektur Katalog", "Panel Admin"],
    deliverables: [
      "Katalog produk multi-galeri",
      "Alur checkout WhatsApp",
      "Panel CRUD admin",
      "Dukungan multi-cabang",
    ],
    summary:
      "Platform e-commerce florist butik dengan katalog produk kaya galeri foto, checkout WhatsApp otomatis, dukungan multi-cabang (Surabaya, Kediri, Denpasar), dan panel admin CRUD.",
    problem:
      "Toko bunga lokal membutuhkan toko daring yang mudah dikelola staf non-teknis dengan alur pemesanan sederhana tanpa kerumitan payment gateway.",
    architecture: [
      "Next.js 16 dengan TypeScript dan Tailwind CSS 4",
      "Cloudinary untuk galeri foto produk multi-gambar",
      "Google Sheets API sebagai penyimpan katalog praktis",
      "Struktur multi-cabang untuk Surabaya, Kediri, dan Denpasar",
    ],
    solution: [
      "Katalog produk dapat diperbarui melalui spreadsheet yang sudah akrab bagi tim toko.",
      "Checkout menyusun format pesan WhatsApp terstruktur secara instan.",
      "Panel CRUD admin mencakup pengelolaan produk, cabang, dan galeri gambar.",
    ],
    metrics: [
      { value: "3", label: "Cabang: Surabaya, Kediri, Denpasar" },
      { value: "Tanpa gateway", label: "Checkout WhatsApp terformat instan" },
      { value: "CRUD", label: "Panel admin ramah staf non-programmer" },
    ],
    timeline: [
      {
        phase: "Masalah",
        period: "Fase 01",
        detail:
          "Toko membutuhkan platform yang bisa dikelola staf non-teknis dengan checkout praktis.",
      },
      {
        phase: "Bangun",
        period: "Fase 02",
        detail:
          "Membangun katalog multi-cabang dan panel CRUD manajemen produk penuh.",
      },
      {
        phase: "Hasil",
        period: "Fase 03",
        detail:
          "Pelanggan memesan buket secara mandiri melalui katalog interaktif ke WhatsApp.",
      },
    ],
  },
};

export function getLocalizedProjects(lang: Language): Project[] {
  if (lang === "en") return projects;
  return projects.map((project) => ({
    ...project,
    ...(PROJECT_ID_OVERRIDES[project.slug] ?? {}),
  }));
}

export function getEducation(lang: Language): {
  formal: EducationItem[];
  nonFormal: EducationItem[];
} {
  return lang === "en"
    ? { formal: formalEducation, nonFormal: nonFormalEducation }
    : { formal: formalEducationId, nonFormal: nonFormalEducationId };
}

export function getCopy(lang: Language) {
  const isId = lang === "id";

  return {
    nav: {
      links: [
        { id: "about", label: isId ? "Tentang" : "About" },
        { id: "services", label: isId ? "Layanan" : "Services" },
        { id: "process", label: isId ? "Proses" : "Process" },
        { id: "stack", label: isId ? "Teknologi" : "Stack" },
        { id: "work", label: isId ? "Karya" : "Work" },
        { id: "experience", label: isId ? "Pengalaman" : "Experience" },
        { id: "education", label: isId ? "Pendidikan" : "Education" },
      ],
      letsTalk: isId ? "Mari Diskusi" : "Let's Talk",
      menu: isId ? "Menu" : "Menu",
      close: isId ? "Tutup" : "Close",
    },
    hero: {
      label: isId
        ? "Backend & Fullstack Software Engineer"
        : "Backend & Fullstack Software Engineer",
      lineOne: "Mohammad Kevin",
      lineTwo: "Arif Rudianto",
      lede: isId
        ? "Pengembang Backend & Fullstack yang merancang API andal, sistem kasir POS, dan arsip dokumen digital."
        : "Backend & Fullstack Developer building reliable APIs, POS systems and digital archives.",
      ctaPrimary: isId ? "Ajak kolaborasi" : "Let's collaborate",
      ctaSecondary: isId ? "Lihat Karya Terpilih" : "View Selected Work",
      location: isId ? "Malang, Jawa Timur" : "Malang, East Java",
      scroll: isId ? "Gulir" : "Scroll",
    },
    about: {
      label: isId ? "Tentang" : "About",
      headingLead: isId ? "Tentang" : "About",
      headingAccent: isId ? "saya." : "me.",
      statementBefore: isId
        ? "Merancang fondasi backend berkonkurensi tinggi, kontrak API yang tangguh, dan sistem data teroptimasi query — berpadu dengan antarmuka modern yang "
        : "Architecting high-concurrency backend backbones, resilient API contracts, and query-optimized data systems — paired with modern, ",
      statementAccent: isId ? "berpusat pada manusia" : "human-centered",
      statementAfter: isId ? "." : " interfaces.",
      paragraph: isId
        ? "Perangkat lunak modern jarang tumbang pada jalur normal, melainkan pada kondisi ekstrem: tabel relasional tanpa indeks saat trafik melonjak, race condition transaksi stok, atau retry webhook tanpa pengaman. Pendekatan saya dimulai dari lapisan skema dan protokol — merancang kontrak TypeScript ketat, isolasi transaksi, dan strategi caching terukur sebelum menyajikan pengalaman frontend yang bersih dengan Next.js dan React 19."
        : "Modern software breaks not at the happy path, but at the edges: unindexed relational tables under surge traffic, race conditions in inventory transactions, or unhandled webhook retries. My engineering approach starts at the schema and protocol layer — designing strict TypeScript contracts, transactional isolation, and predictable caching strategies before surfacing clean, intuitive frontend experiences with Next.js and React 19.",
      captionName: "Mohammad Kevin Arif Rudianto",
      captionRole: isId
        ? "Backend & Fullstack Software Engineer"
        : "Backend & Fullstack Software Engineer",
      photoAlt: isId
        ? "Potret Mohammad Kevin Arif Rudianto"
        : "Portrait of Mohammad Kevin Arif Rudianto",
      stats: [
        { label: isId ? "Tahun Rekayasa" : "Years of Engineering" },
        { label: isId ? "Platform Produksi Dirilis" : "Production Platforms Built" },
        { label: isId ? "Sertifikasi Industri" : "Industry Certifications" },
      ],
    },
    services: {
      label: isId ? "Layanan" : "Services",
      headingLead: isId ? "Yang saya" : "What I",
      headingAccent: isId ? "bangun." : "build.",
      lede: isId
        ? "Kapabilitas engineering spesialis yang dirancang untuk konkurensi tinggi, toleransi kesalahan tangguh, dan skalabilitas stabil di berbagai siklus rilis."
        : "Specialized engineering capabilities architected for high concurrency, robust fault-tolerance, and resilient scale across complex full-lifecycle deployments.",
      items: isId ? servicesId : services,
    },
    process: {
      label: isId ? "Proses" : "Process",
      headingLead: isId ? "Cara sebuah sistem" : "How a system gets",
      headingAccent: isId ? "dibangun." : "built.",
      lede: isId
        ? "Empat tahap terstruktur, tiap langkah lebih ketat dari sebelumnya — dari rancangan tabel pertama hingga deploy produksi."
        : "Four stages, each one stricter than the last — from the first table to the production deploy.",
      steps: isId ? processStepsId : processSteps,
    },
    stack: {
      label: isId ? "Teknologi" : "Stack",
      headingLead: isId
        ? "Stack teruji lapangan"
        : "A battle-tested stack",
      headingAccent: isId ? "untuk skala nyata." : "built for reliability and scale.",
      lede: isId
        ? "Keandalan dan performa, mulai dari runtime server hingga target deployment."
        : "Reliability and scale, from the runtime to the deploy target.",
      groups: isId ? stackGroupsId : stackGroups,
    },
    work: {
      label: isId ? "Karya" : "Work",
      headingLead: isId ? "Sistem produksi" : "Production systems",
      headingAccent: isId ? "aktif." : "live.",
      lede: isId
        ? "Tujuh sistem yang dirilis untuk penggunaan nyata — masing-masing dibangun hingga siap produksi."
        : "Seven systems released into real use — each one built to a production standard.",
      allLink: isId ? "Lihat semua studi kasus" : "View all case studies",
    },
    credentials: {
      label: isId ? "Sertifikasi" : "Credentials",
      headingLead: isId ? "" : "",
      headingAccent: isId ? "13 kredensial." : "13 credentials.",
      lede: isId
        ? "Tiga belas sertifikasi jalur backend, frontend, dan peran rekayasa perangkat lunak, serta prestasi hackathon dan kompetisi nasional."
        : "Thirteen certifications across backend, frontend and role-based tracks, plus national hackathon and competition results.",
      verify: isId ? "Verifikasi" : "Verify",
      awarded: isId ? "Penghargaan" : "Awarded",
      columns: {
        date: isId ? "Tanggal" : "Date",
        name: isId ? "Nama" : "Name",
        issuer: isId ? "Penerbit" : "Issuer",
        verify: isId ? "Verifikasi" : "Verify",
      },
    },
    experience: {
      label: isId ? "Pengalaman" : "Experience",
      headingLead: isId ? "Rekam jejak" : "Track record",
      headingAccent: isId ? "di engineering & QA." : "in engineering & QA.",
      lede: isId
        ? "Pengalaman industri di bidang penjaminan kualitas perangkat lunak, backend freelance, dan pengiriman produk web."
        : "Industry experience across quality assurance, freelance backend work and software engineering delivery.",
      items: isId ? experienceId : experience,
    },
    education: {
      label: isId ? "Pendidikan" : "Education",
      headingLead: isId ? "Riwayat" : "Formal & non-formal",
      headingAccent: isId ? "pendidikan." : "education.",
      lede: isId
        ? "Riwayat pendidikan formal sekolah serta jalur non-formal melalui akademi pemrograman, sertifikasi peran, dan kompetisi nasional."
        : "Formal school history paired with structured non-formal developer academies, verified technical role assessments, and national competitions.",
      formalTitle: isId ? "Pendidikan Formal" : "Formal Education",
      formalSub: isId ? "Formal education" : "Formal education",
      nonFormalTitle: isId ? "Pendidikan Non-Formal" : "Non-Formal Learning",
      nonFormalSub: isId ? "Non-formal learning" : "Non-formal learning",
      placeholderDate: isId ? "[Tahun]" : "[Year]",
      placeholderName: isId
        ? "[Nama sekolah sebelumnya]"
        : "[Previous school name]",
      placeholderNote: isId
        ? "Riwayat SMP/MTs akan dilengkapi."
        : "Junior high school history to be completed.",
      items: getEducation(lang),
    },
    contact: {
      label: isId ? "Kontak" : "Contact",
      headingLead: isId ? "Punya proyek di" : "Have a project in",
      headingAccent: isId ? "pikiran?" : "mind?",
      lede: isId
        ? "Mari rancang sesuatu yang bersih, tangguh, dan berdampak bersama."
        : "Let's engineer something clear, resilient, and impactful together.",
      copyEmail: isId ? "Salin email" : "Copy email",
      copiedEmail: isId ? "Tersalin ✓" : "Copied ✓",
      whatsapp: "WhatsApp",
      resume: isId ? "CV (PDF)" : "Resume (PDF)",
      footerLeft: isId
        ? "© 2026 Mohammad Kevin Arif Rudianto · Dibangun dengan Next.js 16 & React 19"
        : "© 2026 Mohammad Kevin Arif Rudianto · Built with Next.js 16 & React 19",
      backToTop: isId ? "Kembali ke atas ↑" : "Back to top ↑",
    },
  };
}

export function getSubpageCopy(lang: Language) {
  if (lang === "id") {
    return {
      footer: {
        navTitle: "NAVIGASI",
        home: "Beranda",
        allSystems: "Semua Sistem",
        education: "Pendidikan",
        contact: "Kontak",
        elsewhereTitle: "TAUTAN LAIN",
        locationTimezone: "MALANG · WIB",
        backToTop: "Kembali ke atas ↑",
      },
      archive: {
        badgeLeft: "06 / ARSIP",
        systemsDelivered: "SISTEM DIRILIS",
        headingLead: "Karya",
        headingEm: "terpilih.",
        subtitle:
          "Sistem produksi siklus penuh mulai dari RESTful API, SaaS reservasi, e-commerce, terminal POS kasir, hingga arsip dokumen terenkripsi.",
        filterAriaLabel: "Filter proyek",
        allFilterLabel: "Semua",
        backToHome: "← Kembali ke Beranda",
        caseStudy: "Studi Kasus ↗",
        live: "Demo ↗",
        code: "Kode ↗",
      },
      detail: {
        home: "Beranda",
        allSystems: "Semua 07 Sistem",
        caseStudyPrefix: "/STUDI KASUS",
        liveDemo: "Demo Langsung",
        sourceCode: "Kode Sumber",
        discuss: "Diskusikan Arsitektur",
        roleTitle: "PERAN",
        timelineClient: "LINIMASA & KLIEN",
        timelineStudio: "LINIMASA & STUDIO",
        deliverablesTitle: "HASIL KERJA",
        stackTitle: "TEKNOLOGI",
        problemLabel: "/01 MASALAH",
        problemTitle: "Masalah & Hambatan",
        archLabel: "/02 DESAIN SISTEM & ARSITEKTUR",
        archTitle: "Rincian Arsitektur",
        solutionLabel: "/03 SOLUSI IMPLEMENTASI",
        solutionTitle: "Ketahanan & Hasil",
        buildTimelineLabel: "/04 LINIMASA PENGEMBANGAN",
        nextCaseStudy: "STUDI KASUS BERIKUTNYA →",
      },
      notFound: {
        badge: "/404 — RUTE TIDAK DITEMUKAN",
        missingWord: "hilang.",
        body: "Halaman atau studi kasus proyek yang Anda minta mungkin telah dipindahkan atau tidak tersedia.",
        backHome: "Kembali ke Beranda",
        browseAllWork: "Jelajahi Semua Karya",
      },
      mockup: {
        worknestNote: "12 / 15 ruang kosong · Check-in QR",
        outercoTagline: "We sell happiness",
        outercoNote: "Produk terlaris · Checkout WhatsApp",
        coreposItemA: "Item A ×2",
        coreposItemB: "Item B ×1",
        coreposScan: "Pindai barcode",
        coreposTotal: "TOTAL",
        inventoryUnits: "< 5 unit",
        inventoryNote: "Pencarian 40% lebih cepat · Multi-gudang",
        clinicPublic: "Publik",
        clinicJwt: "Dilindungi JWT",
        clinicNote: "Pemisahan arsip publik & internal",
        corecraftPerf: "Performa",
        corecraftStatic: "Statis",
        corecraftZeroErr: "0 galat",
        corecraftNote: "Portofolio Rekayasa Corecraft",
      },
    };
  }

  return {
    footer: {
      navTitle: "NAVIGATE",
      home: "Home",
      allSystems: "All Systems",
      education: "Education",
      contact: "Contact",
      elsewhereTitle: "ELSEWHERE",
      locationTimezone: "MALANG · WIB",
      backToTop: "Back to top ↑",
    },
    archive: {
      badgeLeft: "06 / ARCHIVE",
      systemsDelivered: "SYSTEMS DELIVERED",
      headingLead: "Selected",
      headingEm: "work.",
      subtitle:
        "Full-lifecycle production systems across RESTful APIs, booking SaaS, e-commerce, POS terminals, and encrypted document archives.",
      filterAriaLabel: "Filter projects",
      allFilterLabel: "All",
      backToHome: "← Back to Home Stack",
      caseStudy: "Case Study ↗",
      live: "Live ↗",
      code: "Code ↗",
    },
    detail: {
      home: "Home",
      allSystems: "All 07 Systems",
      caseStudyPrefix: "/CASE STUDY",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      discuss: "Discuss Architecture",
      roleTitle: "ROLE",
      timelineClient: "TIMELINE & CLIENT",
      timelineStudio: "TIMELINE & STUDIO",
      deliverablesTitle: "DELIVERABLES",
      stackTitle: "STACK",
      problemLabel: "/01 THE PROBLEM",
      problemTitle: "Problem & Friction",
      archLabel: "/02 SYSTEM DESIGN & ARCHITECTURE",
      archTitle: "Architectural Breakdown",
      solutionLabel: "/03 IMPLEMENTED SOLUTIONS",
      solutionTitle: "Resilience & Outcomes",
      buildTimelineLabel: "/04 BUILD TIMELINE",
      nextCaseStudy: "NEXT CASE STUDY →",
    },
    notFound: {
      badge: "/404 — ROUTE NOT FOUND",
      missingWord: "missing.",
      body: "The page or project case study you requested may have moved or does not exist.",
      backHome: "Back Home",
      browseAllWork: "Browse All Work",
    },
    mockup: {
      worknestNote: "12 / 15 spaces free · QR check-in",
      outercoTagline: "We sell happiness",
      outercoNote: "Best seller · WhatsApp checkout",
      coreposItemA: "Item A ×2",
      coreposItemB: "Item B ×1",
      coreposScan: "Scan barcode",
      coreposTotal: "TOTAL",
      inventoryUnits: "< 5 units",
      inventoryNote: "40% faster search · Multi-warehouse",
      clinicPublic: "Public",
      clinicJwt: "JWT Guarded",
      clinicNote: "Separated public & internal records",
      corecraftPerf: "Performance",
      corecraftStatic: "Static",
      corecraftZeroErr: "0 errors",
      corecraftNote: "Corecraft Engineering Portfolio",
    },
  };
}
