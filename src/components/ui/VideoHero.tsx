"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { SplitText } from "@/components/ui/SplitText";

export function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the hero text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-20"
    >
      {/* Animated Tech Background */}
      <div aria-hidden="true" className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#020617]">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />

        {/* Floating Glowing Orbs */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Deep tech overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen Workshops
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[1.05] tracking-tight mb-8">
          <SplitText text="Empower Your Campus" delayOffset={0.1} /> <br/>
          <span className="text-blue-500">
            <SplitText text="With Industry Skills." delayOffset={0.5} />
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mb-12"
        >
          Bring SoftMusk&apos;s world-class engineering experts directly to your students. Intensive, hands-on masterclasses in Next.js, React, Cloud, and UI/UX.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <DotExpandButton href="#request-form" variant="primary" size="lg" className="shadow-[0_0_40px_rgba(37,99,235,0.4)]">
            Request a Workshop
          </DotExpandButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
