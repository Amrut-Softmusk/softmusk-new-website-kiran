"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Coins,
  Activity,
  Boxes,
  UtensilsCrossed,
  IdCard,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { FaqSection } from "@/components/seo/FaqSection";
import { PRODUCTS_FAQS } from "@/lib/faqs";

// ─── Products Catalog Data ──────────────────────────────────────────

const catalogProducts = [
  {
    id: "goldmusk",
    name: "GoldMusk ERP",
    category: "Jewellery ERP & Offline POS",
    badge: "v1.0 Live",
    tagline: "Offline-first POS & ERP built exclusively for Indian jewellers.",
    desc: "Never let internet outages stop your counter sales. GoldMusk combines uninterrupted offline billing with live gold valuations, digital Karigar loss tracking, and thermal barcode tag printing.",
    highlights: [
      "Offline-First POS Billing",
      "Karigar Melting Ledgers",
      "Live 24K, 22K & 18K Rates",
      "Thermal Tag & Barcode Printing",
    ],
    icon: Coins,
    image: "/goldmusk-dashboard.png",
    color: "#F59E0B",
    externalUrl: "https://gold.softmusk.com/",
    detailUrl: "/products/goldmusk",
    stats: "100% Offline Ready",
  },
  {
    id: "medimusk-retail",
    name: "MediMusk Retail",
    category: "Pharma Retail & Chemist POS",
    badge: "Trusted by 90%+ Chemists",
    tagline: "High-speed billing and regulatory compliance for retail pharmacies.",
    desc: "Engineered specifically for chemist shops and hospital pharmacies. Deliver rapid barcode checkouts, prevent losses with FIFO batch expiry alerts, and stay audit-ready with automated Schedule H drug registers.",
    highlights: [
      "High-Speed Barcode Billing",
      "FIFO Batch Expiry Tracking",
      "Schedule H & Narcotic Logs",
      "Patient Prescription History",
    ],
    icon: Activity,
    image: "/medimusk-dashboard.jpg",
    color: "#06B6D4",
    detailUrl: "/products/medimusk-retail",
    stats: "Automated FIFO Expiry",
  },
  {
    id: "softbill-wholesale",
    name: "SoftBill Wholesale",
    category: "Pharma Wholesale & Supply Chain",
    badge: "Supply Chain Ready",
    tagline: "Enterprise distribution, order fulfillment, and distributor ledgers.",
    desc: "Complete operational control for pharmaceutical distributors and stockists. Manage bulk purchase orders, real-time warehouse inventory, credit limits, and one-click GST reconciliation.",
    highlights: [
      "Bulk Orders & Dispatching",
      "Warehouse Stock Management",
      "Distributor Credit Ledgers",
      "Multi-Branch Accounting",
    ],
    icon: Boxes,
    image: "/pharma-wholesale-dashboard.jpg",
    color: "#3B82F6",
    detailUrl: "/products/softbill-wholesale",
    stats: "Enterprise Scalability",
  },
  {
    id: "softbill-restaurant",
    name: "SoftBill Restaurant",
    category: "Restaurant, Bar & Dining POS",
    badge: "Hospitality POS",
    tagline: "Accelerate table turnarounds with instant KOT and live billing.",
    desc: "From busy fine dining to fast-paced bars and cafes. Effortlessly manage interactive table layouts, route kitchen order tickets (KOT) in real time, monitor recipe inventory, and reconcile daily cash shifts.",
    highlights: [
      "Instant KOT & BOT Routing",
      "Interactive Table Map",
      "Recipe & Stock Control",
      "Shift Cash Reconciliation",
    ],
    icon: UtensilsCrossed,
    image: "/restaurant-pos-dashboard.jpg",
    color: "#F97316",
    detailUrl: "/products/softbill-restaurant",
    stats: "Real-time KOT Queue",
  },
  {
    id: "student-id-erp",
    name: "Softmusk ID ERP",
    category: "Student & Corporate ID Card ERP",
    badge: "Smart Issuance",
    tagline: "All-in-one ID card design, webcam capture, and batch printing system.",
    desc: "Designed for universities, colleges, schools, and corporate institutions. Features a drag-and-drop badge template designer, live camera photo capture, QR/barcode encoding, and anti-counterfeit security.",
    highlights: [
      "Visual Template Designer",
      "Direct Webcam Photo Capture",
      "Secure QR & Barcode Encoding",
      "High-Volume Batch Printing",
    ],
    icon: IdCard,
    image: "/student-id-dashboard.jpg",
    color: "#8B5CF6",
    detailUrl: "/products/student-id-erp",
    stats: "Anti-Counterfeit Ready",
  },
];

// ─── Main Page Component ───────────────────────────────────────────

export default function ProductsPage() {
  return (
    <div className="w-full bg-slate-950 text-white relative">

      {/* ═══════ HERO SECTION (First Sticky Layer) ═══════ */}
      <section className="stack:sticky stack:top-0 stack:h-screen min-h-[85svh] sm:min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-slate-950 z-0">
        {/* Ambient Glows */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-wider text-blue-400 mb-6">
              <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-blue-400" />
              <span>SOFTMUSK ENTERPRISE PLATFORMS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Products.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              Purpose-built software systems engineered for retail, healthcare, hospitality, jewellery, and institutions.
            </p>

            {/* Scroll Indicator */}
            <div aria-hidden="true" className="flex flex-col items-center gap-2 text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-10 bg-gradient-to-b from-blue-500 to-transparent rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STACKING PRODUCT CARDS ═══════ */}
      {catalogProducts.map((product, index) => {
        const IconComponent = product.icon;

        return (
          <section
            key={product.id}
            aria-labelledby={`product-${product.id}`}
            className="relative stack:sticky stack:top-0 stack:h-screen w-full flex items-center justify-center px-4 py-10 sm:p-6 md:p-8 stack:pt-24 overflow-hidden bg-slate-950 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-white/5"
            style={{ zIndex: index + 10 }}
          >
            {/* Subtle Colored Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
              style={{ backgroundColor: product.color }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
              style={{ backgroundColor: product.color }}
            />

            {/* Dark Frosted Card Container for 100% Crisp Readability */}
            <div className="relative z-10 w-full max-w-[1360px] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[10px] p-5 sm:p-8 lg:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* ─── Left Column: Product Information & CTAs (5 cols) ─── */}
                <div className="lg:col-span-5 flex flex-col justify-center">

                  {/* Category & Badge */}
                  <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                    <div
                      aria-hidden="true"
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center border border-white/10 bg-white/5 shadow-sm"
                      style={{ color: product.color }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border"
                        style={{
                          borderColor: `${product.color}40`,
                          backgroundColor: `${product.color}15`,
                          color: product.color
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h2 id={`product-${product.id}`} className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white mb-3">
                    {product.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base font-semibold text-slate-200 mb-3">
                    {product.tagline}
                  </p>

                  {/* Clean, Readable Short Description */}
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mb-6">
                    {product.desc}
                  </p>

                  {/* Clean Feature Tags / Highlights Grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {product.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 p-2.5 rounded-[10px] bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-4 h-4 shrink-0"
                          style={{ color: product.color }}
                        />
                        <span className="text-xs font-semibold text-slate-200 sm:truncate">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                    {product.externalUrl ? (
                      <>
                        <a
                          href={product.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            backgroundColor: product.color,
                            color: "#0f172a"
                          }}
                        >
                          <span>Visit Platform</span>
                          <span className="sr-only">: {product.name} (opens in a new tab)</span>
                          <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={product.detailUrl}
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                        >
                          <span>View Details</span>
                          <span className="sr-only">: {product.name}</span>
                          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={product.detailUrl}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[10px] font-bold text-xs tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          backgroundColor: product.color,
                          color: "#0f172a"
                        }}
                      >
                        <span>Explore Details</span>
                        <span className="sr-only">: {product.name}</span>
                        <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* ─── Right Column: High-Clarity Mockup Showcase Frame (7 cols) ─── */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="relative group rounded-[10px] overflow-hidden border border-white/10 bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-[1.01]">

                    {/* Mockup Window Header Bar */}
                    <div aria-hidden="true" className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-[10px] font-mono text-slate-400 truncate">
                          {product.name} — Live System
                        </span>
                      </div>
                      <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
                        {product.stats}
                      </span>
                    </div>

                    {/* Dashboard Screenshot Preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <Image
                        src={product.image}
                        alt={`${product.name} Interface Dashboard`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 800px"
                        priority={index === 0}
                      />
                      {/* Subtle hover gradient illumination */}
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      <FaqSection id="faq" faqs={PRODUCTS_FAQS} title="Products: common questions" intro="ERP, POS and billing software built in Belagavi for Indian businesses." />
    </div>
  );
}
