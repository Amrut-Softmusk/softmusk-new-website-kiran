"use client";

import { motion } from "framer-motion";
import { Send, Building, User, Mail, Phone, Calendar } from "lucide-react";
import { FormStatus, HoneypotField } from "@/components/ui/FormStatus";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { useEnquiry } from "@/lib/useEnquiry";

const inputClass =
  "w-full bg-slate-900/50 border border-slate-700 rounded-[10px] px-4 py-3 text-white outline-none focus:border-blue-500 focus:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors placeholder:text-slate-500";
const labelClass = "text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2";

export function WorkshopForm() {
  const { status, message, fallbackHref, send, sending } = useEnquiry(CONTACT_EMAIL);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "");
    send(e.currentTarget, { kind: "workshop", subject: `Workshop request — ${get("institution")}`, replyTo: get("email"), fields: [
      ["Institution", get("institution")],
      ["Contact person", get("contact")],
      ["Email", get("email")],
      ["Phone", get("phone")],
      ["Preferred dates & topics", get("details")],
    ] });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[10px] p-6 sm:p-8 md:p-12 shadow-2xl relative"
    >
      <HoneypotField />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-2">
          <label htmlFor="ws-institution" className={labelClass}>
            <Building className="w-4 h-4" /> College / Institution Name
          </label>
          <input id="ws-institution" name="institution" required type="text" autoComplete="organization" maxLength={150} className={inputClass} placeholder="e.g. Stanford University" />
        </div>

        <div className="space-y-2">
          <label htmlFor="ws-contact" className={labelClass}>
            <User className="w-4 h-4" /> Contact Person
          </label>
          <input id="ws-contact" name="contact" required type="text" autoComplete="name" maxLength={100} className={inputClass} placeholder="John Doe, HOD CS" />
        </div>

        <div className="space-y-2">
          <label htmlFor="ws-email" className={labelClass}>
            <Mail className="w-4 h-4" /> Official Email
          </label>
          <input id="ws-email" name="email" required type="email" autoComplete="email" maxLength={150} className={inputClass} placeholder="john@university.edu" />
        </div>

        <div className="space-y-2">
          <label htmlFor="ws-phone" className={labelClass}>
            <Phone className="w-4 h-4" /> Phone Number
          </label>
          <input id="ws-phone" name="phone" required type="tel" autoComplete="tel" maxLength={30} className={inputClass} placeholder="+91 98765 43210" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="ws-details" className={labelClass}>
            <Calendar className="w-4 h-4" /> Preferred Dates &amp; Topics
          </label>
          <textarea id="ws-details" name="details" required rows={4} maxLength={2000} className={`${inputClass} resize-none`} placeholder="We are looking for a 2-day Next.js masterclass in late October..." />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          type="submit"
          disabled={sending}
          className="group relative px-8 py-3.5 min-h-14 bg-blue-600 text-white rounded-[10px] font-bold text-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center w-full shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:opacity-60 disabled:pointer-events-none"
        >
          <span className="relative z-10 flex items-center gap-2">
            {sending ? "Sending…" : "Submit Workshop Request"}
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span aria-hidden="true" className="absolute inset-0 h-full w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
        </button>
      </div>

      <FormStatus status={status} message={message} fallbackHref={fallbackHref} email={CONTACT_EMAIL} tone="dark" />
    </motion.form>
  );
}
