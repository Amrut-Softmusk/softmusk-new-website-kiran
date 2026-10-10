"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormStatus, HoneypotField } from "@/components/ui/FormStatus";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { useEnquiry } from "@/lib/useEnquiry";
import { SITE, FULL_ADDRESS, SUPPORT_FAQS } from "@/lib/site";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: SITE.phoneDisplay,
    description: "Speak directly with our team.",
    action: `tel:${SITE.phone}`,
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    details: "Chat with us",
    description: "Send your requirement on WhatsApp.",
    action: SITE.whatsapp,
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    details: CONTACT_EMAIL,
    description: "Projects, products, internships and support.",
    action: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: SITE.legalName,
    description: FULL_ADDRESS,
    action: SITE.mapsUrl,
    external: true,
  },
];

const SERVICE_OPTIONS = [
  "Software Development",
  "Website & Web Application",
  "ERP & Business Software",
  "Cloud & DevOps",
  "IoT Solutions",
  "Database Support",
  "Digital Services",
  "IT Training / Internship",
  "Technical Support",
  "Other",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "h-14 bg-slate-50 border-slate-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 shadow-none text-base rounded-[10px] px-5";

const labelClass = "block text-[11px] font-black uppercase tracking-widest text-slate-700 ml-1";

const EMPTY_FORM = { name: "", email: "", phone: "", company: "", service: "", subject: "", message: "" };

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const { status, message, fallbackHref, send, sending } = useEnquiry(CONTACT_EMAIL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${formData.service ? `[${formData.service}] ` : ""}${formData.subject || "Website enquiry"}`;
    const sent = await send(e.currentTarget, { kind: "contact", subject, replyTo: formData.email, fields: [
      ["Name", formData.name],
      ["Email", formData.email],
      ["Phone", formData.phone],
      ["Company / Organization", formData.company],
      ["Service Required", formData.service],
      ["Requirement", formData.message],
    ] });
    if (sent) setFormData(EMPTY_FORM);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500/30 overflow-x-clip">
      {/* 1. Dark hero */}
      <section className="relative pt-40 pb-52 bg-slate-950 overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-700/15 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              Softmusk · Belagavi, Karnataka
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white mb-8 leading-[1.05]"
            >
              Let&apos;s build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">extraordinary.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl"
            >
              Have a software requirement, business automation idea, Cloud &amp; DevOps project or IoT requirement? Call, WhatsApp or send an enquiry — our Belagavi team will get in touch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-gradient-to-r from-[#0ABFFF] to-[#1D7CE0] text-white font-bold shadow-[0_10px_30px_-10px_rgba(10,191,255,0.6)] hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-white/5 border border-white/15 text-white font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Overlapping card: info + form */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 -mt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-[10px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
          {/* Left: contact info */}
          <div className="lg:col-span-5 bg-slate-50 lg:border-r border-b lg:border-b-0 border-slate-100 relative flex flex-col justify-between">
            <div className="p-8 md:p-14">
              <h2 className="text-3xl font-black font-heading text-slate-900 mb-10">Get in Touch</h2>

              <address className="not-italic">
                <ul className="space-y-8">
                  {contactInfo.map((info, idx) => (
                    <motion.li
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, ease: EASE }}
                    >
                      <a
                        href={info.action}
                        {...(info.external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="flex gap-5 group rounded-[10px]"
                      >
                        <span className="w-14 h-14 shrink-0 rounded-[10px] bg-white border border-slate-200 flex items-center justify-center group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(10,191,255,0.2)] transition-all duration-300">
                          <info.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold text-lg text-slate-900 mb-1">{info.title}</span>
                          <span className="block text-cyan-600 font-bold mb-1 break-words">{info.details}</span>
                          <span className="block text-slate-500 text-sm font-medium leading-relaxed">{info.description}</span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </address>
            </div>

            {/* Office map */}
            <div className="p-6 pt-0">
              <div className="relative w-full h-[280px] rounded-[10px] overflow-hidden bg-slate-200 border border-slate-200">
                <iframe
                  src={SITE.mapsEmbed}
                  title={`Map: ${SITE.legalName}, Belagavi`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#1D7CE0] hover:text-cyan-600"
              >
                Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7 p-8 md:p-16 lg:p-20 bg-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-black font-heading text-slate-900 mb-2">Send an enquiry</h2>
              <p className="text-slate-500 font-medium mb-10">
                Tell us what you need — it comes straight to our team and we reply within 1–2 working days.
              </p>

              <form onSubmit={handleSubmit} className="relative space-y-8">
                <HoneypotField />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className={labelClass}>
                      Full Name
                    </label>
                    <Input id="name" name="name" autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} required maxLength={100} className={inputClass} />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className={labelClass}>
                      Email Address
                    </label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required maxLength={150} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required maxLength={20} className={inputClass} />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="company" className={labelClass}>
                      Company / Organization <span className="text-slate-400 normal-case tracking-normal font-medium">(optional)</span>
                    </label>
                    <Input id="company" name="company" autoComplete="organization" placeholder="Company or college" value={formData.company} onChange={handleChange} maxLength={120} className={inputClass} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="service" className={labelClass}>
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={`w-full h-14 appearance-none rounded-[10px] border border-slate-200 bg-slate-50 pl-5 pr-12 text-base outline-none transition-colors focus-visible:border-cyan-500 focus-visible:ring-4 focus-visible:ring-cyan-500/20 ${formData.service ? "text-slate-900" : "text-slate-400"}`}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="text-slate-900">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} required maxLength={150} className={inputClass} />
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className={labelClass}>
                    Your Requirement
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, issue or requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    className="flex w-full min-w-0 rounded-[10px] border border-slate-200 bg-slate-50 px-5 py-4 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-cyan-500 focus-visible:ring-4 focus-visible:ring-cyan-500/20 resize-none min-h-[180px]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 min-h-14 bg-slate-950 text-white font-bold rounded-[10px] overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(15,23,42,0.3)] w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {sending ? "Sending…" : "Send Enquiry"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                <FormStatus status={status} message={message} fallbackHref={fallbackHref} email={CONTACT_EMAIL} />
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FAQ */}
      <section aria-labelledby="faq-heading" className="max-w-[1400px] mx-auto px-6 sm:px-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1D7CE0] mb-4">FAQ</p>
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
              Common questions
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Can&apos;t find your answer? Call{" "}
              <a href={`tel:${SITE.phone}`} className="font-bold text-slate-900 hover:text-[#1D7CE0] whitespace-nowrap">
                {SITE.phoneDisplay}
              </a>{" "}
              or{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#1D7CE0]">
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-slate-200 border-y border-slate-200">
            {SUPPORT_FAQS.map((faq) => (
              <details key={faq.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-slate-900 hover:text-[#1D7CE0] transition-colors">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 shrink-0 rounded-[10px] border border-slate-200 flex items-center justify-center transition-all duration-300 group-open:rotate-180 group-open:bg-slate-950 group-open:text-white group-open:border-slate-950"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <p className="pt-4 pr-14 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
