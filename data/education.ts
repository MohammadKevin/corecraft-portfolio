import type { EducationItem, EducationType } from "@/lib/types";

export type { EducationItem, EducationType };

export const formalEducation: EducationItem[] = [
  {
    date: "2024 — Present",
    institution: "SMK Telkom Malang",
    title: "Software Engineering",
    note: "Core computer science principles, database modeling, object-oriented design and enterprise application architectures. Malang, Indonesia.",
    type: "formal",
  },
  {
    date: "2021 — 2024",
    institution: "SMPN 1 Purwoasri",
    title: "General Secondary Education",
    note: "Mathematics, logical reasoning and early web programming foundations. Kediri, East Java.",
    type: "formal",
  },
];

export const formalEducationId: EducationItem[] = [
  {
    date: "2024 — Sekarang",
    institution: "SMK Telkom Malang",
    title: "Rekayasa Perangkat Lunak",
    note: "Prinsip inti ilmu komputer, pemodelan basis data, desain berorientasi objek, dan arsitektur aplikasi enterprise. Malang, Indonesia.",
    type: "formal",
  },
  {
    date: "2021 — 2024",
    institution: "SMPN 1 Purwoasri",
    title: "Pendidikan Menengah Pertama",
    note: "Matematika, penalaran logis, dan fondasi awal pemrograman web. Kediri, Jawa Timur.",
    type: "formal",
  },
];

export const nonFormalEducation: EducationItem[] = [
  {
    date: "Jul — Aug 2026",
    institution: "HackerRank",
    title: "Skill & Role Certificates (8)",
    note: "REST API, Node.js, JavaScript, Go, CSS, Software Engineer, Frontend (React).",
    type: "nonformal",
  },
  {
    date: "Apr 2026",
    institution: "Dicoding Indonesia",
    title: "Basic JavaScript Programming (AWS Validated)",
    note: "Modern JavaScript fundamentals, async flow and tooling for web delivery.",
    type: "nonformal",
  },
  {
    date: "Apr 2026",
    institution: "Dicoding Indonesia",
    title: "Basic Web Programming",
    note: "Semantic HTML5, responsive CSS3 and accessible page structure.",
    type: "nonformal",
  },
  {
    date: "Feb 2026",
    institution: "Forum Bisnis Cendekia",
    title: "Top 10 Business Model Canvas — Future Founders League",
    note: "Product strategy, business modelling and SaaS positioning.",
    type: "nonformal",
  },
  {
    date: "Dec 2025",
    institution: "Dicoding & DBS Foundation",
    title: "Introduction to Financial Literacy",
    note: "Financial planning and budgeting for digital builders.",
    type: "nonformal",
  },
  {
    date: "Dec 2024",
    institution: "HMSE Telkom University Purwokerto",
    title: 'National Hackathon "CodeCollab"',
    note: "Rapid prototyping and fullstack delivery under competition constraints.",
    type: "nonformal",
  },
];

export const nonFormalEducationId: EducationItem[] = [
  {
    date: "Jul — Agu 2026",
    institution: "HackerRank",
    title: "Sertifikat Skill & Peran (8)",
    note: "REST API, Node.js, JavaScript, Go, CSS, Software Engineer, Frontend (React).",
    type: "nonformal",
  },
  {
    date: "Apr 2026",
    institution: "Dicoding Indonesia",
    title: "Belajar Dasar Pemrograman JavaScript (Tervalidasi AWS)",
    note: "Fondasi JavaScript modern, alur asinkron, dan perkakas pengiriman web.",
    type: "nonformal",
  },
  {
    date: "Apr 2026",
    institution: "Dicoding Indonesia",
    title: "Belajar Dasar Pemrograman Web",
    note: "HTML5 semantik, CSS3 responsif, dan struktur halaman yang aksesibel.",
    type: "nonformal",
  },
  {
    date: "Feb 2026",
    institution: "Forum Bisnis Cendekia",
    title: "Top 10 Business Model Canvas — Future Founders League",
    note: "Strategi produk, pemodelan bisnis, dan positioning SaaS.",
    type: "nonformal",
  },
  {
    date: "Des 2025",
    institution: "Dicoding & DBS Foundation",
    title: "Pengenalan Literasi Finansial",
    note: "Perencanaan dan penganggaran finansial untuk pembangun digital.",
    type: "nonformal",
  },
  {
    date: "Des 2024",
    institution: "HMSE Telkom University Purwokerto",
    title: 'Hackathon Nasional "CodeCollab"',
    note: "Prototipe cepat dan pengiriman fullstack di bawah tekanan kompetisi.",
    type: "nonformal",
  },
];

export const education: EducationItem[] = [
  ...formalEducation,
  ...nonFormalEducation,
];
