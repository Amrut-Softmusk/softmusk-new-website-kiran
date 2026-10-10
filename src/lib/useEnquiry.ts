"use client";

import { useRef, useState } from "react";
import { buildMailto } from "./mailto";
import { HONEYPOT_FIELD, type EnquiryKind, type Field } from "./enquiry";

export type EnquiryStatus = "idle" | "sending" | "sent" | "error";

/** Posts a form to /api/enquiry. On failure it keeps a pre-filled mailto link as a fallback. */
export function useEnquiry(to: string) {
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [message, setMessage] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");
  const [openedAt] = useState(() => Date.now());
  const busy = useRef(false);

  async function send(
    form: HTMLFormElement,
    { kind, subject, fields, replyTo }: { kind: EnquiryKind; subject: string; fields: Field[]; replyTo: string },
  ) {
    if (busy.current) return false;
    busy.current = true;
    setStatus("sending");
    setMessage("");

    const source = new FormData(form);
    const body = new FormData();
    body.set("kind", kind);
    body.set("subject", subject);
    body.set("replyTo", replyTo);
    body.set("fields", JSON.stringify(fields.filter(([, v]) => v && v.trim())));
    body.set("elapsed", String(Date.now() - openedAt));
    body.set(HONEYPOT_FIELD, String(source.get(HONEYPOT_FIELD) ?? ""));
    const cv = source.get("cv");
    if (cv instanceof File && cv.size > 0) body.set("cv", cv);

    try {
      const res = await fetch("/api/enquiry", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Could not send right now.");
      setStatus("sent");
      form.reset();
      return true;
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not send right now.");
      setFallbackHref(buildMailto(to, subject, fields));
      setStatus("error");
      return false;
    } finally {
      busy.current = false;
    }
  }

  return { status, message, fallbackHref, send, sending: status === "sending" };
}
