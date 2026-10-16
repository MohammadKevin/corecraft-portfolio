import type { SkillCategory } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & Database",
    blurb:
      "The layer that has to stay correct: API contracts, relational schemas and query plans.",
    skills: [
      {
        name: "Node.js",
        level: 90,
        levelTag: "Advanced",
        icon: "node",
        highlights: [
          "Runtime behind every API I ship",
          "Async I/O, streams and event-loop reasoning",
        ],
      },
      {
        name: "NestJS",
        level: 88,
        levelTag: "Advanced",
        icon: "nest",
        highlights: [
          "Modular architecture with DTO validation",
          "Built the Inventory Management API",
        ],
      },
      {
        name: "Express.js",
        level: 88,
        levelTag: "Advanced",
        icon: "express",
        highlights: [
          "REST APIs as the single write path",
          "Powers WorkNest, InvDocs and CorePOS",
        ],
      },
      {
        name: "PostgreSQL",
        level: 85,
        levelTag: "Advanced",
        icon: "postgres",
        highlights: [
          "Indexing tuned to real hot-path queries",
          "Relational modelling for archives & inventory",
        ],
      },
      {
        name: "MySQL",
        level: 85,
        levelTag: "Advanced",
        icon: "mysql",
        highlights: [
          "Schema design for POS & booking systems",
          "Transactional stock mutation",
        ],
      },
      {
        name: "Prisma ORM",
        level: 85,
        levelTag: "Advanced",
        icon: "prisma",
        highlights: [
          "Type-safe client across Next & Nest",
          "Migrations and query tuning",
        ],
      },
      {
        name: "Redis",
        level: 70,
        levelTag: "Intermediate",
        icon: "redis",
        highlights: [
          "Caching in front of repeated lookups",
          "Cut inventory search time by 40%",
        ],
      },
      {
        name: "Supabase",
        level: 70,
        levelTag: "Intermediate",
        icon: "supabase",
        highlights: [
          "Managed Postgres with row-level security",
          "Realtime subscriptions for dashboards",
        ],
      },
      {
        name: "Laravel / PHP",
        level: 65,
        levelTag: "Familiar",
        icon: "laravel",
        highlights: [
          "Early coursework and legacy maintenance",
          "MVC fundamentals carried into NestJS",
        ],
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Interface",
    blurb:
      "The surface the user actually touches: server-rendered, typed and measured against Lighthouse.",
    skills: [
      {
        name: "Next.js 16",
        level: 88,
        levelTag: "Advanced",
        icon: "next",
        highlights: [
          "App Router, RSC and static generation",
          "This portfolio scores 100 on Lighthouse",
        ],
      },
      {
        name: "React 19",
        level: 86,
        levelTag: "Advanced",
        icon: "react",
        highlights: [
          "Server & client component boundaries",
          "State management with Context and Zustand",
        ],
      },
      {
        name: "TypeScript",
        level: 85,
        levelTag: "Advanced",
        icon: "typescript",
        highlights: [
          "Strict mode end to end, client and server",
          "Prevents bugs at compile time, not in production",
        ],
      },
      {
        name: "Tailwind CSS v4",
        level: 85,
        levelTag: "Advanced",
        icon: "tailwind",
        highlights: [
          "Design tokens via @theme",
          "Utility-first layouts across every project",
        ],
      },
      {
        name: "Framer Motion",
        level: 78,
        levelTag: "Intermediate",
        icon: "motion",
        highlights: [
          "Shared spring physics system",
          "Scroll-linked parallax and reveals",
        ],
      },
      {
        name: "HTML5 / CSS3",
        level: 85,
        levelTag: "Advanced",
        icon: "html",
        highlights: [
          "Semantic, accessible markup",
          "Grid, flexbox and responsive primitives",
        ],
      },
    ],
  },
  {
    id: "tooling",
    title: "Tooling, DevOps & QA",
    blurb:
      "How the work ships and stays shippable: version control, containers, pipelines and tests.",
    skills: [
      {
        name: "Git & GitHub",
        level: 85,
        levelTag: "Advanced",
        icon: "git",
        highlights: [
          "Branching, merging and conflict resolution",
          "Source control for every team project",
        ],
      },
      {
        name: "GitHub Actions",
        level: 75,
        levelTag: "Intermediate",
        icon: "actions",
        highlights: [
          "CI that type-checks and builds on push",
          "Automated deploy previews",
        ],
      },
      {
        name: "Docker",
        level: 72,
        levelTag: "Intermediate",
        icon: "docker",
        highlights: [
          "Reproducible backend runtimes",
          "Compose for local service stacks",
        ],
      },
      {
        name: "Linux (Debian/Ubuntu)",
        level: 75,
        levelTag: "Intermediate",
        icon: "linux",
        highlights: [
          "Bash scripting and light VPS management",
          "Deployed backend runtimes on Linux",
        ],
      },
      {
        name: "Playwright",
        level: 70,
        levelTag: "Intermediate",
        icon: "playwright",
        highlights: [
          "End-to-end flows for booking and checkout",
          "Regression coverage before release",
        ],
      },
      {
        name: "Postman",
        level: 90,
        levelTag: "Advanced",
        icon: "postman",
        highlights: [
          "Tested 50+ Inventory system endpoints",
          "API documentation and mock architectures",
        ],
      },
      {
        name: "Nginx",
        level: 68,
        levelTag: "Familiar",
        icon: "nginx",
        highlights: [
          "Reverse proxy and TLS termination",
          "Static asset serving for deployed apps",
        ],
      },
      {
        name: "Vercel",
        level: 82,
        levelTag: "Advanced",
        icon: "vercel",
        highlights: [
          "Primary deploy target for Next.js apps",
          "Edge caching and preview environments",
        ],
      },
    ],
  },
];

export interface StackTickerItem {
  name: string;
  tag: string;
  icon: string;
}

export const stackRow1 = [
  { name: "Node.js", tag: "Runtime", icon: "Terminal" },
  { name: "NestJS", tag: "Backend", icon: "Server" },
  { name: "Express.js", tag: "API Framework", icon: "Code" },
  { name: "TypeScript", tag: "Type System", icon: "FileCode" },
  { name: "PostgreSQL", tag: "Relational DB", icon: "Database" },
  { name: "MySQL", tag: "Relational DB", icon: "Database" },
  { name: "Prisma ORM", tag: "Data Access", icon: "Workflow" },
  { name: "Supabase", tag: "Backend Suite", icon: "Cloud" },
  { name: "Redis", tag: "Cache & Broker", icon: "Cpu" },
  { name: "Laravel / PHP", tag: "Backend", icon: "Server" },
] satisfies StackTickerItem[];

export const stackRow2 = [
  { name: "Next.js 16", tag: "App Framework", icon: "Globe" },
  { name: "React 19", tag: "UI Architecture", icon: "Layers" },
  { name: "Tailwind CSS v4", tag: "Design Tokens", icon: "Layout" },
  { name: "Framer Motion", tag: "Physics Engine", icon: "Boxes" },
  { name: "Docker", tag: "Containerization", icon: "Boxes" },
  { name: "Linux (Ubuntu)", tag: "Server Host", icon: "Terminal" },
  { name: "Playwright", tag: "End-to-End QA", icon: "ShieldCheck" },
  { name: "Git & GitHub", tag: "Version Control", icon: "GitBranch" },
  { name: "Postman", tag: "API Contracts", icon: "Workflow" },
  { name: "Vercel", tag: "Edge Infrastructure", icon: "Cloud" },
] satisfies StackTickerItem[];
