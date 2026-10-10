"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ArrowLeft, Zap } from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { servicesData } from "./data";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ServiceDetailView({ slug }: { slug: string }) {
  const service = servicesData[slug];

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        </div>

        {/* Back Button */}
        <Link href="/services" className="absolute top-28 left-6 sm:left-12 z-20 flex items-center gap-2 text-white/70 hover:text-white text-xs font-black uppercase tracking-widest transition-colors group rounded-[10px]">
          <ArrowLeft aria-hidden="true" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Services
        </Link>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 pb-20 pt-40 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white/10 backdrop-blur-md border border-white/15 text-white/70 text-[10px] font-black uppercase tracking-widest mb-6">
                <span aria-hidden="true" className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                {service.category}
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.92] tracking-tight mb-6 max-w-4xl">
              {service.title}
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
              {service.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className="bg-slate-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5"
          >
            {service.stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 text-center bg-slate-950">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white mb-2">{stat.value}</span>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ OVERVIEW ══════ */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-slate-100 text-slate-600 font-black text-[10px] tracking-widest uppercase mb-6">Overview</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900 mb-6 leading-tight">
                What We <span className="text-blue-500">Deliver</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                {service.description}
              </p>
              <DotExpandButton href="/contact" variant="primary">
                Discuss Your Project
              </DotExpandButton>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="space-y-4">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-start gap-4 p-5 rounded-[10px] bg-slate-50 border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50/30 transition-colors group">
                  <CheckCircle2 aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-cyan-500" />
                  <span className="text-sm font-bold text-slate-700">{b}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════ OFFERINGS ══════ */}
      <section className="py-24 px-6 sm:px-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-slate-100 text-slate-600 font-black text-[10px] tracking-widest uppercase mb-5">What&apos;s Included</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
                Our <span className="text-blue-500">Offerings</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.offerings.map((o, idx) => (
                <motion.div key={o.title} variants={fadeUp} custom={idx}
                  className="group p-8 bg-white rounded-[10px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-transparent hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px]" />
                  <div aria-hidden="true" className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: service.color + "20" }}>
                      <Icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-3 font-heading">{o.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-[10px] bg-slate-100 text-slate-600 font-black text-[10px] tracking-widest uppercase mb-5">Real-World Applications</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
                Where We <span className="text-blue-500">Excel</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.useCases.map((uc, idx) => (
                <motion.div key={uc.title} variants={fadeUp} custom={idx} className="group rounded-[10px] overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-[box-shadow,translate] duration-500 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden rounded-t-[10px]">
                    <Image src={uc.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div aria-hidden="true" className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-lg text-slate-900 mb-2 font-heading">{uc.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{uc.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section className="relative py-28 px-6 sm:px-12 bg-slate-950 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest mb-8">
              <Zap aria-hidden="true" className="w-3 h-3 text-cyan-400" />
              Ready to start?
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white leading-[0.95] tracking-tight mb-6">
              Let&apos;s Build Your <span className="text-blue-500">{service.title}</span> Solution
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">
              Tell us about your project and our team will get back to you within 24 hours with a tailored proposal.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DotExpandButton href="/contact" variant="primary" className="shadow-[0_0_40px_rgba(10,191,255,0.3)]">
                Get a Free Consultation
              </DotExpandButton>
              <DotExpandButton href="/services" variant="outline">
                View All Services
              </DotExpandButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
