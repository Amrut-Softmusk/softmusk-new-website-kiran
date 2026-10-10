"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { ShieldCheck, TerminalSquare, CheckCircle2, XCircle } from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { DomainStickyScroll } from "@/components/ui/DomainStickyScroll";
import { FaReact, FaAws, FaDocker, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiGithubactions } from "react-icons/si";
import { MdOutlineSensors } from "react-icons/md";

const domainData = [
  {
    title: "React & IIoT Hardware",
    description: "Build robust frontend architectures using React and integrate them directly with Industrial IoT (IIoT) sensors via WebSockets. You won't just build UI; you will build interfaces that control physical hardware in real-time.",
    image: "/images/domains/react_iiot.jpg",
    tools: [
      { id: "react", name: "React", icon: FaReact, color: "#61DAFB", position: { left: "30%", top: "30%" } },
      { id: "iiot", name: "IIoT Sensors", icon: MdOutlineSensors, color: "#10B981", position: { left: "70%", top: "70%" } }
    ],
    connections: [
      { from: "react", to: "iiot", gradient: "#61DAFB-#10B981" }
    ]
  },
  {
    title: "Next.js Full-Stack",
    description: "Master server-side rendering, secure API routes, and robust authentication boundaries. Connect your robust frontend to a heavily optimized PostgreSQL database using Prisma ORM.",
    image: "/images/domains/nextjs_postgres.jpg",
    tools: [
      { id: "next", name: "Next.js", icon: SiNextdotjs, color: "#ffffff", position: { left: "50%", top: "30%" } },
      { id: "postgres", name: "PostgreSQL", icon: SiPostgresql, color: "#336791", position: { left: "50%", top: "70%" } }
    ],
    connections: [
      { from: "next", to: "postgres", gradient: "#ffffff-#336791" }
    ]
  },
  {
    title: "Cloud & DevOps",
    description: "Your code doesn't matter if it can't run in production. Containerize your applications using Docker, build robust CI/CD pipelines, and deploy globally across AWS Infrastructure.",
    image: "/images/domains/cloud_devops.jpg",
    tools: [
      { id: "docker", name: "Docker", icon: FaDocker, color: "#2496ED", position: { left: "20%", top: "50%" } },
      { id: "aws", name: "AWS Infra", icon: FaAws, color: "#FF9900", position: { left: "80%", top: "30%" } },
      { id: "cicd", name: "CI/CD Pipeline", icon: SiGithubactions, color: "#2088FF", position: { left: "80%", top: "70%" } }
    ],
    connections: [
      { from: "docker", to: "aws", gradient: "#2496ED-#FF9900" },
      { from: "docker", to: "cicd", gradient: "#2496ED-#2088FF" },
      { from: "cicd", to: "aws", gradient: "#2088FF-#FF9900" }
    ]
  },
  {
    title: "UI/UX Product Design",
    description: "Design isn't just making things look pretty. Build comprehensive design systems in Figma, sync them with Tailwind CSS tokens, and ensure engineering handoffs are absolutely seamless.",
    image: "/images/domains/ui_ux.jpg",
    tools: [
      { id: "figma", name: "Figma", icon: FaFigma, color: "#F24E1E", position: { left: "30%", top: "50%" } },
      { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC", position: { left: "70%", top: "50%" } }
    ],
    connections: [
      { from: "figma", to: "tailwind", gradient: "#F24E1E-#38B2AC" }
    ]
  }
];


const comparisons = [
  { theory: "Tutorial Hell & Basic CRUD", production: "Enterprise Architecture & Scalability" },
  { theory: "Localhost Environments", production: "AWS & Vercel Global Deployments" },
  { theory: "Zero Accountability", production: "Strict Peer Code Reviews & Standards" },
  { theory: "Solo Toy Projects", production: "Collaborative Agile Team Workflows" },
];

const workflow = [
  { title: "Onboarding", desc: "Gain access to our internal tools, Slack, and codebase repositories." },
  { title: "Architecture", desc: "Understand the system design before writing a single line of code." },
  { title: "Development", desc: "Write production code under the guidance of senior engineers." },
  { title: "Deployment", desc: "Push your code through our CI/CD pipelines to live servers." },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }
  })
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function InternshipsPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Hero grid parallax: motion values only, so mouse moves never re-render the page.
  const gridX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const gridY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const onHeroPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    gridX.set(e.clientX * 0.02);
    gridY.set(e.clientY * 0.02);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-clip">

      {/* ══════ HERO SECTION ══════ */}
      <section onPointerMove={onHeroPointerMove} className="relative min-h-[90svh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Cinematic Grid & Glows - Parallax effect */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-10 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            x: gridX,
            y: gridY
          }}
        />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[500px] bg-blue-500/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em]">
              <ShieldCheck aria-hidden="true" className="w-4 h-4" />
              Softmusk Academy
            </span>
          </motion.div>

          <h1 className="text-[2.75rem] sm:text-7xl md:text-8xl font-heading font-black leading-[0.95] tracking-tight mb-8">
            <SplitText text="Stop Playing." delayOffset={0} /><br/>
            <SplitText text="Start " delayOffset={0.5} />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
              className="text-blue-500 inline-block"
            >
              Shipping.
            </motion.span>
          </h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Bridge the gap between academic theory and hardcore production engineering. Join our remote internship cohort and write code that powers real enterprise software.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticWrapper>
              <DotExpandButton href="/internship-registration" variant="primary" size="lg" className="shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                Apply For Cohort
              </DotExpandButton>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* ══════ PARADIGM SHIFT SECTION (Psychology) ══════ */}
      <section className="relative py-32 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-slate-900">The Agency Standard</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">The industry doesn&apos;t care about the toy project you built in a weekend. We train you for the reality of high-stakes software engineering.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Theory Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="p-8 rounded-[10px] bg-red-50 border border-red-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <div aria-hidden="true" className="w-10 h-10 rounded-[10px] bg-red-100 flex items-center justify-center text-red-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">University Theory</h3>
              </div>
              <ul className="space-y-6 relative">
                {comparisons.map((c, i) => (
                  <motion.li
                    key={c.theory}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-start gap-4 relative group"
                  >
                    <span aria-hidden="true" className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                    <span className="text-slate-500 font-medium relative overflow-hidden">
                      {c.theory}
                      <motion.span
                        aria-hidden="true"
                        initial={{ left: 0, right: "100%" }}
                        whileInView={{ right: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.2), duration: 0.4, ease: "easeOut" }}
                        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-red-500 z-10"
                      />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Production Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }}
              className="p-8 rounded-[10px] bg-blue-50 border border-blue-100 relative overflow-hidden"
            >
              <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div aria-hidden="true" className="w-10 h-10 rounded-[10px] bg-blue-500 flex items-center justify-center text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Softmusk Production</h3>
                </div>
                <ul className="space-y-6">
                  {comparisons.map((c, i) => (
                    <motion.li
                      key={c.production}
                      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + (i * 0.2), type: "spring" }}
                      className="flex items-start gap-4"
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + (i * 0.2), type: "spring", stiffness: 300 }}
                        className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-[0_2px_10px_rgba(59,130,246,0.4)]"
                      >
                        ✓
                      </motion.span>
                      <span className="text-slate-900 font-bold">{c.production}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ DOMAIN SECTIONS (Sticky Product Scroll) ══════ */}
      <DomainStickyScroll content={domainData} />

      {/* ══════ WORKFLOW TIMELINE ══════ */}
      <section className="relative py-32 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-slate-900">The Pipeline</h2>
            <p className="text-slate-500 text-lg">How you will operate during your time at Softmusk.</p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* Vertical Line */}
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-200 hidden md:block" />

            {/* Spark Trail */}
            <motion.div
              aria-hidden="true"
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-blue-500 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              {/* Glowing Dot at the end of the line */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_10px_rgba(59,130,246,0.8)]"
              />
            </motion.div>

            <ol className="flex flex-col gap-12 md:gap-24">
              {workflow.map((step, idx) => (
                <li key={step.title} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`w-full md:w-1/2 text-center ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <h3 className="text-2xl font-black mb-4 text-slate-900">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shrink-0 shadow-[0_4px_15px_rgba(59,130,246,0.2)]"
                  >
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      whileInView={{ scale: 2.5, opacity: 0 }}
                      viewport={{ once: true, amount: 1 }}
                      transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-sm font-black text-blue-600">{idx + 1}</span>
                  </motion.div>

                  <div className="w-full md:w-1/2 hidden md:block" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══════ CTA SECTION ══════ */}
      <section className="relative py-32 px-6 overflow-hidden bg-slate-950 text-white">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          className="absolute inset-0 bg-blue-600/20"
        />
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative z-10 max-w-4xl mx-auto text-center bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-12 sm:p-12 md:p-20 rounded-[10px] shadow-[0_0_50px_rgba(59,130,246,0.1)]"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mx-auto mb-8"
          >
            <TerminalSquare aria-hidden="true" className="w-12 h-12 text-blue-500" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">Ready to Commit?</h2>
          <p className="text-lg sm:text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto">
            Spots for our upcoming cohort are extremely limited. Secure your position and begin your transition from student to software engineer.
          </p>

          <MagneticWrapper className="inline-block">
            <DotExpandButton href="/internship-registration" variant="primary" size="lg" className="w-full sm:w-auto shadow-[0_0_40px_rgba(59,130,246,0.4)]">
              Begin Registration
            </DotExpandButton>
          </MagneticWrapper>
        </motion.div>
      </section>

    </div>
  );
}
