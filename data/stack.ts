export interface StackGroup {
  label: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    label: "Backend",
    items: ["NestJS", "Express.js", "Node.js", "JWT / OAuth2", "OpenAPI"],
  },
  {
    label: "Frontend",
    items: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Vercel",
      "Cloudinary",
    ],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Prisma ORM", "Redis", "Supabase"],
  },
  {
    label: "Tooling",
    items: ["Playwright", "Postman", "Git & GitHub", "Linux (Ubuntu)"],
  },
];

export const stackGroupsId: StackGroup[] = [
  stackGroups[0],
  stackGroups[1],
  stackGroups[2],
  {
    label: "Perkakas",
    items: stackGroups[3].items,
  },
];
