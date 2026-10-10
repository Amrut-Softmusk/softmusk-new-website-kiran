"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";

const MESSAGE = "Hi Softmusk, I found you on your website and would like to discuss a requirement.";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`${SITE.whatsapp}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Softmusk on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex items-center h-14 pl-4 pr-4 sm:hover:pr-5 rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] transition-[padding] duration-300"
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      <WhatsAppIcon className="relative w-6 h-6 shrink-0" />
      <span className="relative hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[140px] group-hover:ml-2">
        Chat with us
      </span>
    </motion.a>
  );
}
