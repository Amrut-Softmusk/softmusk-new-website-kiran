import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { SITE, FULL_ADDRESS } from "@/lib/site";

const CONTACT_LINKS = [
  { icon: Phone, label: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
  { icon: WhatsAppIcon, label: "WhatsApp us", href: SITE.whatsapp, external: true },
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
];

const SOCIALS = [
  { icon: LinkedInIcon, label: "Softmusk on LinkedIn", href: SITE.socials.linkedin },
  { icon: FacebookIcon, label: "Softmusk on Facebook", href: SITE.socials.facebook },
  { icon: WhatsAppIcon, label: "Softmusk on WhatsApp", href: SITE.whatsapp },
];

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { name: "Software Development", href: "/services/software-development" },
      { name: "Web App Development", href: "/services/web-app-development" },
      { name: "Smart Industry (IIoT)", href: "/services/smart-industry" },
      { name: "Cloud Automation", href: "/services/cloud-automation" },
      { name: "Database Consultancy", href: "/services/database-consultancy" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  },
  {
    title: "Academy",
    links: [
      { name: "Internships", href: "/internships" },
      { name: "Apply for Internship", href: "/internship-registration" },
      { name: "Campus Workshops", href: "/workshops" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/#about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Products", href: "/products" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-5 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              aria-label="Softmusk home"
              className="inline-flex mb-6 rounded-[12px] bg-white px-4 py-3 shadow-lg ring-1 ring-white/10 hover:ring-cyan-500/50 transition"
            >
              <Image src="/softmusk-logo-full.png" alt="Softmusk Info Pvt. Ltd." width={720} height={226} className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm mb-8">{SITE.about}</p>

            <address className="not-italic space-y-3 mb-8">
              {CONTACT_LINKS.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={href}
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <span className="w-9 h-9 shrink-0 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                    <Icon className="w-4 h-4" />
                  </span>
                  {label}
                </a>
              ))}
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group max-w-sm"
              >
                <span className="w-9 h-9 shrink-0 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="leading-relaxed pt-1.5">
                  <span className="block font-semibold text-slate-300">{SITE.legalName}</span>
                  {FULL_ADDRESS}
                </span>
              </a>
            </address>

            <ul className="flex items-center gap-3" aria-label="Social media">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-[#0ABFFF] hover:to-[#1D7CE0] hover:border-transparent transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="font-black uppercase tracking-widest text-xs mb-6 text-white">{section.title}</h2>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <span aria-hidden="true" className="w-0 h-px bg-cyan-400 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {currentYear} {SITE.legalName} · Belagavi, Karnataka. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              Start a project <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
