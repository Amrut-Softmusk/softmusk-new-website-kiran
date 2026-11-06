// Internship tracks and workshop topics. Shared by the pages, JSON-LD and /llms.txt.

export const INTERNSHIP_DURATION = { label: "6 months", iso: "P6M" } as const;

export const INTERNSHIP_TRACKS = [
  {
    title: "React & IIoT Hardware",
    description:
      "Build robust frontend architectures using React and integrate them directly with Industrial IoT (IIoT) sensors via WebSockets. You won't just build UI; you will build interfaces that control physical hardware in real-time.",
  },
  {
    title: "Next.js Full-Stack",
    description:
      "Master server-side rendering, secure API routes, and robust authentication boundaries. Connect your robust frontend to a heavily optimized PostgreSQL database using Prisma ORM.",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Your code doesn't matter if it can't run in production. Containerize your applications using Docker, build robust CI/CD pipelines, and deploy globally across AWS Infrastructure.",
  },
  {
    title: "UI/UX Product Design",
    description:
      "Design isn't just making things look pretty. Build comprehensive design systems in Figma, sync them with Tailwind CSS tokens, and ensure engineering handoffs are absolutely seamless.",
  },
] as const;

export const WORKSHOP_TOPICS = [
  "Next.js and React",
  "Full-stack web development",
  "Cloud deployment (AWS, Vercel)",
  "UI/UX with Tailwind CSS and Framer Motion",
] as const;
