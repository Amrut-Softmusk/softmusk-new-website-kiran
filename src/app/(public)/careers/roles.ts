// Open roles. Shared by the careers page and its JobPosting JSON-LD (see layout.tsx).
// When roles change, update JOBS_POSTED below so search engines see fresh dates.
import { FaReact, FaAws, FaDocker, FaFigma, FaNodeJs } from "react-icons/fa";
import { TrendingUp, Megaphone, Zap, LifeBuoy, Headphones } from "lucide-react";
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiGithubactions, SiTypescript } from "react-icons/si";

/** ISO dates. Google drops JobPostings after validThrough, so refresh these while roles stay open. */
export const JOBS_POSTED = { datePosted: "2026-11-06", validThrough: "2027-02-04" };

export const ROLES = [
  {
    id: "senior-fullstack",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    type: "Full-Time",
    experience: "4+ Years",
    location: "Remote / Hybrid",
    accentColor: "#1D7CE0",
    stack: [
      { name: "Next.js 15", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" }
    ],
    overview: "Lead architecture on our flagship retail and enterprise ERP platforms (GoldMusk & MediMusk). You will build sub-50ms offline-first local database engines, high-throughput cloud synchronization, and low-latency point-of-sale interfaces.",
    requirements: [
      "4+ years of professional full-stack engineering with Next.js, React, and TypeScript",
      "Deep experience with relational databases (PostgreSQL), data modeling, and query optimization",
      "Experience architecting resilient SaaS applications, offline-first sync engines, or complex POS systems",
      "Strong written communication for asynchronous engineering workflows and constructive code reviews"
    ]
  },
  {
    id: "devops-architect",
    title: "Cloud & DevOps Architect",
    department: "Cloud & DevOps",
    type: "Full-Time",
    experience: "3+ Years",
    location: "Remote (Global)",
    accentColor: "#0ABFFF",
    stack: [
      { name: "AWS Cloud", icon: FaAws, color: "#FF9900" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" }
    ],
    overview: "Own and scale our automated cloud infrastructure supporting real-time enterprise deployments. You will eliminate deployment friction, design zero-downtime release pipelines, and guarantee high availability across all services.",
    requirements: [
      "3+ years managing production AWS environments with Infrastructure as Code (Terraform)",
      "Hands-on expertise with containerization (Docker), automated CI/CD pipelines, and health monitoring",
      "Deep understanding of distributed system reliability, automated backups, and cloud security best practices",
      "Experience with telemetry and observability stacks (Prometheus, Grafana, CloudWatch)"
    ]
  },
  {
    id: "ui-ux-designer",
    title: "Lead UI/UX Product Designer",
    department: "Product & UI/UX",
    type: "Full-Time",
    experience: "3+ Years",
    location: "Remote / Hybrid",
    accentColor: "#6366F1",
    stack: [
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Design Systems", icon: FaReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" }
    ],
    overview: "Transform complex enterprise workflows into intuitive, joyful user experiences. You will design multi-brand design tokens, lightning-fast keyboard-first POS counter interfaces, and visual data dashboards.",
    requirements: [
      "3+ years designing complex SaaS products, responsive web apps, and design systems in Figma",
      "Demonstrated mastery of typography, spatial grids, dark mode aesthetics, and micro-interactions",
      "Ability to work closely with frontend engineers to ensure 100% pixel-perfect implementation",
      "Track record of simplifying data-heavy tables, ledgers, and billing workflows for end users"
    ]
  },
  {
    id: "associate-engineer",
    title: "Associate Software Engineer",
    department: "Engineering",
    type: "Full-Time",
    experience: "0 - 2 Years",
    location: "Belagavi, Karnataka",
    accentColor: "#10B981",
    stack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Node.js", icon: FaNodeJs, color: "#5FA04E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" }
    ],
    overview: "An accelerated career path for hungry, obsessive builders. You will write code that touches production systems from month one, working directly alongside senior engineering mentors on enterprise software.",
    requirements: [
      "Solid understanding of computer science fundamentals, data structures, and modern JavaScript/TypeScript",
      "Hands-on experience building web apps with React, Git, and REST APIs (projects or internships)",
      "High curiosity, attention to detail, and eagerness to learn modern full-stack development and DevOps",
      "Strong problem-solving ability and pride in clean, readable, well-tested code"
    ]
  },
  {
    id: "growth-marketing",
    title: "Growth & Product Marketing Lead",
    department: "Marketing",
    type: "Full-Time",
    experience: "2+ Years",
    location: "Remote / Hybrid Belagavi",
    accentColor: "#F59E0B",
    stack: [
      { name: "SEO & Growth", icon: TrendingUp, color: "#F59E0B" },
      { name: "B2B Campaigns", icon: Megaphone, color: "#EC4899" },
      { name: "Analytics", icon: Zap, color: "#3B82F6" }
    ],
    overview: "Drive product storytelling, demand generation, and organic reach across our enterprise software platforms (GoldMusk, MediMusk) and academy initiatives. You will design data-driven customer acquisition funnels and write compelling case studies.",
    requirements: [
      "2+ years of hands-on experience in growth marketing, product marketing, or B2B SaaS acquisition",
      "Proven track record executing high-converting SEO, Google Ads, LinkedIn campaigns, and content strategies",
      "Exceptional written communication for technical case studies, customer stories, and product announcements",
      "Proficiency with Google Analytics 4, Search Console, conversion optimization, and marketing attribution"
    ]
  },
  {
    id: "tech-support",
    title: "Technical Support & Implementation Specialist",
    department: "Technical Support",
    type: "Full-Time",
    experience: "1+ Years",
    location: "Belagavi / Hybrid",
    accentColor: "#06B6D4",
    stack: [
      { name: "Hardware & POS Setup", icon: LifeBuoy, color: "#06B6D4" },
      { name: "Customer Onboarding", icon: Headphones, color: "#10B981" },
      { name: "SQL & Diagnostics", icon: SiPostgresql, color: "#336791" }
    ],
    overview: "Be the frontline technical partner for store owners running GoldMusk, MediMusk, and restaurant POS systems. You will lead client onboarding, configure thermal barcode printers and weighing scales, and diagnose database and network issues rapidly.",
    requirements: [
      "1+ years of experience in technical support, IT systems administration, or enterprise software onboarding",
      "Strong troubleshooting skills with Windows OS environments, peripheral drivers (thermal printers, barcode scanners), and network setups",
      "Familiarity with basic SQL queries to inspect transaction tables and ledger reconciliations during client escalations",
      "Empathetic, clear, and patient communication when supporting retail counter staff and business owners"
    ]
  }
];
