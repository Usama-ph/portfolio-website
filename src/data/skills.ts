export type SkillCategory = {
  name: string;
  skills: string[];
  icon: string;
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "Monitor",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "Framer Motion", "ShadCN UI"],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: ["NestJS", "Node.js", "Express", "REST APIs", "GraphQL", "WebSockets", "Microservices"],
  },
  {
    name: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "TypeORM", "SQL"],
  },
  {
    name: "DevOps & Cloud",
    icon: "Cloud",
    skills: ["Docker", "AWS", "Vercel", "CI/CD", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    name: "AI & Integrations",
    icon: "Cpu",
    skills: ["OpenAI API", "LangChain", "Python", "Stripe", "Firebase", "Twilio", "SendGrid"],
  },
];

export const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "TailwindCSS", category: "Frontend" },
  { name: "NestJS", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "Stripe", category: "Integration" },
  { name: "OpenAI", category: "AI" },
  { name: "Python", category: "AI" },
  { name: "Redis", category: "Database" },
  { name: "Prisma", category: "Backend" },
  { name: "Firebase", category: "Integration" },
];
