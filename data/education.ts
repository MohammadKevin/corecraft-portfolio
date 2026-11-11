import type { EducationEntry } from "@/lib/types";

export const education: EducationEntry[] = [
  {
    id: "edu-smk-telkom-malang",
    order: 1,
    type: "formal",
    categoryLabel: "Formal Education · Vocational High School",
    institution: "SMK Telkom Malang",
    program: "Rekayasa Perangkat Lunak (Software Engineering)",
    period: "2024 — Present",
    location: "Malang, East Java",
    status: "Active Student",
    summary:
      "Pursuing formal software engineering education focused on structured application architecture, relational database modeling, OOP, and fullstack web delivery.",
    highlights: [
      "Core coursework in software engineering, database systems, and algorithm design",
      "Built production-grade POS, booking SaaS, and digital archive platforms alongside study",
      "Practiced collaborative Git workflows, REST API contracts, and QA testing standards",
    ],
    tags: ["Software Engineering", "Database Modeling", "OOP", "REST API", "Web Dev"],
  },
  {
    id: "edu-smpn-1-purwoasri",
    order: 2,
    type: "formal",
    categoryLabel: "Formal Education · Junior High School",
    institution: "SMPN 1 Purwoasri",
    program: "Sekolah Menengah Pertama (General Secondary Education)",
    period: "2021 — 2024",
    location: "Kediri, East Java",
    status: "Graduated",
    summary:
      "Completed junior secondary formal education while cultivating early analytical problem-solving, mathematics foundations, and independent web programming curiosity.",
    highlights: [
      "Built foundational academic discipline in mathematics and logical reasoning",
      "Started self-directed exploration of HTML, CSS, PHP, and local relational databases",
    ],
    tags: ["Analytical Thinking", "Mathematics", "Early Web Fundamentals"],
  },
  {
    id: "edu-dicoding-academy",
    order: 3,
    type: "non-formal",
    categoryLabel: "Non-Formal · Online Coding Academy",
    institution: "Dicoding Indonesia (AWS & DBS Foundation)",
    program: "JavaScript, Web Programming & Financial Literacy Tracks",
    period: "2025 — 2026",
    location: "Online · Verified Track",
    status: "Completed",
    summary:
      "Completed structured non-formal developer modules covering modern JavaScript ES6+, semantic web engineering, and financial literacy for digital builders.",
    highlights: [
      "Belajar Dasar Pemrograman JavaScript (AWS Validated · Apr 2026)",
      "Belajar Dasar Pemrograman Web — Semantic HTML5 & Responsive CSS3 (Apr 2026)",
      "Introduction to Financial Literacy — Dicoding & DBS Foundation (Dec 2025)",
    ],
    tags: ["JavaScript ES6+", "Node.js", "HTML5 & CSS3", "Semantic Web"],
    verifyUrl: "https://www.dicoding.com/certificates/1OP8R4K8LZQK",
  },
  {
    id: "edu-hackerrank-tracks",
    order: 4,
    type: "non-formal",
    categoryLabel: "Non-Formal · Technical Assessment & Role Tracks",
    institution: "HackerRank Developer Skills",
    program: "Backend, REST API, React & Software Engineer Role Certifications",
    period: "2026",
    location: "Online · 8 Verified Credentials",
    status: "Verified",
    summary:
      "Completed timed algorithmic and practical role assessments spanning REST APIs, Node.js async runtime, React frontend architecture, and Go basics.",
    highlights: [
      "Backend & API: REST API (Intermediate), Node.js (Intermediate), Go (Basic)",
      "Role Tracks: Software Engineer, Software Engineer Intern, Frontend Developer (React)",
      "Core Languages: JavaScript (Intermediate) & CSS (Basic)",
    ],
    tags: ["REST API", "Node.js", "React", "Go", "Algorithms"],
    verifyUrl: "https://www.hackerrank.com/certificates/36F1F05CB5E0",
  },
  {
    id: "edu-self-taught-hackathons",
    order: 5,
    type: "non-formal",
    categoryLabel: "Non-Formal · Self-Taught Labs & Competitions",
    institution: "Independent Backend Study & National Competitions",
    program: "Self-Taught Systems Engineering, CodeCollab & Future Founders League",
    period: "2024 — 2026",
    location: "Malang & National",
    status: "Continuous",
    summary:
      "Intensive self-taught study of PHP, MySQL, Git, TypeScript, NestJS, and Prisma ORM paired with competitive hackathon prototyping and SaaS product strategy.",
    highlights: [
      'Participant in National Hackathon "CodeCollab" by HMSE Telkom University Purwokerto (Dec 2024)',
      "Top 10 Business Model Canvas (BMC) — Future Founders League by Forum Bisnis Cendekia (Feb 2026)",
      "Hands-on self-study transitioning from PHP/MySQL fundamentals to NestJS + PostgreSQL",
    ],
    tags: ["NestJS", "Prisma ORM", "MySQL", "Git", "Hackathon", "Product Strategy"],
    verifyUrl: "https://github.com/MohammadKevin",
  },
];

