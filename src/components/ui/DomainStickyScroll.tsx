"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconType } from "react-icons";
import Image from "next/image";

export interface ToolNode {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  position: { left: string; top: string };
}

export interface DomainContent {
  title: string;
  description: string;
  image: string;
  tools: ToolNode[];
  connections: { from: string; to: string; gradient: string }[];
}

export function DomainStickyScroll({ content }: { content: DomainContent[] }) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  // Progress of the viewport centre line through the text column.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Each block is one screen tall and the column has half a screen of bottom padding.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(content.length - 1, Math.max(0, Math.floor(latest * (content.length + 0.5))));
    setActiveCard((prev) => (prev === next ? prev : next));
  });

  return (
    <section aria-label="Internship domains" className="w-full bg-slate-950 text-white">
      <div className="relative flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto px-6 py-20 lg:py-0">
        {/* Text blocks: stacked on mobile, scroll past the sticky image on desktop. */}
        <div ref={ref} className="w-full lg:w-1/2 relative lg:pb-[50vh]">
          {content.map((item, index) => (
            <div
              key={item.title}
              data-active={activeCard === index}
              className="flex flex-col justify-center lg:h-screen lg:pr-16 mb-20 last:mb-0 lg:mb-0 lg:opacity-30 lg:data-[active=true]:opacity-100 transition-opacity duration-500"
            >
              <div className="block lg:hidden w-full aspect-[4/3] rounded-[10px] overflow-hidden relative mb-10 shadow-2xl border border-slate-800">
                <Image src={item.image} alt="" fill sizes="100vw" className="object-cover" />
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6 w-max">
                Domain 0{index + 1}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 text-white leading-tight">
                {item.title}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">{item.description}</p>
              <Link
                href="/internship-registration"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-bold rounded-[10px] overflow-hidden transition-[scale,box-shadow] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] w-max"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enroll in this Domain
                  <span className="sr-only">: {item.title}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          ))}
        </div>

        {/* Sticky visual (desktop only): crossfades with the active block. */}
        <div aria-hidden="true" className="hidden lg:flex w-full lg:w-1/2 h-screen sticky top-0 items-center justify-center">
          <div className="relative w-full max-w-[600px] aspect-square rounded-[10px] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image src={content[activeCard].image} alt="" fill sizes="600px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
