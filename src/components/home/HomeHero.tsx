"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform, type PanInfo } from "framer-motion";
import { ArrowRight, CheckCircle, Cpu, Star, Users } from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";
import { EASE_CURTAIN, useIntroDone } from "@/components/motion/IntroProvider";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Small beat after hydration before the hero starts moving. */
const BASE = 0.1;

type Side = "left" | "right";

const PANELS = [
  {
    side: "left" as Side,
    eyebrow: "Corporate Solutions",
    tab: "Corporate",
    verb: "Build",
    desktopImg: "/Build-the-Future-v2.png",
    copy: "We build enterprise-grade software, cloud infrastructure, and IIoT automation systems for scaling businesses.",
    href: "/services",
    cta: "Explore Services",
    chips: [
      { label: "Custom ERP", icon: Cpu, desktop: "top-[20%] left-[10%]", mobile: "top-3 left-3" },
      { label: "Cloud Scalable", icon: CheckCircle, desktop: "bottom-[20%] right-[10%]", mobile: "bottom-3 right-3" },
    ],
  },
  {
    side: "right" as Side,
    eyebrow: "Tech Internships",
    tab: "Internships",
    verb: "Learn",
    desktopImg: "/Learn-the-Future-v2.png",
    copy: "Launch your tech career with hands-on training in React, IIoT, and cloud technologies mentored by industry veterans.",
    href: "/internships",
    cta: "Apply Now",
    chips: [
      { label: "Verified Certificates", icon: Star, desktop: "top-[20%] right-[10%]", mobile: "top-3 right-3" },
      { label: "Live Mentorship", icon: Users, desktop: "bottom-[20%] left-[10%]", mobile: "bottom-3 left-3" },
    ],
  },
];

export function HomeHero() {
  return (
    <>
      <h1 className="sr-only">Softmusk Info Pvt. Ltd. — IT &amp; software company in Belagavi for custom software, ERP, Cloud &amp; IIoT solutions and tech internships</h1>
      <DesktopHero />
      <MobileHero />
    </>
  );
}

/** One line of a heading that slides up out of a mask. */
function MaskLine({ children, show, delay, className = "" }: { children: ReactNode; show: boolean; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.1em] -mb-[0.1em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={show ? { y: "0%" } : undefined}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function rise(show: boolean, delay: number, y = 18) {
  return {
    initial: { opacity: 0, y },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  };
}

// ─── Desktop: split panels that open on hover and recede on scroll ───────────

function DesktopHero() {
  const show = useIntroDone();
  const [hovered, setHovered] = useState<Side | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [0, 24]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const flex = (side: Side) => (hovered === side ? "flex-[2.5]" : hovered ? "flex-[0.75]" : "flex-1");

  return (
    <section ref={ref} className="hidden lg:block relative h-[100svh] bg-slate-950">
      <motion.div style={{ scale, borderRadius: radius }} className="relative h-full flex overflow-hidden bg-white origin-top will-change-transform">
        {PANELS.map((p, i) => (
          <motion.div
            key={p.side}
            initial={{ clipPath: i === 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
            animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.4, ease: EASE_CURTAIN, delay: BASE + i * 0.12 }}
            className={`relative flex flex-col justify-center items-center overflow-hidden transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] group ${i === 0 ? "border-r border-slate-900/10" : ""} ${flex(p.side)}`}
            onMouseEnter={() => setHovered(p.side)}
            onMouseLeave={() => setHovered(null)}
            onFocusCapture={() => setHovered(p.side)}
            onBlurCapture={() => setHovered(null)}
          >
            <motion.div style={{ y: imgY }} className="absolute inset-x-0 -top-[16%] bottom-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.3 }}
                animate={show ? { scale: 1 } : undefined}
                transition={{ duration: 2.2, ease: EASE_OUT, delay: BASE + i * 0.12 }}
              >
                <Image
                  src={p.desktopImg}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </motion.div>
            </motion.div>

            {p.chips.map((c, j) => (
              <div
                key={c.label}
                aria-hidden="true"
                className={`absolute ${c.desktop} backdrop-blur-md bg-white/80 border border-slate-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[10px] p-3 flex items-center gap-2 transition-all duration-700 ${j ? "delay-200" : "delay-100"} ${hovered === p.side ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <c.icon className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-900">{c.label}</span>
              </div>
            ))}

            <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 p-10 flex flex-col items-start text-left w-full max-w-2xl">
              <motion.span
                {...rise(show, BASE + 0.55 + i * 0.12, 12)}
                className="font-black text-xs uppercase tracking-[0.25em] text-cyan-700 mb-4 [text-shadow:_0_0_10px_rgba(255,255,255,1)]"
              >
                {p.eyebrow}
              </motion.span>
              <h2 className="text-7xl font-heading font-black text-slate-900 mb-6 leading-[1.05] whitespace-nowrap [text-shadow:_0_0_20px_rgba(255,255,255,1)]">
                <MaskLine show={show} delay={BASE + 0.6 + i * 0.12}>
                  {p.verb} the
                </MaskLine>
                <MaskLine show={show} delay={BASE + 0.7 + i * 0.12}>
                  Future
                </MaskLine>
              </h2>
              <p
                className={`text-slate-800 font-bold max-w-md text-base leading-relaxed mb-8 transition-[opacity,transform] duration-500 ${hovered === p.side ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              >
                {p.copy}
              </p>
              <motion.div {...rise(show, BASE + 0.9 + i * 0.12)}>
                <DotExpandButton href={p.href} variant="primary" className="shadow-2xl">
                  {p.cta}
                </DotExpandButton>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        {/* centre mark */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center transition-all duration-[800ms] ${hovered === null ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          <motion.div
            initial={{ scale: 0, rotate: -120 }}
            animate={show ? { scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: BASE + 0.9 }}
          >
            <Image src="/logo.png" alt="" width={64} height={64} className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: fade }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-3"
        >
          <motion.span
            {...rise(show, BASE + 1.3, 8)}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 [text-shadow:_0_0_10px_rgba(255,255,255,1)]"
          >
            Scroll
          </motion.span>
          <span className="relative block h-10 w-px overflow-hidden bg-slate-900/15">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0ABFFF] to-[#1D7CE0]" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Mobile: one stage that alternates between the two sides ────────────────

const SLIDE_SECONDS = 5.5;

function MobileHero() {
  const show = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const p = PANELS[active];
  const go = (n: number) => setActive((n + PANELS.length) % PANELS.length);
  const running = show && inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const onSwipe = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 && Math.abs(info.velocity.x) < 300) return;
    go(active + (info.offset.x < 0 ? 1 : -1));
  };

  return (
    <section
      ref={ref}
      className="lg:hidden relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-white via-white to-[#EAF4FF] px-5 sm:px-8 pt-24 sm:pt-28 pb-8 flex flex-col"
    >
      {/* blueprint grid + glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      <div aria-hidden="true" className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-[#0ABFFF]/20 blur-3xl pointer-events-none" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative">
        <motion.div {...rise(show, BASE + 0.1, 10)} className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-gradient-to-r from-[#0ABFFF] to-[#1D7CE0]" />
          <span className="relative block overflow-hidden h-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={p.eyebrow}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="block text-[10px] leading-4 font-black uppercase tracking-[0.25em] text-cyan-700"
              >
                {String(active + 1).padStart(2, "0")} — {p.eyebrow}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <h2 className="font-heading font-black text-slate-900 tracking-tight leading-[0.98] text-[clamp(2.75rem,13vw,4.5rem)]">
          <MaskLine show={show} delay={BASE + 0.15}>
            <span className="inline-flex overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={p.verb}
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%", transition: { duration: 0.55, ease: EASE_OUT } }}
                  exit={{ y: "-105%", transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } }}
                >
                  {p.verb}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            the
          </MaskLine>
          <MaskLine show={show} delay={BASE + 0.25}>
            <span className="bg-gradient-to-r from-[#0ABFFF] to-[#1D7CE0] bg-clip-text text-transparent">Future.</span>
          </MaskLine>
        </h2>

        <motion.div {...rise(show, BASE + 0.4)} className="mt-5 min-h-[4.75rem] max-w-md">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={p.side}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="text-[15px] leading-relaxed text-slate-600 font-medium"
            >
              {p.copy}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div {...rise(show, BASE + 0.5)} className="mt-6 flex items-center gap-5 whitespace-nowrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <DotExpandButton href={p.href} variant="primary" className="shadow-[0_14px_30px_-10px_rgba(29,124,224,0.6)]">
                {p.cta}
              </DotExpandButton>
            </motion.div>
          </AnimatePresence>
          <Link href="/contact" className="group inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
            Talk to us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>

      {/* image stage */}
      <motion.div
        style={{ y: stageY, scale: stageScale }}
        className="relative mt-8 origin-top"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.3, ease: EASE_CURTAIN, delay: BASE + 0.35 }}
          onPanEnd={onSwipe}
          style={{ touchAction: "pan-y" }}
          className="relative w-full max-w-xl mx-auto aspect-[4/3] rounded-[10px] overflow-hidden bg-[#EAF4FF] ring-1 ring-slate-900/5 shadow-[0_30px_60px_-24px_rgba(29,124,224,0.45)] select-none"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={p.side}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <Image
                src={p.desktopImg}
                alt=""
                fill
                priority={active === 0}
                draggable={false}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover ken-burns"
              />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />

          <AnimatePresence>
            {p.chips.map((c, j) => (
              <motion.div
                key={`${p.side}-${c.label}`}
                aria-hidden="true"
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={show ? { opacity: 1, y: 0, scale: 1 } : undefined}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: BASE + 0.9 + j * 0.15 }}
                className={`absolute ${c.mobile} backdrop-blur-md bg-white/85 border border-white/60 shadow-[0_8px_24px_rgba(15,23,42,0.12)] rounded-[10px] px-3 py-2 flex items-center gap-2`}
              >
                <c.icon className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-[10px] font-black tracking-[0.14em] uppercase text-slate-900">{c.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* tabs with auto-advance progress */}
        <motion.div {...rise(show, BASE + 0.7, 10)} className="mt-5 max-w-xl mx-auto grid grid-cols-2 gap-5">
          {PANELS.map((t, i) => (
            <button
              key={t.side}
              type="button"
              onClick={() => go(i)}
              aria-pressed={i === active}
              className="text-left pt-3 group"
            >
              <span className="relative block h-[2px] w-full bg-slate-900/10 overflow-hidden rounded-full">
                {i === active && running && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-[#0ABFFF] to-[#1D7CE0]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_SECONDS, ease: "linear" }}
                    onAnimationComplete={() => go(active + 1)}
                  />
                )}
                {i === active && !running && <span className="absolute inset-0 bg-[#1D7CE0]/40" />}
              </span>
              <span
                className={`mt-3 flex items-baseline gap-2 transition-colors duration-300 ${i === active ? "text-slate-900" : "text-slate-400"}`}
              >
                <span className="font-heading font-black text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">{t.tab}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
