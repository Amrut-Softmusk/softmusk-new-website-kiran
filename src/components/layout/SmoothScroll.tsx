"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/** New page → start at the top instantly (Lenis keeps its own scroll position otherwise). */
function ResetScrollOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Lower lerp = heavier, longer glide after each wheel tick.
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        // Phones keep native momentum scrolling — it is smoother there than any JS.
        syncTouch: false,
        autoRaf: true,
        // Smooth-scroll in-page anchor links (offset comes from scroll-margin-top in globals.css).
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <ResetScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}
