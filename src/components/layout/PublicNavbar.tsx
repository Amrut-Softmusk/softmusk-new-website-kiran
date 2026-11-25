"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { DotExpandButton } from "@/components/ui/DotExpandButton";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Products", href: "/products" },
  { name: "Internships", href: "/internships" },
  { name: "Workshops", href: "/workshops" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
    setIsHidden(false);
  }

  // Solid background once scrolled; hide on scroll-down, reveal on scroll-up.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(current > 20);
    if (Math.abs(current - previous) < 4) return;
    setIsHidden(current > previous && current > 120);
  });

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // While the menu is open: freeze page scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!isOpen) return;
    const toggle = toggleRef.current;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      toggle?.focus({ preventScroll: true });
    };
  }, [isOpen, lenis]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
            : "bg-white border-b border-slate-200/60 py-4"
        }`}
      >
        <nav aria-label="Main" className="w-full px-5 md:px-10 lg:px-12">
          <div className="flex justify-between items-center h-[50px] relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 rounded-[10px]" aria-label="Softmusk home">
              <Image src="/softmusk-logo.png" alt="Softmusk Info Pvt. Ltd." width={720} height={226} priority className="h-11 md:h-12 w-auto object-contain" />
            </Link>

            {/* Centre links (desktop) */}
            <ul className="hidden xl:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2">
              {LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="relative group block py-2"
                    >
                      <span
                        className={`relative z-10 text-[13px] font-black uppercase tracking-widest transition-colors ${
                          active ? "text-blue-600" : "text-slate-600 group-hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 bottom-0 h-[2px] bg-blue-600 origin-left transition-transform duration-300 ease-out w-full ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3 ml-auto">
              {/* wrapper owns the breakpoint: the button's own inline-flex would beat "hidden" */}
              <div className="hidden md:block">
                <DotExpandButton
                  href="/internships"
                  variant="primary"
                  size="sm"
                  className="!py-2.5 !px-6 shadow-[0_4px_15px_rgba(10,191,255,0.25)]"
                >
                  Apply Now
                </DotExpandButton>
              </div>

              {/* Menu toggle (below xl) */}
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="xl:hidden p-3 rounded-full bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm xl:hidden"
            onClick={closeMenu}
          >
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              data-lenis-prevent
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 bottom-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                  <Image src="/softmusk-logo.png" alt="Softmusk Info Pvt. Ltd." width={720} height={226} className="h-10 w-auto object-contain" />
                </Link>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex flex-col p-6 space-y-1">
                {LINKS.map((link, idx) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`block py-3 text-2xl font-heading font-black transition-colors ${
                          active ? "text-blue-600" : "text-slate-900 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-auto p-6 bg-slate-50"
              >
                <DotExpandButton href="/internships" variant="primary" className="w-full justify-center !py-4" onClick={closeMenu}>
                  Apply Now
                </DotExpandButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
