import type { LocalizedString } from "./projects";

export interface Certificate {
  id: string;
  category: string;
  title: LocalizedString | string;
  issuer: LocalizedString | string;
  date: string;
  url?: string;
  skills?: string[];
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    category: "Professional Course",
    title: { 
      id: "Belajar Dasar Pemrograman JavaScript", 
      en: "Basic JavaScript Programming" 
    },
    issuer: { 
      id: "Dicoding Indonesia (AWS Validated)", 
      en: "Dicoding Indonesia (AWS Validated)" 
    },
    date: "Apr 2026",
    url: "https://www.dicoding.com/certificates/1OP8R4K8LZQK",
    skills: ["JavaScript", "Node.js", "ES6+", "Async Programming"]
  },
  {
    id: "cert-2",
    category: "Professional Course",
    title: { 
      id: "Belajar Dasar Pemrograman Web", 
      en: "Basic Web Programming" 
    },
    issuer: { 
      id: "Dicoding Indonesia", 
      en: "Dicoding Indonesia" 
    },
    date: "Apr 2026",
    url: "https://www.dicoding.com/certificates/QLZ99V0VMZ5D",
    skills: ["HTML5", "CSS3", "Responsive Layout", "Flexbox"]
  },
  {
    id: "cert-3",
    category: "Specialized Course",
    title: { 
      id: "Introduction to Financial Literacy", 
      en: "Introduction to Financial Literacy" 
    },
    issuer: { 
      id: "Dicoding & DBS Foundation", 
      en: "Dicoding & DBS Foundation" 
    },
    date: "Des 2025",
    url: "https://www.dicoding.com/certificates/N9ZO2170RPG5",
    skills: ["Financial Analysis", "Cash Flow Planning"]
  },
  {
    id: "cert-4",
    category: "Frontend Development",
    title: { 
      id: "Belajar Fundamental Aplikasi Web dengan React", 
      en: "Web Application Fundamentals with React" 
    },
    issuer: { 
      id: "Dicoding Indonesia", 
      en: "Dicoding Indonesia" 
    },
    date: "2023",
    url: "https://www.dicoding.com/certificates/L4PQ4D7ERPO1",
    skills: ["React.js", "State Management", "Component Architecture"]
  },
  {
    id: "cert-5",
    category: "Frontend Development",
    title: { 
      id: "Belajar Membuat Aplikasi Web dengan React", 
      en: "Building Web Applications with React" 
    },
    issuer: { 
      id: "Dicoding Indonesia", 
      en: "Dicoding Indonesia" 
    },
    date: "2023",
    url: "https://www.dicoding.com/certificates/81P28E7NWZOY",
    skills: ["React.js", "Hooks", "SPA Routing"]
  },
  {
    id: "cert-6",
    category: "Frontend Development",
    title: { 
      id: "Belajar Membuat Front-End Web untuk Pemula", 
      en: "Frontend Web Development for Beginners" 
    },
    issuer: { 
      id: "Dicoding Indonesia", 
      en: "Dicoding Indonesia" 
    },
    date: "2023",
    url: "https://www.dicoding.com/certificates/2VX3N0KDDZYQ",
    skills: ["DOM Manipulation", "Web Storage", "Interactive UI"]
  },
];
