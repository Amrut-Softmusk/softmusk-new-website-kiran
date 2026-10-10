"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Send, ArrowRight, ExternalLink } from "lucide-react";
import { FormStatus, HoneypotField } from "@/components/ui/FormStatus";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { useEnquiry } from "@/lib/useEnquiry";
import { productsData } from "./data";

// ─── Main Detail Component ──────────────────────────────────────────

const fieldClass =
  "w-full bg-slate-950 border border-white/10 rounded-[10px] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all";

export default function ProductDetailView({ slug }: { slug: string }) {
  const product = productsData[slug];
  const { status, message, fallbackHref, send, sending } = useEnquiry(CONTACT_EMAIL);

  const Icon = product.icon;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "");
    send(e.currentTarget, { kind: "demo", subject: `Demo request — ${product.name} — ${get("company")}`, replyTo: get("email"), fields: [
      ["Product", product.name],
      ["Name", get("name")],
      ["Company / Store", get("company")],
      ["Email", get("email")],
      ["Phone", get("phone")],
      ["Requirements", get("requirements")],
    ] });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 md:pt-32 pb-0">

      {/* ═══════ BREADCRUMB ═══════ */}
      <nav aria-label="Breadcrumb" className="max-w-[1280px] mx-auto px-6 mb-8">
        <ol className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <li><Link href="/products" className="hover:text-cyan-400 transition-colors">Products</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></li>
          <li aria-current="page" style={{ color: product.color }}>{product.name}</li>
        </ol>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="max-w-[1280px] mx-auto px-6 mb-24 relative">
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-12 left-1/3 w-[500px] max-w-full h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ backgroundColor: product.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Icon aria-hidden="true" className="w-4 h-4" style={{ color: product.color }} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                {product.tag}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-[1.05] tracking-tight mb-5">
              {product.name}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-slate-200 mb-5 leading-snug">
              {product.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-8">
              {product.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 bg-white/[0.03] px-3.5 py-2.5 rounded-[10px] border border-white/10">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: product.color }} />
                  <span className="text-xs font-semibold text-slate-200">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {product.externalUrl && (
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: product.color,
                    color: "#0f172a"
                  }}
                >
                  <span>Visit Live Platform</span>
                  <span className="sr-only">(opens in a new tab)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href="#demo-request"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-300"
              >
                <span>Request Enterprise Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Product Image Window Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="rounded-[10px] overflow-hidden border border-white/15 bg-slate-900/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
              {/* Window controls header */}
              <div className="px-4 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div aria-hidden="true" className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div aria-hidden="true" className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div aria-hidden="true" className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    {product.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Interface Preview
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} interface preview`}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════ CORE CAPABILITIES / SPECIFICATIONS ═══════ */}
      <section className="bg-slate-900/60 py-24 border-y border-white/10 relative">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
              Architectural Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4">
              Comprehensive <span style={{ color: product.color }}>Capabilities</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
              Engineered with extreme fault tolerance, real-time data integrity, and compliance with national standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-950/80 p-8 rounded-[10px] border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-5 border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: product.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INQUIRY / DEMO REQUEST FORM ═══════ */}
      <section className="py-24 bg-slate-950 relative overflow-hidden" id="demo-request" aria-labelledby="demo-request-title">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">
              Get Started
            </span>
            <h2 id="demo-request-title" className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-[1.05] tracking-tight mb-6">
              Deploy <span style={{ color: product.color }}>{product.name}</span> in Your Business
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Whether you need on-premise offline deployment, multi-branch network sync, or custom hardware integrations, our engineers are ready to assist.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Full Onboarding &amp; Hardware Setup</p>
                  <p className="text-xs text-slate-400">Barcode scanners, thermal printers, weighing scales, and cloud sync.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Direct Engineering Support</p>
                  <p className="text-xs text-slate-400">Continuous updates, data migration, and immediate priority assistance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 p-6 sm:p-10 rounded-[10px] border border-white/10 shadow-2xl relative">

              <form onSubmit={handleSubmit} className="relative space-y-5">
                <HoneypotField />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label htmlFor="demo-name" className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Name</label>
                      <input
                        id="demo-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        className={fieldClass}
                      />
                    </div>
                  <div className="space-y-1.5">
                      <label htmlFor="demo-company" className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Company / Store Name</label>
                      <input
                        id="demo-company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="e.g. Apex Jewellers / City Pharmacy"
                        className={fieldClass}
                      />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label htmlFor="demo-email" className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                      <input
                        id="demo-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={fieldClass}
                      />
                    </div>
                  <div className="space-y-1.5">
                      <label htmlFor="demo-phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contact Number</label>
                      <input
                        id="demo-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        className={fieldClass}
                      />
                    </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="demo-requirements" className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Requirements</label>
                  <textarea
                    id="demo-requirements"
                    name="requirements"
                    required
                    rows={4}
                    placeholder={`Tell us about your setup and requirements for ${product.name}...`}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:brightness-110 active:scale-[0.99] text-slate-950 disabled:opacity-60 disabled:pointer-events-none"
                  style={{ backgroundColor: product.color }}
                >
                  <span>{sending ? "Sending…" : "Request a Demo"}</span>
                  <Send aria-hidden="true" className="w-3.5 h-3.5" />
                </button>
                <FormStatus status={status} message={message} fallbackHref={fallbackHref} email={CONTACT_EMAIL} tone="dark" />
              </form>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
