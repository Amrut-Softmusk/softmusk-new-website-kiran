"use client";

import { VideoHero } from "@/components/ui/VideoHero";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { WorkshopForm } from "@/components/ui/WorkshopForm";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const resources = [
  {
    title: "Next.js Masterclass",
    type: "ppt" as const,
    description: "The official SoftMusk presentation deck used for our intensive Next.js 14 App Router workshops. Includes architecture diagrams, best practices, and hands-on exercises.",
    fileSize: "3.4 MB",
    downloadUrl: "/resources/Next.js-Workshop-SoftMusk.pptx",
  },
  {
    title: "Portfolio User Manual",
    type: "pdf" as const,
    description: "A comprehensive guide provided to students for building their own premium developer portfolio using React and Tailwind CSS during the workshop.",
    fileSize: "96 KB",
    downloadUrl: "/resources/Portfolio-Next.js-User-Manual.pdf",
  }
];

const benefits = [
  {
    title: "Industry-Ready Curriculum",
    description: "We don't teach theory. We teach students how to ship production-grade applications that top tech companies actually want.",
    iconType: "code",
    image: "/images/workshop_curriculum.jpg"
  },
  {
    title: "Expert Mentorship",
    description: "Workshops are led by senior engineers who build enterprise software every day, providing real-world insights and code reviews.",
    iconType: "users",
    image: "/images/workshop_mentorship.jpg"
  },
  {
    title: "Modern Tech Stack",
    description: "Focus on Next.js, React, Cloud architectures (AWS/Vercel), and modern UI/UX principles (Tailwind, Framer Motion).",
    iconType: "cloud",
    image: "/images/workshop_techstack.jpg"
  },
  {
    title: "Hands-on Projects",
    description: "Students leave the workshop with a deployed, high-quality project they can immediately add to their resumes.",
    iconType: "web",
    image: "/images/workshop_projects.jpg"
  }
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
      case "users":
        return (
          <>
            <motion.path variants={draw} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <motion.circle variants={draw} cx="9" cy="7" r="4" />
            <motion.path variants={draw} d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <motion.path variants={draw} d="M16 3.13a4 4 0 0 1 0 7.75" />
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

export default function WorkshopsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-blue-500/30">
      <VideoHero />

      {/* Why SoftMusk Section */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-6">
              Bridging the Gap Between <br className="hidden md:block"/>
              <span className="text-blue-600">Academia and Industry</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Traditional college curriculums struggle to keep up with the fast-paced tech industry. SoftMusk workshops inject Silicon Valley engineering standards directly into your campus.
            </p>
          </motion.div>

          <div className="flex flex-col gap-20 lg:gap-32">
            {benefits.map((benefit, idx) => (
              <div
                key={benefit.title}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}
              >
                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 flex flex-col items-start"
                >
                  <div className="mb-8" aria-hidden="true">
                    <AnimatedIcon type={benefit.iconType} color="#0ea5e9" className="w-20 h-20" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6 tracking-tight leading-tight">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10">
                    {benefit.description}
                  </p>
                  
                  <a
                    href="#request-form"
                    className="group inline-flex items-center gap-2 text-sky-600 font-bold text-sm tracking-widest uppercase rounded-[10px]"
                  >
                    Request this workshop
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden shadow-2xl">
                    <Image 
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover hover:scale-105 transition-transform duration-1000"
                    />
                    {/* Subtle inner shadow overlay */}
                    <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[10px]" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Materials / Downloads */}
      <section className="py-32 px-4 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                Open Source
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900">
                Workshop Resources
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-lg">
              Download our official workshop materials to see the quality and depth of the curriculum we bring to your campus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {resources.map((res, idx) => (
              <ResourceCard key={res.title} {...res} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="request-form" className="py-32 px-4 relative bg-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] pointer-events-none [mask-image:linear-gradient(180deg,transparent,black,transparent)]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight">
              Bring SoftMusk to <br className="hidden md:block"/> 
              <span className="text-blue-400">Your Campus</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Fill out the form below and our academic relations team will get back to you within 24 hours to schedule a consultation.
            </p>
          </motion.div>

          <WorkshopForm />
        </div>
      </section>
    </div>
  );
}
