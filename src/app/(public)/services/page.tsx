"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Code2, Smartphone, Cpu, Cloud, Database, TrendingUp,
  Zap, Rocket, Search, Palette, LifeBuoy,
  ArrowUpRight
} from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { FaqSection } from "@/components/seo/FaqSection";
import { SERVICES_FAQS } from "@/lib/faqs";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }
  })
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Code2,
    category: "Enterprise Software",
    title: "Software Development",
    description: "Custom enterprise-grade software solutions — from medical billing ERP systems to full-scale hospital management platforms built for scale and resilience.",
    features: ["MediMusk Medical Billing ERP", "Hospital Management Systems", "Retail & Wholesale Solutions"],
    color: "#0ABFFF",
    gradient: "from-cyan-500/20 to-blue-600/5",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    href: "/services/software-development",
  },
  {
    icon: Smartphone,
    category: "Digital Products",
    title: "Web & App Development",
    description: "High-performance responsive websites and native mobile applications for iOS and Android built with modern frameworks and pixel-perfect attention to detail.",
    features: ["UI/UX Design", "Custom Web Applications", "Android & iOS Apps"],
    color: "#1D7CE0",
    gradient: "from-blue-500/20 to-indigo-600/5",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&auto=format&fit=crop",
    href: "/services/web-app-development",
  },
  {
    icon: Cpu,
    category: "Industry 4.0",
    title: "Smart Industry (IIoT)",
    description: "Connect your physical world to intelligent systems with IIoT solutions for sensor integration, real-time monitoring, and predictive maintenance.",
    features: ["Sensor & Device Integration", "Real-Time Dashboards", "Industrial Automation"],
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-purple-600/5",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
    href: "/services/smart-industry",
  },
  {
    icon: Cloud,
    category: "Infrastructure",
    title: "Cloud Automation",
    description: "Modernize your infrastructure with automated CI/CD pipelines, Infrastructure as Code, and elastic cloud scaling for peak performance.",
    features: ["Infrastructure as Code", "CI/CD Pipelines", "Cloud Monitoring"],
    color: "#0ABFFF",
    gradient: "from-cyan-500/20 to-teal-600/5",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
    href: "/services/cloud-automation",
  },
  {
    icon: Database,
    category: "Data & Systems",
    title: "Database Consultancy",
    description: "Expert database architecture, optimization, and support for banking, retail, and enterprise applications that demand absolute reliability.",
    features: ["Banking Applications", "Mobile Sales Order Apps", "Database Architecture"],
    color: "#1D7CE0",
    gradient: "from-blue-500/20 to-cyan-600/5",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
    href: "/services/database-consultancy",
  },
  {
    icon: TrendingUp,
    category: "Growth",
    title: "Digital Marketing",
    description: "Amplify your digital presence with data-driven strategies across SEO, social media, and content marketing that turn visitors into loyal customers.",
    features: ["Search Engine Optimization", "Social Media Management", "Content Strategy"],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-green-600/5",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    href: "/services/digital-marketing",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 15, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const processSteps = [
  { number: "01", icon: Search, title: "Discover", description: "Deep dive into your business goals, challenges, and technical requirements." },
  { number: "02", icon: Palette, title: "Design", description: "Craft intuitive UI/UX wireframes and system architecture blueprints." },
  { number: "03", icon: Code2, title: "Build", description: "Agile development sprints with continuous integration and quality checks." },
  { number: "04", icon: Rocket, title: "Deploy", description: "Seamless production deployment with zero-downtime release strategies." },
  { number: "05", icon: LifeBuoy, title: "Support", description: "Ongoing maintenance, monitoring, and performance optimization post-launch." },
];

const whatWeBuild = [
  {
    title: "Enterprise Platforms",
    description: "End-to-end ERP systems, billing platforms, and management tools that digitize complex enterprise operations.",
    highlight: "Built for scale",
  },
  {
    title: "Digital Experiences",
    description: "Stunning web applications and mobile apps that engage users, drive conversions, and elevate brand perception.",
    highlight: "Pixel perfect",
  },
  {
    title: "Industrial Intelligence",
    description: "Connected IoT ecosystems that give your machines a voice — turning raw data into actionable insight.",
    highlight: "Real-time insight",
  },
  {
    title: "Automated Infrastructure",
    description: "Self-healing cloud pipelines and deployment systems that keep your services running at peak capacity.",
    highlight: "Always online",
  },
];

// ─── Section Components ────────────────────────────────────────────────────────

function StatCounterItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="flex flex-col items-center justify-center gap-2 py-12 px-4 sm:px-6 text-center bg-white"
    >
      <span className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-slate-900 leading-none tabular-nums">
        <CountUpNumber end={value} />
        <span className="text-blue-500">{suffix}</span>
      </span>
      <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 mt-1">{label}</p>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ══════ SECTION 1: HERO ══════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Ambient Glows */}
        <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-blue-700/10 blur-[130px] rounded-full pointer-events-none" />
        {/* Grid texture */}
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 sm:px-10 text-center pt-36 pb-24 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center w-full">

            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white/5 border border-white/10 text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-12">
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                Software · Web · IoT · Cloud
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-[0.9] tracking-tight mb-8 w-full"
            >
              We Engineer
              <br />
              <span className="text-blue-500">
                Solutions.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-slate-400 font-medium max-w-xl mx-auto mb-14 leading-relaxed"
            >
              From hospital management ERPs to smart industrial automation — Softmusk crafts software that solves real-world complex problems with precision and excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
              <DotExpandButton href="/contact" variant="primary" className="shadow-[0_0_40px_rgba(10,191,255,0.3)]">
                Start a Project
              </DotExpandButton>
              <DotExpandButton href="#services" variant="outline">
                Explore Services
              </DotExpandButton>
            </motion.div>

            {/* Scroll Cue */}
            <motion.div aria-hidden="true" variants={fadeUp} custom={4} className="hidden sm:flex flex-col items-center gap-3 text-slate-500">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to explore</span>
              <motion.div
                animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-14 bg-gradient-to-b from-slate-500 to-transparent origin-top"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════ SECTION 2: STATS BAR ══════ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100"
          >
            {stats.map((stat, i) => (
              <StatCounterItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ SECTION 3: SERVICES IMAGE CARDS ══════ */}
      <section id="services" className="py-28 px-4 sm:px-6 lg:px-12 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Section Header */}
            <motion.div variants={fadeUp} custom={0} className="mb-16">
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-cyan-50 text-cyan-700 font-black text-[10px] tracking-widest uppercase mb-5 border border-cyan-100">
                What We Offer
              </span>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-slate-900 max-w-xl">
                  Our Core <span className="text-blue-500">Services</span>
                </h2>
                <p className="text-slate-500 text-base font-medium max-w-xs md:text-right leading-relaxed">
                  Six domains of expertise, one unified mission — to accelerate your business with world-class technology.
                </p>
              </div>
            </motion.div>

            {/* Image Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <motion.div key={srv.href} variants={fadeUp} custom={idx}>
                  <Link href={srv.href} className="group block h-full rounded-[10px] overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-[box-shadow,translate] duration-500 hover:-translate-y-1">

                    {/* Image */}
                    <div className="relative w-full h-52 overflow-hidden rounded-t-[10px]">
                      <Image
                        src={srv.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Dark overlay on hover */}
                      <div aria-hidden="true" className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-500" />
                      {/* Category tag on image */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-[10px] bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-md">
                          {srv.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-black font-heading text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">{srv.title}</h3>
                        <div aria-hidden="true" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 transition-colors duration-300 ml-3 mt-0.5">
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{srv.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ SECTION 4: WHAT WE BUILD ══════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-12 bg-slate-950 relative overflow-hidden">
        {/* Background glows */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/8 blur-[150px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/8 blur-[130px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Header */}
            <motion.div variants={fadeUp} custom={0} className="text-center mb-20 max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-white/5 border border-white/10 text-white/60 font-black text-[10px] tracking-widest uppercase mb-6">
                What We Build
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.05] tracking-tight mb-6">
                For Every Problem,
                <br />
                <span className="text-blue-500">
                  An Engineered Solution.
                </span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                We don&apos;t believe in one-size-fits-all. Every client comes to us with a unique challenge, and we build unique software to solve it — regardless of domain or industry.
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whatWeBuild.map((item, idx) => (
                <motion.div key={item.title} variants={fadeUp} custom={idx}
                  className="group p-8 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-colors duration-500 relative overflow-hidden"
                >
                  <div aria-hidden="true" className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-5">
                      {item.highlight}
                    </span>
                    <h3 className="text-2xl font-black text-white mb-3 font-heading">{item.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ SECTION 5: HOW WE WORK ══════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Header */}
            <motion.div variants={fadeUp} custom={0} className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-slate-100 text-slate-700 font-black text-[10px] tracking-widest uppercase mb-5">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900 mb-6">
                How We <span className="text-blue-500">Work</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
                A battle-tested delivery process designed to bring your vision to life with zero ambiguity.
              </p>
            </motion.div>

            {/* Steps */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 relative">
              <li aria-hidden="true" className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent list-none" />
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.li key={step.title} variants={fadeUp} custom={idx} className="flex flex-col items-center text-center px-3 group">
                    <div aria-hidden="true" className="relative w-24 h-24 rounded-full bg-white border-2 border-slate-200 flex flex-col items-center justify-center mb-6 z-10 shadow-md group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(10,191,255,0.15)] transition-all duration-300">
                      <Icon className="w-7 h-7 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.description}</p>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* ══════ SECTION 6: CTA BANNER ══════ */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white/5 border border-white/10 text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-10">
              <Zap aria-hidden="true" className="w-3 h-3 text-cyan-400 shrink-0" />
              Ready to get started?
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-[0.95] tracking-tight mb-8">
              Let&apos;s Build
              <br />
              <span className="text-blue-500">
                Something Great.
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-lg font-medium max-w-xl mx-auto mb-12 leading-relaxed">
              Have an idea? A problem to solve? A product to build? Our team is ready to turn your vision into reality.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DotExpandButton href="/contact" variant="primary" className="shadow-[0_0_40px_rgba(10,191,255,0.3)]">
                Start a Project
              </DotExpandButton>
              <DotExpandButton href="/internships" variant="outline">
                Join as Intern
              </DotExpandButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FaqSection id="faq" faqs={SERVICES_FAQS} title="IT services: common questions" intro="What we do, who we work with and how to get started." />
    </div>
  );
}
