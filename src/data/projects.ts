export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string[];
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenges: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    description:
      "Intelligent conversational assistant with multi-session management, context memory, and analytics dashboard.",
    longDescription:
      "A production-grade AI chatbot platform built for enterprise clients. Features real-time streaming responses, conversation history, RAG-based knowledge retrieval, and a comprehensive analytics dashboard to track user engagement and model performance.",
    category: ["AI", "Full Stack", "SaaS"],
    tech: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Redis", "NestJS", "WebSockets"],
    image: "/projects/ai-chatbot.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    challenges: [
      "Implementing real-time streaming with minimal latency",
      "Building context-aware conversations across sessions",
      "Optimizing token usage while maintaining response quality",
    ],
    highlights: [
      "Sub-200ms response initiation with SSE streaming",
      "RAG pipeline with vector embeddings for knowledge retrieval",
      "Multi-tenant architecture with role-based access control",
    ],
  },
  {
    slug: "business-development-cms",
    title: "Business Development CMS",
    description:
      "Full-featured CRM and CMS system with team management, lead tracking, and automated workflows.",
    longDescription:
      "A comprehensive business development platform combining CMS capabilities with CRM-style workflows. Built for a growing startup to manage their sales pipeline, content, and team operations from a single dashboard.",
    category: ["Full Stack", "CMS", "Freelance"],
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "AWS S3", "Docker"],
    image: "/projects/biz-cms.png",
    githubUrl: "https://github.com",
    featured: true,
    challenges: [
      "Designing flexible content schema for diverse content types",
      "Building real-time collaboration features",
      "Implementing granular permission system",
    ],
    highlights: [
      "Dynamic content builder with 15+ field types",
      "Real-time dashboard with team activity tracking",
      "Automated email workflows with customizable triggers",
    ],
  },
  {
    slug: "social-media-content-generator",
    title: "Social Media Content Generator",
    description:
      "AI-powered tool to generate, schedule, and analyze social media content across multiple platforms.",
    longDescription:
      "An AI-driven content generation platform that helps creators and businesses produce platform-optimized content at scale. Integrates with major social platforms for direct scheduling and provides engagement analytics.",
    category: ["AI", "SaaS", "Full Stack"],
    tech: ["Next.js", "TypeScript", "OpenAI API", "MongoDB", "Bull Queue", "Cron", "Stripe"],
    image: "/projects/content-gen.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    challenges: [
      "Generating brand-consistent content at scale",
      "Managing rate limits across multiple platform APIs",
      "Building reliable scheduling with retry logic",
    ],
    highlights: [
      "GPT-4 powered content with custom brand voice training",
      "Bulk scheduling across 5 social platforms",
      "Analytics dashboard with engagement rate tracking",
    ],
  },
  {
    slug: "medical-cms-platform",
    title: "Medical CMS Platform",
    description:
      "HIPAA-compliant patient management system with secure authentication, reporting, and appointment scheduling.",
    longDescription:
      "A secure healthcare management platform designed for medical practices. Features end-to-end encrypted patient records, appointment scheduling, billing integration, and comprehensive reporting tools.",
    category: ["CMS", "Full Stack", "Freelance"],
    tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "JWT", "bcrypt", "PDF generation"],
    image: "/projects/medical-cms.png",
    githubUrl: "https://github.com",
    featured: false,
    challenges: [
      "Implementing HIPAA-compliant data handling",
      "Building secure audit logs for all data access",
      "Creating complex reporting with medical terminology",
    ],
    highlights: [
      "End-to-end encrypted patient records",
      "Role-based access with detailed audit trails",
      "Automated appointment reminders via SMS and email",
    ],
  },
  {
    slug: "stripe-integration-system",
    title: "Stripe Billing System",
    description:
      "Complete subscription billing infrastructure with webhook handling, usage metering, and customer portal.",
    longDescription:
      "A robust billing system built as a reusable module for SaaS products. Handles the full subscription lifecycle including trials, upgrades, downgrades, cancellations, and invoice management.",
    category: ["APIs", "Full Stack"],
    tech: ["Node.js", "TypeScript", "Stripe", "PostgreSQL", "Redis", "Webhooks", "NestJS"],
    image: "/projects/stripe-billing.png",
    githubUrl: "https://github.com",
    featured: false,
    challenges: [
      "Handling webhook idempotency reliably",
      "Supporting complex proration scenarios",
      "Building metered billing with real-time usage tracking",
    ],
    highlights: [
      "99.9% webhook delivery with idempotent processing",
      "Self-serve customer portal with plan management",
      "Usage-based billing with real-time metering",
    ],
  },
  {
    slug: "api-integration-hub",
    title: "API Integration Hub",
    description:
      "Centralized API gateway that unifies multiple third-party services with monitoring, caching, and error handling.",
    longDescription:
      "A middleware layer built to standardize communication between a microservices architecture and dozens of third-party APIs. Features circuit breakers, intelligent caching, request queuing, and a monitoring dashboard.",
    category: ["APIs", "Full Stack"],
    tech: ["NestJS", "TypeScript", "Redis", "Bull", "PostgreSQL", "Docker", "Grafana"],
    image: "/projects/api-hub.png",
    githubUrl: "https://github.com",
    featured: false,
    challenges: [
      "Managing rate limits across 20+ external APIs",
      "Implementing circuit breakers for fault tolerance",
      "Building observable request tracing",
    ],
    highlights: [
      "Reduced API error rate by 94% with circuit breakers",
      "60% reduction in external API calls via smart caching",
      "Real-time monitoring with alerting for degraded services",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
