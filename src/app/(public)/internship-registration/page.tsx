"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormStatus, HoneypotField } from "@/components/ui/FormStatus";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { useEnquiry } from "@/lib/useEnquiry";

const PROGRAMS = [
  "Next.js Full-Stack",
  "React & IIoT Hardware",
  "Cloud & DevOps",
  "UI/UX Product Design",
];

const FEATURES = [
  "Live project experience",
  "Direct mentorship from senior devs",
  "Offer Letter & Certificate",
  "Placement Assistance",
];

const STEPS = [
  "Send your application using this form",
  "We review it and reply within 2 working days",
  "Short call with a mentor, then your onboarding date",
];

const fieldClass =
  "h-12 bg-slate-50 border-slate-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 shadow-none text-base rounded-[10px] px-4";
const labelClass = "block text-sm font-semibold text-slate-800";

export default function RegistrationPage() {
  const { status, message, fallbackHref, send, sending } = useEnquiry(CONTACT_EMAIL);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "");
    const name = `${get("firstName")} ${get("lastName")}`.trim();
    send(e.currentTarget, { kind: "internship", subject: `Internship application — ${get("program")} — ${name}`, replyTo: get("email"), fields: [
      ["Name", name],
      ["Email", get("email")],
      ["Phone", get("phone")],
      ["Program", get("program")],
      ["College / Year", get("college")],
      ["Portfolio / GitHub", get("portfolio")],
    ] });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-36 pb-24 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#1D7CE0]/10 text-[#1D7CE0] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1D7CE0]/20">
              Registration
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900 leading-[1.1]">
              Launch Your Tech Career Today.
            </h1>
            <p className="text-slate-600 mt-4 text-lg">
              Apply for our intensive 6-month internship program. Fill in your details and we&apos;ll get back to you with next steps.
            </p>
          </div>

          <ul className="space-y-4 pt-2">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </span>
                <span className="font-medium text-slate-800">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-[10px] border border-slate-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">How it works</p>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-slate-700">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[10px] border border-slate-200 shadow-2xl overflow-hidden"
        >
          <div className="px-6 sm:px-8 py-6 bg-slate-50 border-b border-slate-200">
            <h2 className="text-2xl font-heading font-bold text-slate-900">Internship Details</h2>
            <p className="text-sm text-slate-500 mt-1">Takes about a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative space-y-5 px-6 sm:px-8 py-8">
            <HoneypotField />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="reg-first" className={labelClass}>First Name</label>
                <Input id="reg-first" name="firstName" autoComplete="given-name" placeholder="John" required maxLength={60} className={fieldClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="reg-last" className={labelClass}>Last Name</label>
                <Input id="reg-last" name="lastName" autoComplete="family-name" placeholder="Doe" required maxLength={60} className={fieldClass} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-email" className={labelClass}>Email Address</label>
              <Input id="reg-email" name="email" type="email" autoComplete="email" placeholder="john@example.com" required maxLength={150} className={fieldClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-phone" className={labelClass}>Phone Number</label>
              <Input id="reg-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required maxLength={30} className={fieldClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-program" className={labelClass}>Internship Program</label>
              <div className="relative">
                <select
                  id="reg-program"
                  name="program"
                  required
                  defaultValue=""
                  className="h-12 w-full appearance-none rounded-[10px] border border-slate-200 bg-slate-50 px-4 pr-10 text-base text-slate-900 outline-none transition-colors focus-visible:border-cyan-500 focus-visible:ring-3 focus-visible:ring-cyan-500/20 invalid:text-slate-400"
                >
                  <option value="" disabled>Choose a domain</option>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p} className="text-slate-900">{p}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-college" className={labelClass}>
                College &amp; Year <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <Input id="reg-college" name="college" placeholder="e.g. B.Tech CSE, 3rd year" maxLength={120} className={fieldClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-portfolio" className={labelClass}>
                Portfolio / GitHub <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <Input id="reg-portfolio" name="portfolio" type="url" autoComplete="url" placeholder="https://github.com/you" maxLength={200} className={fieldClass} />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={sending}
                className="group w-full bg-gradient-to-br from-[#0ABFFF] to-[#1D7CE0] text-white font-bold text-lg px-8 py-3.5 min-h-14 rounded-[10px] flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(29,124,224,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
              >
                {sending ? "Sending…" : "Send Application"} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <FormStatus status={status} message={message} fallbackHref={fallbackHref} email={CONTACT_EMAIL} />
          </form>

          <div className="bg-slate-50 border-t border-slate-200 py-4 px-6 flex justify-center">
            <p className="flex items-center gap-2 text-xs text-slate-500 font-medium text-center">
              <Mail className="h-4 w-4 text-cyan-600 shrink-0" />
              Prefer email? Write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-slate-700 underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
