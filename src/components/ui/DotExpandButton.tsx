import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DotExpandButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'default' | 'sm' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

const VARIANTS = {
  secondary: {
    baseBg: "bg-gray-100",
    fluidBg: "bg-slate-900",
    textNormal: "text-slate-900",
    textHover: "group-hover:text-white group-focus-visible:text-white",
    iconBgHover: "group-hover:bg-white group-focus-visible:bg-white",
    arrowColor: "text-slate-900",
    borderClass: "",
  },
  primary: {
    baseBg: "bg-slate-900",
    fluidBg: "bg-gradient-to-br from-[#0ABFFF] to-[#1D7CE0]",
    textNormal: "text-white",
    textHover: "",
    iconBgHover: "group-hover:bg-white group-focus-visible:bg-white",
    arrowColor: "text-[#1D7CE0]",
    borderClass: "",
  },
  outline: {
    baseBg: "bg-transparent",
    fluidBg: "bg-white",
    textNormal: "text-white",
    textHover: "group-hover:text-slate-900 group-focus-visible:text-slate-900",
    iconBgHover: "group-hover:bg-[#0ABFFF] group-focus-visible:bg-[#0ABFFF]",
    arrowColor: "text-white",
    borderClass: "border-2 border-white/15",
  },
  glass: {
    baseBg: "bg-white/5 backdrop-blur-md",
    fluidBg: "bg-white",
    textNormal: "text-white",
    textHover: "group-hover:text-slate-900 group-focus-visible:text-slate-900",
    iconBgHover: "group-hover:bg-[#0ABFFF] group-focus-visible:bg-[#0ABFFF]",
    arrowColor: "text-white",
    borderClass: "border border-white/20",
  },
} as const;

const SIZES = {
  sm: { box: "pr-5 pl-3 py-2 text-xs", icon: "w-6 h-6 -ml-1", arrow: "w-3 h-3" },
  default: { box: "pr-8 pl-4 py-3.5 text-sm", icon: "w-8 h-8 -ml-2", arrow: "w-4 h-4" },
  lg: { box: "pr-10 pl-5 py-4 text-sm md:text-base", icon: "w-9 h-9 -ml-2", arrow: "w-4 h-4" },
} as const;

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export function DotExpandButton({
  children,
  href,
  className = "",
  onClick,
  variant = 'secondary',
  size = 'default',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: DotExpandButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  const content = (
    <>
      {/* Fluid background that grows out of a dot */}
      <span
        aria-hidden="true"
        className={`absolute left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-transform duration-[600ms] ${EASE} group-hover:scale-[80] group-focus-visible:scale-[80] ${v.fluidBg}`}
      />

      {/* Arrow slides in on hover/focus */}
      <span
        aria-hidden="true"
        className={`relative z-10 flex items-center justify-center ${s.icon} rounded-full transition-all duration-[400ms] ${EASE} bg-transparent ${v.iconBgHover} group-hover:ml-0 group-focus-visible:ml-0 shrink-0`}
      >
        <ArrowRight
          className={`${s.arrow} opacity-0 -translate-x-3 transition-all duration-[400ms] ${EASE} group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 ${v.arrowColor}`}
        />
      </span>

      <span className={`font-black uppercase tracking-widest relative z-10 transition-colors duration-[400ms] ${v.textNormal} ${v.textHover}`}>
        {children}
      </span>
    </>
  );

  const baseClassName = `group relative inline-flex items-center gap-2 rounded-[10px] overflow-hidden transition-[transform,box-shadow] duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none ${s.box} ${v.baseBg} ${v.borderClass} ${className}`;

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      const isWeb = href.startsWith("http");
      return (
        <a
          href={href}
          className={baseClassName}
          aria-label={ariaLabel}
          onClick={onClick}
          {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClassName} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={baseClassName}>
      {content}
    </button>
  );
}
