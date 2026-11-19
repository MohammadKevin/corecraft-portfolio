export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    year: "2026—",
    company: "SIDIGS",
    role: "Quality Assurance",
    location: "Malang, Indonesia",
    summary:
      "Executing rigorous test plans, automated API contract validations, and defect lifecycle tracking across client delivery pipelines.",
    tags: ["Manual Testing", "Postman", "Bug Tracking", "API Testing"],
  },
  {
    year: "2025—",
    company: "CoreCraft",
    role: "Freelance & Backend Developer",
    location: "Remote",
    summary:
      "Building resilient web platforms, transactional backends, and custom management systems for businesses under the CoreCraft studio.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "TypeScript"],
  },
  {
    year: "2024—",
    company: "SMK Telkom Malang",
    role: "Software Engineering Student",
    location: "Malang, Indonesia",
    summary:
      "Studying core computer science principles, database modeling, object-oriented design, and enterprise application architectures.",
    tags: ["PHP", "Node.js", "MySQL", "JavaScript"],
  },
];

export const experienceId: ExperienceItem[] = [
  {
    ...experience[0],
    role: "Quality Assurance",
    summary:
      "Menjalankan rencana pengujian terstruktur, validasi kontrak API otomatis, dan pelacakan siklus cacat pada alur rilis klien.",
    location: "Malang, Indonesia",
  },
  {
    ...experience[1],
    role: "Freelance & Backend Developer",
    summary:
      "Membangun platform web tangguh, backend transaksional, dan sistem manajemen kustom bagi bisnis di bawah studio CoreCraft.",
    location: "Jarak jauh",
  },
  {
    ...experience[2],
    role: "Siswa Rekayasa Perangkat Lunak",
    summary:
      "Mendalami prinsip inti ilmu komputer, pemodelan basis data, desain berorientasi objek, dan arsitektur aplikasi enterprise.",
    location: "Malang, Indonesia",
  },
];
