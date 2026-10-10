"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand line across the top that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2px] origin-left z-[70] bg-gradient-to-r from-[#0ABFFF] to-[#1D7CE0] pointer-events-none"
    />
  );
}
