"use client";

import Link from "next/link";

// Shown when a page throws at runtime. Only the digest is shown; the real error stays in server logs.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-24">
      <div className="text-center max-w-lg">
        <p className="text-7xl md:text-8xl font-heading font-black bg-gradient-to-br from-[#0ABFFF] to-[#1D7CE0] bg-clip-text text-transparent mb-6">
          Oops
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-10">Please try again. If it keeps happening, contact us and we&apos;ll sort it out.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[#1D7CE0] px-7 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-[#1667bd] transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1D7CE0] transition-colors px-4 py-3">
            Back to Home
          </Link>
        </div>
        {error.digest && <p className="mt-10 text-xs text-slate-400">Reference: {error.digest}</p>}
      </div>
    </main>
  );
}
