import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { IntroProvider } from "@/components/motion/IntroProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-[10px] focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-[#1D7CE0] focus:shadow-xl"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <PublicNavbar />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <PublicFooter />
        <FloatingWhatsApp />
      </div>
    </IntroProvider>
  );
}
