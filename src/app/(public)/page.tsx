"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight, Target, Eye, Compass,
  Users, Briefcase, Trophy, Award
} from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { HomeHero } from "@/components/home/HomeHero";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { FaqSection } from "@/components/seo/FaqSection";
import { HOME_FAQS } from "@/lib/faqs";

// =====================================================================
// ANIMATION VARIANTS — Genesys + pfwci extracted patterns
// =====================================================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.11 }
  })
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.65, delay: i * 0.1 }
  })
};


// =====================================================================
// PORTFOLIO MARQUEE SECTION — auto-scrolling horizontal film strip
// =====================================================================
const portfolioItems = [
  { title: "MediMusk ERP", tag: "Healthcare", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop" },
  { title: "Hospital Management", tag: "Enterprise", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop" },
  { title: "Industrial IoT Dashboard", tag: "Industry 4.0", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop" },
  { title: "Point of Sale System", tag: "Retail", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format&fit=crop" },
  { title: "Internship Portal", tag: "EdTech", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&auto=format&fit=crop" },
  { title: "E-Commerce Platform", tag: "Digital", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80&auto=format&fit=crop" },
  { title: "Cloud Infrastructure", tag: "DevOps", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80&auto=format&fit=crop" },
  { title: "Hackathon Campaign", tag: "Marketing", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop" },
];

function PortfolioMarqueeSection() {
  return (
    <section className="w-full py-28 bg-white overflow-hidden border-t border-slate-100">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">Selected Work</span>
            <h2 className="text-5xl md:text-6xl font-heading font-black text-slate-900 leading-[0.95] tracking-tight">
              Built to<br />
              <span className="text-blue-500">Last.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-900 hover:text-cyan-600 transition-colors">
            View All Projects
            <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-500 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Marquee Track */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...portfolioItems, ...portfolioItems].map((item, i) => {
              const isClone = i >= portfolioItems.length;
              return (
              <Link key={i} href="/portfolio"
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
                className="group relative shrink-0 w-[260px] h-[180px] sm:w-[320px] sm:h-[220px] mx-3 rounded-[10px] overflow-hidden block"
              >
                <Image
                  src={item.image} alt="" fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2.5 py-1 rounded-[10px] bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-white font-black text-base leading-tight">{item.title}</h3>
                </div>
                {/* Corner arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-300 scale-0 group-hover:scale-100">
                  <ArrowRight className="w-4 h-4 text-slate-900 -rotate-45" />
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
function StatsSection() {
  const items = [
    { icon: Users, count: 250, suffix: "+", label: "Clients Served" },
    { icon: Award, count: 20, suffix: "+", label: "Team Experts" },
    { icon: Briefcase, count: 100, suffix: "+", label: "Projects Delivered" },
    { icon: Trophy, count: 10, suffix: "+", label: "Years of Experience" },
  ];
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
        >
          {items.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i} custom={i} variants={scaleIn}
                className="group flex flex-col items-center justify-center text-center py-14 px-4 hover:bg-primary/5 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: "linear-gradient(to right, #0ABFFF, #1D7CE0)" }} />
                <Icon className="h-7 w-7 mb-4 text-primary" aria-hidden="true" />
                <div className="text-4xl sm:text-5xl font-black font-heading text-foreground mb-1 tabular-nums">
                  <CountUpNumber end={a.count} suffix={a.suffix} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{a.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// SERVICES SECTION — Sticky Left Deck of Cards (Concept 1+2+3 Combined)
// =====================================================================

const SERVICE_CARDS = [
  {
    slug: "software-development", iconType: "code", title: "Software Development", tag: "MediMusk ERP", color: "#0ABFFF", bg: "/service_software_real.jpg",
    desc: "Hospital management ERP, wholesale & retail billing systems, and custom enterprise applications.",
  },
  {
    slug: "web-app-development", iconType: "web", title: "Web & App Development", tag: "Full Stack", color: "#1D7CE0", bg: "/service_web_real.jpg",
    desc: "UI/UX design for web & mobile, custom websites, Android & iOS applications, e-commerce solutions.",
  },
  {
    slug: "smart-industry", iconType: "iiot", title: "Smart Industry (IIoT)", tag: "Industrial IoT", color: "#0ABFFF", bg: "/service_iiot_real.jpg",
    desc: "Sensor integration, real-time monitoring dashboards, predictive maintenance and automation systems.",
  },
  {
    slug: "cloud-automation", iconType: "cloud", title: "Cloud Automation", tag: "DevOps / AWS", color: "#1D7CE0", bg: "/service_cloud_real.jpg",
    desc: "Infrastructure as Code, automated CI/CD deployment, cloud monitoring and cost optimization services.",
  },
];

const AnimatedIcon = ({ type, color, className }: { type: string, color: string, className?: string }) => {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 },
        opacity: { delay: 0.2, duration: 0.2 }
      }
    }
  };

  const getPaths = () => {
    switch (type) {
      case "code":
        return (
          <>
            <motion.polyline variants={draw} points="16 18 22 12 16 6" />
            <motion.polyline variants={draw} points="8 6 2 12 8 18" />
          </>
        );
      case "web":
        return (
          <>
            <motion.rect variants={draw} x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <motion.line variants={draw} x1="12" y1="18" x2="12.01" y2="18" />
          </>
        );
      case "iiot":
        return (
          <>
            <motion.rect variants={draw} x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <motion.rect variants={draw} x="9" y="9" width="6" height="6" />
            <motion.line variants={draw} x1="9" y1="1" x2="9" y2="4" />
            <motion.line variants={draw} x1="15" y1="1" x2="15" y2="4" />
            <motion.line variants={draw} x1="9" y1="20" x2="9" y2="23" />
            <motion.line variants={draw} x1="15" y1="20" x2="15" y2="23" />
            <motion.line variants={draw} x1="20" y1="9" x2="23" y2="9" />
            <motion.line variants={draw} x1="20" y1="14" x2="23" y2="14" />
            <motion.line variants={draw} x1="1" y1="9" x2="4" y2="9" />
            <motion.line variants={draw} x1="1" y1="14" x2="4" y2="14" />
          </>
        );
      case "cloud":
        return (
          <motion.path variants={draw} d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      className={className}
      style={{ filter: `drop-shadow(0px 0px 8px ${color}60)` }}
    >
      {getPaths()}
    </motion.svg>
  );
};

function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const op0 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.8, 0.9, 1, 1], [0, 1, 1, 1]);
  const ops = [op0, op1, op2, op3];


  return (
    <section ref={sectionRef} className="relative w-full bg-slate-950">

      {/* Sticky Dynamic Backgrounds Container */}
      <div aria-hidden="true" className="sticky top-0 w-full h-[100vh] overflow-hidden z-0">
        {SERVICE_CARDS.map((card, i) => (
          <motion.div
            key={card.slug}
            style={{ opacity: ops[i] }}
            className="absolute inset-0"
          >
            <Image
              src={card.bg}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            {/* Soft gradient overlay so the image remains clearly visible */}
            <div className="absolute inset-0 bg-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
          </motion.div>
        ))}
        {/* Global Section Background Pattern on top of images */}
        <div className="absolute inset-0 z-10 opacity-[0.1]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center pt-28 pb-12 -mt-[100vh]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px]" style={{ background: "linear-gradient(to right, #0ABFFF, #1D7CE0)" }} />
          <span className="font-black text-xs uppercase tracking-[0.28em]" style={{ color: "#0ABFFF" }}>What We Build</span>
          <div className="w-8 h-[2px]" style={{ background: "linear-gradient(to right, #0ABFFF, #1D7CE0)" }} />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white text-center">
          Our Core{" "}
          <span style={{ background: "linear-gradient(135deg, #0ABFFF, #1D7CE0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Services
          </span>
        </h2>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-48">
        {SERVICE_CARDS.map((card, i) => {
          return (
            <div
              key={card.slug}
              className="sticky top-0 w-full min-h-[100vh] py-24 flex flex-col justify-center service-card-wrapper"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full bg-white p-[10px] rounded-[10px] border border-border group shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col md:h-[450px] ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className="w-full md:w-[50%] p-8 md:p-12 flex flex-col justify-center bg-white relative">

                  <div className="flex flex-col items-start mb-6">
                    <span aria-hidden="true"><AnimatedIcon type={card.iconType} color={card.color} className="w-16 h-16 mb-6" /></span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 leading-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                    {card.desc}
                  </p>

                  <Link href={`/services/${card.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-transform hover:translate-x-1 mt-auto self-start rounded-[10px] text-[#1D7CE0]">
                    Explore Service <span className="sr-only">: {card.title}</span><ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                {/* Image Side (flush) */}
                <div className="w-full md:w-[50%] relative h-[250px] md:h-full shrink-0">
                  <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                    <Image
                      src={card.bg}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// =====================================================================
// MISSION SECTION — Expanding Accordion Cards (Concept 2)
// =====================================================================
function MissionSection() {
  const [active, setActive] = useState(0);

  const STAGES = [
    { title: "Our Mission", highlight: "Purpose Driven", icon: Target, desc: "To provide cutting-edge Information Technology training to businesses and individuals through highly focused, cost effective Job oriented training programs.", bg: "/Our-Mission.png" },
    { title: "Our Vision", highlight: "Future Ready", icon: Eye, desc: "To become the undisputed leader in IT and Corporate Training by consistently delivering high-quality, practical learning experiences and innovative enterprise solutions.", bg: "/Our-Vision.png" },
    { title: "Our Approach", highlight: "Client First", icon: Compass, desc: "We prioritize hands-on learning, personalized mentorship, and real-world project experience to bridge the gap between academia and industry while delivering state-of-the-art corporate solutions.", bg: "/Our-Approach.png" },
  ];

  return (
    <section id="about" className="w-full bg-gradient-to-br from-[#F4F9FF] via-[#E8F3FF] to-[#F4F9FF] pt-28 md:pt-40 pb-28 text-slate-900 overflow-hidden border-t border-[#1D7CE0]/10 relative z-10">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-16 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px]" style={{ background: "linear-gradient(to right, #0ABFFF, #1D7CE0)" }} />
          <span className="font-black text-xs uppercase tracking-[0.28em]" style={{ color: "#0ABFFF" }}>Who We Are</span>
          <div className="w-8 h-[2px]" style={{ background: "linear-gradient(to right, #0ABFFF, #1D7CE0)" }} />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-center text-slate-900">
          Building the Future of Tech
        </h2>
      </motion.div>

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-[550px] lg:h-[650px] flex flex-col lg:flex-row gap-4">
        {STAGES.map((item, i) => {
          const isActive = active === i;
          return (
            <div
              key={item.title}
              onMouseEnter={() => setActive(i)}
              className="relative rounded-[10px] overflow-hidden flex flex-col justify-end border border-[#1D7CE0]/10 shadow-[0_20px_40px_rgba(29,124,224,0.08)] bg-white group transition-all duration-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ flex: isActive ? 4 : 1 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image src={item.bg} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className={`object-cover object-[85%_center] transition-transform duration-[2s] ${isActive ? 'scale-105' : 'scale-100'}`} />
                <div className={`absolute inset-0 transition-all duration-700 pointer-events-none ${isActive ? 'bg-gradient-to-r from-white/95 via-white/50 to-transparent' : 'bg-white/40 group-hover:bg-white/20'}`} />
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end">

                {/* Horizontal Content (Visible when active) */}
                <div inert={!isActive} className={`p-6 lg:p-10 w-full lg:w-[700px] max-w-full transition-opacity duration-500 delay-100 ${isActive ? 'opacity-100' : 'opacity-0 lg:opacity-0 absolute pointer-events-none'}`}>
                  <div className="flex flex-col mb-6">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-cyan-600 mb-1.5">{item.highlight}</span>
                      <h3 className="text-3xl lg:text-4xl font-heading font-black text-slate-900 leading-tight">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-700 max-w-xl text-sm lg:text-base leading-relaxed mb-8">
                    {item.desc}
                  </p>

                  <Link href="/services" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 transition-transform hover:translate-x-1 group/link rounded-[10px]">
                    Explore Services <ArrowRight className="h-4 w-4 text-cyan-600 group-hover/link:text-cyan-800 transition-colors" />
                  </Link>
                </div>

                {/* Vertical Content (Visible when inactive on desktop) */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                  tabIndex={isActive ? -1 : 0}
                  className={`absolute inset-0 flex items-center justify-center px-6 lg:flex-col lg:justify-end lg:pb-12 transition-opacity duration-300 rounded-[10px] ${!isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <span className="text-slate-700 group-hover:text-slate-900 font-black uppercase text-sm whitespace-nowrap transition-colors duration-300 tracking-[0.2em] lg:tracking-[0.3em] lg:-rotate-90 lg:origin-bottom lg:mb-24">
                    {item.title}
                  </span>
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


// =====================================================================
// TESTIMONIALS — staggered quote cards
// =====================================================================
function TestimonialsSection() {
  const items = [
    { name: "CEO", company: "M/s S G INDUSTRIES", text: "Best design & development for industrial level websites and services. Nice team work and support. Thanks, Softmusk Info & Team." },
    { name: "TPO, Jain College of Engineering", company: "Shri. Nitesh Kalyanshetti, Belagavi", text: "We had a fantastic experience collaborating with SoftMusk on our hackathon. Highly impressed by their commitment to offering valuable internship opportunities. Highly recommend!" },
    { name: "Engineering Student", company: "Mr. Rohan Pawar, SGBIT Belagavi", text: "Grateful for the incredible internship opportunity! Expert mentors provided valuable guidance helping me enhance my technical skills and shape my career. Thank you Softmusk team 😊" },
    { name: "Topovan of Shri Kumarswamiji", company: "Dharwad", text: "Nice work and totally satisfied. Softmusk provides good work. Thank you team and Softmusk company." },
  ];

  return (
    <section className="w-full bg-background py-28 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center text-center mb-20">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary font-black text-xs uppercase tracking-[0.25em]">What Clients Say</span>
            <div className="w-8 h-[2px] bg-primary" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-heading font-black mb-4">Trusted by Industries</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-md">
            From engineering colleges to industrial clients — our work speaks for itself.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.figure key={t.company} custom={i} variants={scaleIn}
              className="group bg-card rounded-[10px] border-2 border-border p-8 hover:border-primary transition-[border-color,box-shadow,translate] duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl">
              <span aria-hidden="true" className="absolute -top-2 right-6 text-[96px] font-black leading-none select-none" style={{ color: "var(--border)" }}>&ldquo;</span>
              <div className="absolute top-0 left-0 w-1 h-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                style={{ background: "linear-gradient(to bottom, #0ABFFF, #1D7CE0)" }} />

              <blockquote className="text-muted-foreground text-base leading-relaxed mb-8 italic relative z-10">&ldquo;{t.text}&rdquo;</blockquote>

              <figcaption className="flex items-center gap-4 border-t border-border pt-6">
                <div aria-hidden="true" className="w-12 h-12 rounded-[10px] flex items-center justify-center font-black text-white font-heading text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, #0ABFFF, #1D7CE0)" }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">{t.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-0.5">{t.company}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// CTA SECTION — bold dark closing section
// =====================================================================
function CTASection() {
  return (
    <section className="w-full py-28 relative overflow-hidden bg-[#050508]">
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-60%] left-[10%] w-[80vw] h-[80vw] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(10,191,255,0.12) 0%, transparent 65%)" }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center gap-8">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="w-8 h-[2px]" style={{ background: "#0ABFFF" }} />
            <span className="font-black text-xs uppercase tracking-[0.25em]" style={{ color: "#0ABFFF" }}>Start Today</span>
            <div className="w-8 h-[2px]" style={{ background: "#0ABFFF" }} />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white max-w-3xl leading-tight">
            Ready to Build Something{" "}
            <span style={{ background: "linear-gradient(135deg, #0ABFFF, #1D7CE0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Extraordinary?
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-md">
            Let&apos;s turn your idea into a product users love. Contact us today.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <DotExpandButton href="/contact" variant="primary" className="shadow-[0_12px_40px_rgba(29,124,224,0.5)]">
              Get In Touch
            </DotExpandButton>
            <DotExpandButton href="/services" variant="outline">
              View Services
            </DotExpandButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================================================================
// PAGE ASSEMBLY
// =====================================================================
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeHero />
      <StatsSection />
      <ServicesSection />
      <MissionSection />
      <PortfolioMarqueeSection />
      <TestimonialsSection />
      <FaqSection
        id="faq"
        faqs={HOME_FAQS}
        title="Softmusk at a glance"
        intro="Quick answers about who we are, where we are and what we build."
      />
      <CTASection />
    </div>
  );
}
