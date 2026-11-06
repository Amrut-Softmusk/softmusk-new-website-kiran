"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  TerminalSquare,
  Briefcase,
  MapPin,
  Clock,
  X,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Zap,
  Code2,
  Cpu,
} from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { SplitText } from "@/components/ui/SplitText";
import { FormStatus, HoneypotField } from "@/components/ui/FormStatus";
import { CAREERS_EMAIL } from "@/lib/mailto";
import { useEnquiry } from "@/lib/useEnquiry";
import { CV_TYPES } from "@/lib/enquiry";
import { ROLES } from "./roles";

// ─── Animation Variants ─────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 }
  })
};

// ─── Data: Open Roles ───────────────────────────────────────────────


type Role = (typeof ROLES)[number];

const DEPARTMENTS = ["All", "Engineering", "Cloud & DevOps", "Product & UI/UX", "Marketing", "Technical Support"];

const inputClass =
  "w-full bg-slate-50 border border-slate-200 rounded-[10px] px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/20 transition-colors";
const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-slate-500";

// ─── Apply Modal ────────────────────────────────────────────────────

function ApplyModal({ role, onClose }: { role: Role; onClose: () => void }) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { status, message, fallbackHref, send, sending } = useEnquiry(CAREERS_EMAIL);

  // Pause smooth scroll while open
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  // Scroll lock, focus in, Esc to close, Tab trap, focus back to opener
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "");
    send(e.currentTarget, { kind: "careers", subject: `Application — ${role.title} — ${get("name")}`, replyTo: get("email"), fields: [
      ["Role", role.title],
      ["Name", get("name")],
      ["Email", get("email")],
      ["Phone / WhatsApp", get("phone")],
      ["GitHub / Portfolio", get("portfolio")],
      ["What I have built", get("about")],
    ] });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto overscroll-contain"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg my-auto rounded-[10px] bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl text-slate-900"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute top-5 right-5 w-9 h-9 rounded-[10px] bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <form onSubmit={handleSubmit} className="relative space-y-4">
          <HoneypotField />
          <div className="pr-10">
            <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: role.accentColor }}>
              Applying for
            </span>
            <h3 id="apply-title" className="text-2xl font-black font-heading text-slate-900 tracking-tight">
              {role.title}
            </h3>
          </div>

          <div className="space-y-1">
            <label htmlFor="apply-name" className={labelClass}>Full Name</label>
            <input id="apply-name" name="name" type="text" required autoComplete="name" maxLength={100} placeholder="Jane Doe" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="apply-email" className={labelClass}>Email Address</label>
              <input id="apply-email" name="email" type="email" required autoComplete="email" maxLength={150} placeholder="jane@example.com" className={inputClass} />
            </div>
            <div className="space-y-1">
              <label htmlFor="apply-phone" className={labelClass}>Phone / WhatsApp</label>
              <input id="apply-phone" name="phone" type="tel" required autoComplete="tel" maxLength={30} placeholder="+91 98765 43210" className={inputClass} />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="apply-portfolio" className={labelClass}>GitHub / Portfolio URL</label>
            <input id="apply-portfolio" name="portfolio" type="url" required autoComplete="url" maxLength={200} placeholder="https://github.com/yourusername" className={inputClass} />
          </div>

          <div className="space-y-1">
            <label htmlFor="apply-about" className={labelClass}>What have you built?</label>
            <textarea
              id="apply-about"
              name="about"
              rows={3}
              required
              maxLength={2000}
              placeholder="Tell us about a project you are proud of, a tough bug you solved, or your experience..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="apply-cv" className={labelClass}>
              CV / Resume <span className="normal-case tracking-normal font-medium text-slate-400">(PDF or Word, max 4 MB)</span>
            </label>
            <input
              id="apply-cv"
              name="cv"
              type="file"
              accept={CV_TYPES.join(",")}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-[8px] file:border-0 file:bg-slate-100 file:px-4 file:py-2.5 file:text-xs file:font-bold file:uppercase file:tracking-wider file:text-slate-700 hover:file:bg-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full min-h-12 px-8 py-3.5 rounded-[10px] font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-br from-[#0ABFFF] to-[#1D7CE0] shadow-md transition-all hover:shadow-[0_10px_30px_rgba(29,124,224,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
          >
            {sending ? "Sending…" : "Send Application"}
          </button>

          <FormStatus status={status} message={message} fallbackHref={fallbackHref} email={CAREERS_EMAIL} />
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export default function CareersPage() {
  const lenis = useLenis();
  const [selectedDept, setSelectedDept] = useState("All");
  const [expandedRole, setExpandedRole] = useState<string | null>("senior-fullstack");
  const [applyModalRole, setApplyModalRole] = useState<Role | null>(null);
  const closeModal = useCallback(() => setApplyModalRole(null), []);

  // Hero grid parallax via motion values (no React re-render per mouse move)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gridX = useSpring(mx, { stiffness: 60, damping: 20 });
  const gridY = useSpring(my, { stiffness: 60, damping: 20 });
  const handleHeroPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.03);
    my.set((e.clientY - r.top - r.height / 2) * 0.03);
  };

  const filteredRoles = selectedDept === "All"
    ? ROLES
    : ROLES.filter(r => r.department === selectedDept);

  const scrollToRoles = () => {
    if (lenis) lenis.scrollTo("#open-positions");
    else document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/20 overflow-x-clip">

      {/* ══════ 1. CINEMATIC DARK HERO SECTION ══════ */}
      <section onPointerMove={handleHeroPointer} className="relative pt-40 pb-36 bg-slate-950 text-white overflow-hidden">

        {/* Parallax grid following the mouse */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-8 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            x: gridX,
            y: gridY
          }}
        />

        {/* Ambient Radial Brand Glows */}
        <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1/4 right-1/4 w-[400px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* Status Badge */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-bold uppercase tracking-[0.25em]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SOFTMUSK CAREERS</span>
              <span className="text-slate-500" aria-hidden="true">•</span>
              <span className="text-cyan-400">OPEN POSITIONS AVAILABLE</span>
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black leading-[0.95] tracking-tight mb-8">
            <SplitText text="Build What" delayOffset={0} /><br/>
            <SplitText text="Actually " delayOffset={0.4} />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 20 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 inline-block"
            >
              Matters.
            </motion.span>
          </h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto mb-12"
          >
            We are an engineering-driven software company building enterprise platforms that power thousands of live businesses. High agency, zero bureaucracy, and continuous shipping.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticWrapper>
              <DotExpandButton
                onClick={scrollToRoles}
                variant="primary"
                size="default"
                className="shadow-[0_0_40px_rgba(10,191,255,0.25)]"
              >
                Explore Open Roles
              </DotExpandButton>
            </MagneticWrapper>
          </motion.div>

        </div>
      </section>

      {/* ══════ 2. HIGHLIGHT PILLARS ══════ */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-6 -mt-16 mb-20">
        <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-[10px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          {[
            { label: "Work Model", value: "Remote & Hybrid", icon: Globe2, color: "#1D7CE0" },
            { label: "Speed Standard", value: "< 50ms Latency", icon: Zap, color: "#F59E0B" },
            { label: "Deployment", value: "Weekly Production", icon: Code2, color: "#10B981" },
            { label: "Culture", value: "Zero Bureaucracy", icon: Cpu, color: "#6366F1" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="p-5 rounded-[10px] bg-slate-50 border border-slate-100 flex items-center gap-4"
              >
                <span
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span>
                  <span className="block font-bold text-sm text-slate-900">{item.value}</span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ══════ 3. OPEN POSITIONS ══════ */}
      <section id="open-positions" className="py-16 pb-32 px-6">
        <div className="max-w-[1240px] mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-100 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">
                Current Openings
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div role="group" aria-label="Filter by department" className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-[10px] border border-slate-200/80">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  aria-pressed={selectedDept === dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-[10px] text-xs font-bold transition-all duration-200 ${
                    selectedDept === dept
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <motion.ul layout className="space-y-4">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredRoles.map((role) => {
                const isExpanded = expandedRole === role.id;
                const panelId = `role-panel-${role.id}`;

                return (
                  <motion.li
                    layout
                    key={role.id}
                    id={role.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[10px] bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Card header: whole row toggles via the title button's stretched hit area */}
                    <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: `${role.accentColor}15`, color: role.accentColor }}
                          >
                            {role.department}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                            {role.type}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                            {role.location}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                            {role.experience}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                            onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                            className="text-left rounded-[10px] after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-[var(--ring)] focus-visible:after:-outline-offset-2 focus-visible:after:rounded-[10px]"
                          >
                            {role.title}
                          </button>
                        </h3>

                        <ul className="flex flex-wrap items-center gap-2" aria-label="Tech stack">
                          {role.stack.map((tech) => {
                            const TechIcon = tech.icon;
                            return (
                              <li
                                key={tech.name}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-slate-100 border border-slate-200/60 text-xs font-medium text-slate-700"
                              >
                                <TechIcon className="w-3.5 h-3.5" style={{ color: tech.color }} aria-hidden="true" />
                                <span>{tech.name}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setApplyModalRole(role)}
                          className="relative z-10 px-8 py-3.5 rounded-[10px] font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Apply Now
                        </button>
                        <span aria-hidden="true" className="w-9 h-9 rounded-[10px] bg-slate-100 flex items-center justify-center text-slate-500">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </span>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={panelId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 px-6 sm:px-8 py-6 bg-slate-50/70">
                            <div className="max-w-3xl space-y-6">
                              <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Role Overview</h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">{role.overview}</p>
                              </div>

                              <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Key Requirements</h4>
                                <ul className="space-y-2.5">
                                  {role.requirements.map((req) => (
                                    <li key={req} className="flex items-start gap-3 text-sm text-slate-700">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-2">
                                <button
                                  type="button"
                                  onClick={() => setApplyModalRole(role)}
                                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                  Apply for {role.title}
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

        </div>
      </section>

      {/* ══════ 4. CLOSING CTA ══════ */}
      <section className="relative py-32 px-6 overflow-hidden bg-slate-950 text-white">

        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-600/20 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center bg-black/40 backdrop-blur-xl border border-white/10 p-8 sm:p-12 md:p-20 rounded-[10px] shadow-[0_0_50px_rgba(59,130,246,0.1)]"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mx-auto mb-8"
          >
            <TerminalSquare className="w-12 h-12 text-blue-500" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">
            Don&apos;t See Your Role?
          </h2>

          <p className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            We always create room for exceptional engineering, design, and product talent. Send us your GitHub, portfolio, and what you love to build.
          </p>

          <MagneticWrapper className="inline-block">
            <a
              href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Open application — Softmusk")}`}
              className="inline-flex items-center gap-3 px-8 py-3.5 min-h-14 bg-white text-slate-900 font-black uppercase tracking-widest text-sm rounded-[10px] hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
            >
              <span>Email Your Work &amp; Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticWrapper>
        </motion.div>

      </section>

      {/* ══════ 5. APPLY MODAL ══════ */}
      <AnimatePresence>
        {applyModalRole && (
          <ApplyModal key={applyModalRole.id} role={applyModalRole} onClose={closeModal} />
        )}
      </AnimatePresence>

    </div>
  );
}
