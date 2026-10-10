"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { HONEYPOT_FIELD } from "@/lib/enquiry";
import type { EnquiryStatus } from "@/lib/useEnquiry";

/** Result line under a form: sent confirmation, or the error with a pre-filled email fallback. */
export function FormStatus({
  status,
  message,
  fallbackHref,
  email,
  tone = "light",
}: {
  status: EnquiryStatus;
  message: string;
  fallbackHref: string;
  email: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const show = status === "sent" || status === "error";
  const ok = status === "sent";

  return (
    <div aria-live="polite">
      <AnimatePresence>
        {show && (
          <motion.div
            key={status}
            role={ok ? "status" : "alert"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 text-sm font-medium px-4 py-3 rounded-[10px] mt-4 border ${
              ok
                ? dark
                  ? "text-emerald-100 bg-emerald-500/10 border-emerald-500/20"
                  : "text-emerald-800 bg-emerald-50 border-emerald-100"
                : dark
                  ? "text-rose-100 bg-rose-500/10 border-rose-500/20"
                  : "text-rose-800 bg-rose-50 border-rose-100"
            }`}
          >
            {ok ? (
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${dark ? "text-emerald-400" : "text-emerald-600"}`} />
            ) : (
              <AlertCircle className={`w-5 h-5 shrink-0 ${dark ? "text-rose-400" : "text-rose-600"}`} />
            )}
            {ok ? (
              <span>Thank you — we&apos;ve received it and will get back to you within 1–2 working days.</span>
            ) : (
              <span>
                {message} You can{" "}
                <a href={fallbackHref} className="font-bold underline underline-offset-2">
                  send it by email instead
                </a>{" "}
                ({email}).
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Hidden field that only bots fill in. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
