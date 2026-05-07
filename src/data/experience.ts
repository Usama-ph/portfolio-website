export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  type: "work" | "milestone" | "education";
};

export const timeline: TimelineItem[] = [
  {
    year: "2024–Present",
    title: "Senior Full Stack Engineer & Freelance",
    description:
      "Building AI-powered products, SaaS platforms, and complex web applications for international clients. Specializing in TypeScript, NestJS, and OpenAI integrations.",
    type: "work",
  },
  {
    year: "2023",
    title: "AI Integration Specialist",
    description:
      "Developed AI-powered features including chatbots, content generation systems, and intelligent automation tools for multiple client projects.",
    type: "milestone",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    description:
      "Built scalable backend architectures with NestJS and PostgreSQL. Delivered CMS platforms, admin dashboards, and REST API systems.",
    type: "work",
  },
  {
    year: "2021",
    title: "MERN Stack Specialization",
    description:
      "Deep-dived into full-stack JavaScript — React, Node.js, Express, MongoDB. Shipped first production applications for clients.",
    type: "milestone",
  },
  {
    year: "2020",
    title: "Started Development Journey",
    description:
      "Began learning web development. Mastered HTML, CSS, JavaScript, and core programming fundamentals. Built first projects and discovered passion for software.",
    type: "education",
  },
];

export const stats = [
  { value: "3+", label: "Years Experience", description: "Building production-grade applications" },
  { value: "20+", label: "Projects Delivered", description: "Across various industries and tech stacks" },
  { value: "10+", label: "Happy Clients", description: "Freelance and product collaborations" },
  { value: "5+", label: "Industries Served", description: "Healthcare, SaaS, Media, Finance, and more" },
];

export const testimonials = [
  {
    name: "Sarah K.",
    role: "Startup Founder",
    company: "TechVenture Inc.",
    content:
      "Usama delivered a fully functional AI chatbot platform in record time. The code quality, architecture decisions, and attention to detail were exceptional. Will definitely work together again.",
    avatar: "/avatars/sarah.png",
  },
  {
    name: "Michael R.",
    role: "Product Manager",
    company: "GrowthCo",
    content:
      "Working with Usama was a game-changer for our product. He understood our requirements immediately and built a CMS system that our team loves using every day.",
    avatar: "/avatars/michael.png",
  },
  {
    name: "Aisha T.",
    role: "CTO",
    company: "HealthTech Solutions",
    content:
      "Usama built our entire patient management system from scratch. Security, performance, and UX were all top-notch. Highly recommend for complex technical projects.",
    avatar: "/avatars/aisha.png",
  },
];
