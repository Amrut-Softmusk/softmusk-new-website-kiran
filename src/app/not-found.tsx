import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { DotExpandButton } from "@/components/ui/DotExpandButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-5 pt-32 pb-24">
        <div className="text-center max-w-lg">
          <p className="text-8xl md:text-9xl font-heading font-black bg-gradient-to-br from-[#0ABFFF] to-[#1D7CE0] bg-clip-text text-transparent mb-6">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-4">Page not found</h1>
          <p className="text-slate-600 mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <DotExpandButton href="/" variant="primary">Back to Home</DotExpandButton>
            <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1D7CE0] transition-colors px-4 py-3">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
