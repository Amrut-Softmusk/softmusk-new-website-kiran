"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

/** Counts from 0 to `end` the first time it scrolls into view. Screen readers get the final value. */
export function CountUpNumber({ end, suffix = "", duration = 2.2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("en-IN"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, end, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, end, duration, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">
        {end}
        {suffix}
      </span>
      <span aria-hidden="true">
        <motion.span>{text}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
