"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Enterprise", "Web & App", "IIoT", "Digital"];

const projects = [
  {
    num: "01",
    category: "Enterprise",
    title: "MediMusk — Medical Billing ERP",
    description: "A full-suite ERP system for wholesale and retail medical billing, covering inventory, invoicing, and tax compliance for healthcare distributors.",
    outcome: "60% reduction in billing errors",
    tag: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    year: "2023",
  },
  {
    num: "02",
    category: "Enterprise",
    title: "Hospital Management System",
    description: "End-to-end platform handling patient registration, appointments, pharmacy, lab results, and staff management for multi-branch hospitals.",
    outcome: "Deployed across 3 hospital chains",
    tag: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop",
    year: "2022",
  },
  {
    num: "03",
    category: "Enterprise",
    title: "Point of Sale System",
    description: "High-speed POS software for retail and restaurant chains — multi-branch inventory, real-time sales reporting, and customer management.",
    outcome: "Used by 50+ retail outlets",
    tag: "Retail",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop",
    year: "2022",
  },
  {
    num: "04",
    category: "Web & App",
    title: "Internship Management Portal",
    description: "Full-stack web platform for managing student internship applications, program assignments, mentor tracking, and offer letter generation.",
    outcome: "500+ students onboarded",
    tag: "EdTech",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80&auto=format&fit=crop",
    year: "2023",
  },
  {
    num: "05",
    category: "Web & App",
    title: "E-Commerce Platform",
    description: "Custom-built online storefront for a wholesale medical distributor with product catalogue, order management, payment gateway, and delivery tracking.",
    outcome: "3x increase in online orders",
    tag: "E-Commerce",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&auto=format&fit=crop",
    year: "2023",
  },
  {
    num: "06",
    category: "IIoT",
    title: "Industrial Monitoring Dashboard",
    description: "Real-time IIoT dashboard for a manufacturing plant — connecting 100+ sensors to a cloud platform with predictive maintenance alerting.",
    outcome: "40% reduction in downtime",
    tag: "Manufacturing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop",
    year: "2024",
  },
  {
    num: "07",
    category: "Digital",
    title: "Hackathon Brand Campaign",
    description: "Full digital marketing campaign for Softmusk's sponsored hackathon at Jain College of Engineering — 300+ registrations through social and SEO.",
    outcome: "300+ student registrations",
    tag: "Marketing",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&auto=format&fit=crop",
    year: "2023",
  },
  {
    num: "08",
    category: "Web & App",
    title: "Topovan Ashram Website",
    description: "A serene, beautifully crafted website for Topovan of Shri Kumarswamiji Dharwad — featuring event listings, digital donations, and media galleries.",
    outcome: "Delivered to full satisfaction",
    tag: "Non-Profit",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=900&q=80&auto=format&fit=crop",
    year: "2021",
  },
  {
    num: "09",
    category: "Enterprise",
    title: "General Distributor ERP",
    description: "Comprehensive distribution management ERP for FMCG distributors — covering purchase orders, route-based delivery, and ledger reconciliation.",
    outcome: "30% faster reconciliation",
    tag: "Distribution",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80&auto=format&fit=crop",
    year: "2022",
  },
];

const testimonials = [
  {
    review: "Best design & development for industrial level websites and services. Nice team work and support. Thanks, Softmusk Info & Team.",
    name: "CEO",
    company: "M/s S G Industries",
    initials: "SG",
  },
  {
    review: "We had an absolutely fantastic experience collaborating with SoftMusk on our recent hackathon. They were a supportive and professional partner throughout the event. Highly recommend!",
    name: "Shri. Nitesh Kalyanshetti",
    company: "TPO, Jain College of Engineering, Belagavi",
    initials: "NK",
  },
  {
    review: "Grateful for the incredible internship opportunity at Softmusk! The expert mentors provided valuable guidance, helping me enhance my technical skills and shape my career.",
    name: "Mr. Rohan Pawar",
    company: "Engineering Student, SGBIT Belagavi",
    initials: "RP",
  },
  {
    review: "Nice work and totally satisfied. Softmusk provides good work. Thank you team and Softmusk company.",
    name: "Trustee",
    company: "Topovan of Shri Kumarswamiji, Dharwad",
    initials: "TV",
  },
];

// ─── Project row: cursor-following preview (mouse) + expandable details ──────

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rowRef = useRef<HTMLDivElement>(null);
  const panelId = `project-${project.num}`;

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 150);
    mouseY.set(e.clientY - rect.top - 100);
  };

  return (
    <motion.div
      ref={rowRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative group border-b border-slate-200"
    >
      {/* Floating preview image — follows the mouse, hidden while details are open */}
      <motion.div
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        className="pointer-events-none absolute z-20 w-[300px] h-[200px] rounded-[10px] overflow-hidden shadow-2xl hidden md:block"
        animate={{ opacity: hovered && !open ? 1 : 0, scale: hovered && !open ? 1 : 0.85 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={project.image} alt="" fill className="object-cover" sizes="300px" />
      </motion.div>

      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-6 py-8 text-left rounded-[10px]"
        >
          <span className="block min-w-0">
            <span className="flex items-center gap-3 mb-1">
              <span className="px-2.5 py-1 rounded-[10px] bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                {project.tag}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">{project.year}</span>
            </span>
            <span className="block text-xl md:text-2xl font-black font-heading text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 leading-tight">
              {project.title}
            </span>
          </span>

          <span className="flex items-center gap-6 shrink-0">
            <span className="text-xs font-bold text-emerald-700 hidden md:flex items-center gap-1.5">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {project.outcome}
            </span>
            <span
              aria-hidden="true"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                open ? "bg-cyan-500 border-cyan-500 rotate-90" : "border-slate-200 group-hover:bg-cyan-500 group-hover:border-cyan-500"
              }`}
            >
              <ArrowUpRight className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 pb-8">
              <div>
                <p className="text-slate-600 leading-relaxed mb-4">{project.description}</p>
                <p className="text-sm font-bold text-emerald-700 md:hidden">{project.outcome}</p>
              </div>
              <div className="relative h-44 rounded-[10px] overflow-hidden md:hidden">
                <Image src={project.image} alt="" fill className="object-cover" sizes="100vw" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center bg-slate-950 overflow-hidden pt-28 pb-24">
        {/* Parallax background image */}
        <motion.div aria-hidden="true" style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&auto=format&fit=crop"
            alt=""
            fill sizes="100vw" className="object-cover opacity-20" priority
          />
        </motion.div>
        {/* Gradient overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        {/* Glow */}
        <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-[1000px] mx-auto px-6 text-center"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.25em] mb-10"
            >
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              250+ Clients · 100+ Projects · 10+ Years
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="text-6xl sm:text-7xl md:text-[110px] font-heading font-black text-white leading-[0.88] tracking-tight mb-10"
            >
              Our
              <br />
              <span className="text-blue-500">
                Work.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } } }}
              className="text-lg sm:text-xl text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
            >
              Real problems. Engineered solutions. Every project built to outlast the brief.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 text-slate-500">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </div>
      </section>

      {/* ══════ STATS ROW ══════ */}
      <section className="bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
          >
            {[
              { val: "250+", label: "Happy Clients" },
              { val: "100+", label: "Projects Delivered" },
              { val: "20+", label: "Team Members" },
              { val: "10+", label: "Years in Business" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 text-center bg-slate-950"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-blue-500 mb-2">{s.val}</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ PROJECT LIST — numbered hover reveal ══════ */}
      <section className="py-28 px-6 sm:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Header + Filter */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">Case Studies</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-slate-900 leading-[0.95] tracking-tight">
                Selected
                <br />
                <span className="text-blue-500">Projects</span>
              </h2>
            </motion.div>

            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-[10px] text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Project rows */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-200"
            >
              {filtered.map((project, idx) => (
                <ProjectRow key={project.num} project={project} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════ ABOUT / OBJECTIVE ══════ */}
      <section className="py-24 px-6 sm:px-12 bg-slate-950 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">Our Objective</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight tracking-tight mb-8">
                We solve complex problems through{" "}
                <span className="text-blue-500">
                  precision engineering.
                </span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed text-lg mb-6">
                With an objective to solve complex issues for our clients, we specialise in product development and custom software — scalable web apps, native mobile applications, and industrial automation systems.
              </p>
              <p className="text-slate-400 font-medium leading-relaxed">
                We focus on building long-term relationships, empowering businesses to analyze their operations through a digital lens. Our industry expertise spans Healthcare, Retail, Manufacturing, EdTech, and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { val: "Healthcare", desc: "Medical ERP & hospital management" },
                { val: "Retail", desc: "POS and distribution software" },
                { val: "Manufacturing", desc: "IIoT monitoring & automation" },
                { val: "EdTech", desc: "Internship & learning platforms" },
              ].map((item, i) => (
                <motion.div
                  key={item.val}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="p-6 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-colors duration-300 group"
                >
                  <h3 className="font-black text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">{item.val}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-slate-900 leading-[0.95] tracking-tight">
              What Clients
              <br />
              <span className="text-blue-500">Actually Say.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <motion.figure
                key={t.name + t.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group p-8 rounded-[10px] border border-slate-200 bg-white hover:border-cyan-200 hover:shadow-xl transition-[border-color,box-shadow] duration-500 relative overflow-hidden"
              >
                <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div role="img" aria-label="Rated 5 out of 5" className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 font-medium leading-relaxed text-base mb-8 italic">
                  &ldquo;{t.review}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <div aria-hidden="true" className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{t.company}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative py-36 px-6 sm:px-12 bg-slate-950 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Your project could be next</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-[0.92] tracking-tight mb-8">
              Let&apos;s Build
              <br />
              <span className="text-blue-500">
                Together.
              </span>
            </h2>
            <p className="text-slate-400 text-lg font-medium mb-12 leading-relaxed max-w-lg mx-auto">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DotExpandButton href="/contact" variant="primary" className="shadow-[0_0_50px_rgba(10,191,255,0.25)]">
                Start Your Project
              </DotExpandButton>
              <DotExpandButton href="/services" variant="outline">
                View Our Services
              </DotExpandButton>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
