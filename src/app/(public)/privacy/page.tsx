import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Softmusk website handles your information.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    title: "What this website collects",
    body: "This website does not use accounts, analytics trackers, advertising cookies or a database. Browsing the site does not require you to share any personal information.",
  },
  {
    title: "Forms and email",
    body: "The contact, workshop, internship and careers forms do not store anything on our servers. When you submit one, your own email app opens with a pre-filled message addressed to Softmusk. Nothing is sent until you press send in your email app, and only what you choose to send reaches us.",
  },
  {
    title: "How we use what you send",
    body: "We use the details in your email only to reply to you and to handle your enquiry, application or workshop request. We do not sell or share your information with third parties for marketing.",
  },
  {
    title: "Cookies",
    body: "The site sets no tracking or marketing cookies. Your browser may keep standard technical data (such as cached files) to load pages faster.",
  },
  {
    title: "Contact",
    body: "Questions about this policy or a request to delete an email you sent us: write to service@softmusk.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="max-w-3xl mx-auto px-5 sm:px-6 pt-36 pb-24">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1D7CE0] mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-12">
          Short version: this is a static website. We don&apos;t track you, and we only see what you email to us.
        </p>

        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-heading font-bold text-slate-900 mb-3">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
