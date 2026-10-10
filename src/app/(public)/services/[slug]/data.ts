import type { ElementType } from "react";
import { Code2, Smartphone, Cpu, Cloud, Database, TrendingUp } from "lucide-react";

export type Service = {
  icon: ElementType;
  category: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  color: string;
  offerings: { title: string; desc: string }[];
  benefits: string[];
  useCases: { title: string; description: string; image: string }[];
  stats: { value: string; label: string }[];
};

export const servicesData: Record<string, Service> = {
  "software-development": {
    icon: Code2,
    category: "Enterprise Software",
    title: "Software Development",
    tagline: "Enterprise-grade software that scales with your ambitions.",
    description: "We architect and deliver robust, custom software solutions that streamline your operations, eliminate bottlenecks, and power business growth. From medical billing ERPs to complex hospital management systems, we build software that becomes the backbone of your business.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80&auto=format&fit=crop",
    color: "#0ABFFF",
    offerings: [
      { title: "MediMusk Medical Billing ERP", desc: "A comprehensive billing and claims management platform built specifically for the healthcare sector — supporting wholesale, retail, and hospital workflows." },
      { title: "Hospital Management Systems", desc: "End-to-end digital platforms that manage patient records, appointments, pharmacy, lab results, and staff operations in one unified system." },
      { title: "Retail & Wholesale Solutions", desc: "Custom inventory, sales, and distribution management software tailored to the specific needs of retail chains and wholesale distributors." },
      { title: "Custom Enterprise Applications", desc: "Bespoke software built from the ground up to match your unique processes, integrating seamlessly with your existing ecosystem." },
    ],
    benefits: [
      "Reduced operational overhead by up to 60%",
      "Real-time data visibility across all departments",
      "Scalable architecture that grows with your business",
      "Secure, compliant, and audit-ready from day one",
      "Seamless integration with existing third-party tools",
    ],
    useCases: [
      { title: "Healthcare & Medical", description: "From small clinics to large hospital chains, our software manages billing, patient data, and clinical workflows.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop" },
      { title: "Retail & Distribution", description: "Wholesale distributors and retail chains use our platforms to manage multi-branch inventory and sales in real time.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop" },
      { title: "Manufacturing & Industry", description: "Production tracking, quality control, and supply chain management software built for heavy industry.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "50+", label: "Systems Deployed" }, { value: "10+", label: "Years Experience" }, { value: "99.9%", label: "Uptime SLA" }, { value: "24/7", label: "Support" }],
  },

  "web-app-development": {
    icon: Smartphone,
    category: "Digital Products",
    title: "Web & App Development",
    tagline: "Digital products that captivate users and drive business outcomes.",
    description: "We design and build high-performance web applications and native mobile apps that deliver exceptional user experiences. Every pixel, interaction, and architecture decision is made with purpose — to create digital products your users love and your business depends on.",
    heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&q=80&auto=format&fit=crop",
    color: "#1D7CE0",
    offerings: [
      { title: "UI/UX Design & Prototyping", desc: "User-centered design that translates complex requirements into intuitive, delightful interfaces. From wireframes to interactive prototypes." },
      { title: "Custom Web Applications", desc: "Scalable, responsive web applications built with modern frameworks. From SaaS products to enterprise dashboards and customer portals." },
      { title: "Android & iOS Mobile Apps", desc: "Native and cross-platform mobile applications for iOS and Android that deliver smooth, performant experiences on every device." },
      { title: "E-commerce Solutions", desc: "Full-featured online stores with secure payment gateways, inventory management, and conversion-optimized checkout flows." },
    ],
    benefits: [
      "Pixel-perfect, responsive design across all screen sizes",
      "Performance-first architecture with fast load times",
      "Secure authentication and data protection built-in",
      "App Store and Google Play deployment support",
      "Ongoing updates and feature additions post-launch",
    ],
    useCases: [
      { title: "SaaS Platforms", description: "Multi-tenant software products with subscription management, dashboards, and real-time collaboration features.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop" },
      { title: "E-Commerce Stores", description: "High-converting online storefronts with seamless checkout, product management, and order tracking.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop" },
      { title: "Mobile Apps", description: "Consumer and enterprise mobile applications that work beautifully on both iOS and Android.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "30+", label: "Apps Launched" }, { value: "4.8★", label: "Avg App Rating" }, { value: "2M+", label: "End Users" }, { value: "100%", label: "On-Time Delivery" }],
  },

  "smart-industry": {
    icon: Cpu,
    category: "Industry 4.0",
    title: "Smart Industry (IIoT)",
    tagline: "Bridge the physical and digital worlds with industrial intelligence.",
    description: "We help manufacturers and industrial companies unlock the full potential of Industry 4.0. By connecting machines, sensors, and systems to intelligent cloud platforms, we transform raw operational data into actionable insight, predictive capabilities, and automated workflows.",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&auto=format&fit=crop",
    color: "#6366f1",
    offerings: [
      { title: "Sensor & Device Integration", desc: "Connect PLCs, sensors, actuators, and industrial equipment to cloud platforms via MQTT, OPC-UA, and Modbus protocols." },
      { title: "Real-Time Monitoring Dashboards", desc: "Live operational dashboards that display machine health, production KPIs, and energy consumption in real time." },
      { title: "Predictive Maintenance", desc: "ML-powered anomaly detection that identifies equipment failures before they happen, minimizing costly downtime." },
      { title: "Industrial Automation Systems", desc: "End-to-end process automation that reduces human error, increases throughput, and optimizes production cycles." },
    ],
    benefits: [
      "Up to 40% reduction in unplanned downtime",
      "Real-time visibility across entire production lines",
      "Data-driven decisions replacing gut-feel operations",
      "Remote monitoring and control from anywhere",
      "Scalable from single machines to entire factory floors",
    ],
    useCases: [
      { title: "Manufacturing Plants", description: "Monitor machine health, track OEE, and automate production reporting across multi-line factories.", image: "https://images.unsplash.com/photo-1565787631953-d2c03aadb50e?w=800&q=80&auto=format&fit=crop" },
      { title: "Energy Management", description: "Track power consumption, identify inefficiencies, and automate load balancing across industrial facilities.", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80&auto=format&fit=crop" },
      { title: "Cold Chain Logistics", description: "Monitor temperature and humidity across refrigerated transport and storage facilities to ensure compliance.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "500+", label: "Devices Connected" }, { value: "40%", label: "Downtime Reduction" }, { value: "Real-Time", label: "Data Processing" }, { value: "24/7", label: "Monitoring" }],
  },

  "cloud-automation": {
    icon: Cloud,
    category: "Infrastructure",
    title: "Cloud Automation",
    tagline: "Infrastructure that deploys itself, scales itself, and heals itself.",
    description: "Modern software demands modern infrastructure. We design and implement cloud architectures and CI/CD pipelines that take the manual work out of deploying, scaling, and managing your applications — so your team can focus on building great products.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop",
    color: "#0ABFFF",
    offerings: [
      { title: "Infrastructure as Code (IaC)", desc: "Define, version, and deploy your entire cloud infrastructure as code — ensuring consistency, repeatability, and auditability." },
      { title: "CI/CD Pipeline Design", desc: "Automated build, test, and deployment pipelines that deliver new features to production safely and quickly — multiple times per day." },
      { title: "Container Orchestration", desc: "Docker and Kubernetes-based deployment strategies that ensure high availability, auto-scaling, and zero-downtime deployments." },
      { title: "Cloud Monitoring & Cost Optimization", desc: "Comprehensive observability stacks with alerting, dashboards, and automated cost-reduction recommendations." },
    ],
    benefits: [
      "Deploy new features multiple times per day safely",
      "Eliminate environment inconsistencies and configuration drift",
      "Auto-scale to handle traffic spikes without manual intervention",
      "Reduce cloud infrastructure costs by 20–40%",
      "Full audit trail for compliance and security requirements",
    ],
    useCases: [
      { title: "SaaS Product Teams", description: "Fast-moving product teams that need reliable, automated infrastructure so engineers can focus on features.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&auto=format&fit=crop" },
      { title: "E-commerce Scale-Up", description: "Handle flash sales, seasonal peaks, and unpredictable traffic spikes with elastic, auto-scaling cloud infrastructure.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop" },
      { title: "Enterprise Migration", description: "Lift-and-shift or re-architect legacy on-premise systems to modern cloud platforms with zero business disruption.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "99.99%", label: "Uptime Achieved" }, { value: "3x", label: "Faster Deployments" }, { value: "35%", label: "Cost Savings" }, { value: "0", label: "Manual Deploys" }],
  },

  "database-consultancy": {
    icon: Database,
    category: "Data & Systems",
    title: "Database Consultancy",
    tagline: "Your data is your most valuable asset. We protect and optimize it.",
    description: "We provide expert database architecture, migration, performance tuning, and ongoing support for organizations where data integrity and availability are non-negotiable. From banking systems to mobile sales applications, we ensure your data layer is bulletproof.",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop",
    color: "#1D7CE0",
    offerings: [
      { title: "Database Architecture & Design", desc: "Schema design, normalization, and architecture planning for new applications to ensure performance and scalability from day one." },
      { title: "Performance Tuning & Optimization", desc: "Query optimization, indexing strategies, and caching implementations that dramatically reduce response times." },
      { title: "Migration & Modernization", desc: "Safe, zero-downtime migration from legacy databases to modern systems with full data integrity validation." },
      { title: "Banking & Financial Applications", desc: "Mission-critical database solutions for banking, payments, and financial platforms where accuracy and reliability are paramount." },
    ],
    benefits: [
      "10x faster query performance after optimization",
      "Zero data loss during complex migrations",
      "Automated backups and point-in-time recovery",
      "Compliance with data privacy regulations",
      "24/7 monitoring and incident response",
    ],
    useCases: [
      { title: "Banking & Finance", description: "Core banking systems, payment processors, and financial reporting platforms requiring ACID compliance and high throughput.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop" },
      { title: "Healthcare Data", description: "Patient record databases and medical billing systems requiring strict HIPAA compliance and data security.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop" },
      { title: "Retail Analytics", description: "High-volume transaction databases for retail chains tracking sales, inventory, and customer data across multiple branches.", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "10x", label: "Query Speed Gain" }, { value: "0%", label: "Data Loss Rate" }, { value: "99.999%", label: "Availability" }, { value: "24/7", label: "DBA Support" }],
  },

  "digital-marketing": {
    icon: TrendingUp,
    category: "Growth",
    title: "Digital Marketing",
    tagline: "Turn your online presence into your most powerful growth engine.",
    description: "We build and execute data-driven digital marketing strategies that attract the right audience, convert visitors into customers, and build lasting brand authority. From search engine dominance to social media that truly engages, we grow your business online.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
    color: "#10b981",
    offerings: [
      { title: "Search Engine Optimization (SEO)", desc: "Technical SEO, content strategy, and link building that drive sustained organic traffic growth and top search rankings." },
      { title: "Social Media Management", desc: "Strategic content creation, community management, and paid social campaigns across all major platforms." },
      { title: "Content Marketing & Strategy", desc: "Blog posts, case studies, whitepapers, and video content that educate your audience and establish industry authority." },
      { title: "Paid Digital Advertising", desc: "ROI-focused Google Ads, Meta Ads, and LinkedIn campaigns with continuous optimization and transparent reporting." },
    ],
    benefits: [
      "Measurable ROI with transparent monthly reporting",
      "Organic traffic growth that compounds over time",
      "Brand authority that outlasts ad spend",
      "Targeting strategies that reach ready-to-buy audiences",
      "Full-funnel approach from awareness to conversion",
    ],
    useCases: [
      { title: "SaaS Companies", description: "Lead generation, trial signups, and product-led growth strategies for software companies in competitive markets.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop" },
      { title: "E-Commerce Brands", description: "Google Shopping, social commerce, and retargeting campaigns that drive product discovery and repeat purchases.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop" },
      { title: "Professional Services", description: "Thought leadership content and LinkedIn strategies that generate high-quality B2B leads for service businesses.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop" },
    ],
    stats: [{ value: "3x", label: "Avg Traffic Growth" }, { value: "40%", label: "Lower Cost/Lead" }, { value: "Top 3", label: "Search Rankings" }, { value: "ROI+", label: "Guaranteed Focus" }],
  },
};
