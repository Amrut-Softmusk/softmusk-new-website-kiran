"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Pulls its child slightly toward a mouse pointer. Motion values only, so no re-renders. */
export const MagneticWrapper = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.2);
    y.set((e.clientY - (top + height / 2)) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className={className} ref={ref} onPointerMove={handleMove} onPointerLeave={reset} style={{ x, y }}>
      {children}
    </motion.div>
  );
};
