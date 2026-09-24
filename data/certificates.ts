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
  // ── HackerRank Technical Role & Skill Certificates ───────────────────────
  {
    id: "cert-hr-rest-api",
    category: "Technical Skill",
    title: { 
      id: "Rest API (Intermediate) Certificate", 
      en: "Rest API (Intermediate) Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/36F1F05CB5E0",
    skills: ["REST APIs", "API Design", "HTTP Endpoints"]
  },
  {
    id: "cert-hr-node",
    category: "Backend Engineering",
    title: { 
      id: "Node.js (Intermediate) Certificate", 
      en: "Node.js (Intermediate) Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/48FE20D3BAC6",
    skills: ["Node.js", "Express.js", "Asynchronous Runtime"]
  },
  {
    id: "cert-hr-swe-role",
    category: "Role Certification",
    title: { 
      id: "Software Engineer Certificate", 
      en: "Software Engineer Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Jul 2026",
    url: "https://www.hackerrank.com/certificates/1FA31AF247F3",
    skills: ["Software Engineering", "Algorithms", "Problem Solving"]
  },
  {
    id: "cert-hr-swe-intern",
    category: "Role Certification",
    title: { 
      id: "Software Engineer Intern Role Certificate", 
      en: "Software Engineer Intern Role Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/FDBE98DD2143",
    skills: ["Data Structures", "System Design", "Backend Logic"]
  },
  {
    id: "cert-hr-react",
    category: "Role Certification",
    title: { 
      id: "Frontend Developer (React) Role Certificate", 
      en: "Frontend Developer (React) Role Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/88CEC9A68415",
    skills: ["React.js", "Component State", "Frontend Architecture"]
  },
  {
    id: "cert-hr-js-inter",
    category: "Programming Language",
    title: { 
      id: "JavaScript (Intermediate) Certificate", 
      en: "JavaScript (Intermediate) Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/C29079B0DD25",
    skills: ["JavaScript", "ECMAScript", "Async/Await"]
  },
  {
    id: "cert-hr-golang",
    category: "Programming Language",
    title: { 
      id: "Go (Basic) Certificate", 
      en: "Go (Basic) Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/97910B5C3DFE",
    skills: ["Go (Golang)", "Concurrency", "Backend Web"]
  },
  {
    id: "cert-hr-css",
    category: "Frontend UI",
    title: { 
      id: "CSS (Basic) Certificate", 
      en: "CSS (Basic) Certificate" 
    },
    issuer: { 
      id: "HackerRank", 
      en: "HackerRank" 
    },
    date: "Agt 2026",
    url: "https://www.hackerrank.com/certificates/33C5CD52D222",
    skills: ["CSS3", "Responsive UI", "Web Layouts"]
  },

  // ── Hackathons & Competitions ─────────────────────────────────────────────
  {
    id: "cert-codecollab-2024",
    category: "National Hackathon",
    title: { 
      id: "Hackathon Nasional \"CodeCollab: Solving Today's Challenges Together\"", 
      en: "National Hackathon \"CodeCollab: Solving Today's Challenges Together\"" 
    },
    issuer: { 
      id: "HMSE Telkom University Purwokerto", 
      en: "HMSE Telkom University Purwokerto" 
    },
    date: "Des 2024",
    skills: ["Hackathon", "Rapid Prototyping", "Fullstack Engineering"]
  },
  {
    id: "cert-fbc-top10",
    category: "National Competition",
    title: { 
      id: "Top 10 Business Model Canvas (BMC) - Future Founders League", 
      en: "Top 10 Business Model Canvas (BMC) - Future Founders League" 
    },
    issuer: { 
      id: "Forum Bisnis Cendekia", 
      en: "Forum Bisnis Cendekia" 
    },
    date: "Feb 2026",
    skills: ["Product Strategy", "Business Development", "SaaS Modeling"]
  },

  // ── Dicoding Indonesia & Industry Credentials ────────────────────────────
  {
    id: "cert-dicoding-js",
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
    skills: ["JavaScript", "Node.js", "ES6+"]
  },
  {
    id: "cert-dicoding-web",
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
    skills: ["HTML5", "CSS3", "Semantic Architecture"]
  },
  {
    id: "cert-dicoding-fin",
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
    skills: ["Financial Planning", "Business Budgeting"]
  },
];
