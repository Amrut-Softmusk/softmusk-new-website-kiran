import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/faqs";

/**
 * Visible FAQ list plus matching FAQPage JSON-LD, so the markup always mirrors what's on the page.
 * Uses native <details> so answers are in the HTML (crawlable) and work without JavaScript.
 */
export function FaqSection({
  faqs,
  id,
  title = "Common questions",
  intro,
  dark = false,
}: {
  faqs: readonly Faq[];
  id: string;
  title?: string;
  intro?: string;
  dark?: boolean;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={dark ? "w-full bg-slate-950 text-white" : "w-full bg-white text-slate-900"}
    >
      <JsonLd data={faqSchema(faqs)} />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1D7CE0] mb-4">FAQ</p>
          <h2 id={headingId} className="text-4xl md:text-5xl font-heading font-black tracking-tight leading-[1.05] mb-6">
            {title}
          </h2>
          {intro && <p className={dark ? "text-slate-400 font-medium leading-relaxed" : "text-slate-500 font-medium leading-relaxed"}>{intro}</p>}
        </div>
        <div className={`lg:col-span-8 divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-slate-200 border-slate-200"}`}>
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold transition-colors hover:text-[#1D7CE0] ${dark ? "text-white" : "text-slate-900"}`}
              >
                <h3 className="font-bold">{faq.q}</h3>
                <span
                  aria-hidden="true"
                  className={`w-9 h-9 shrink-0 rounded-[10px] border flex items-center justify-center transition-all duration-300 group-open:rotate-180 ${
                    dark
                      ? "border-white/15 group-open:bg-white group-open:text-slate-950"
                      : "border-slate-200 group-open:bg-slate-950 group-open:text-white group-open:border-slate-950"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <p className={`pt-4 pr-14 leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
