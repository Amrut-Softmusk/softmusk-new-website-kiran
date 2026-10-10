// Contact addresses, plus the pre-filled mailto link shown when online sending fails.

import { SITE } from "./site";
import type { Field } from "./enquiry";

export const CONTACT_EMAIL = SITE.email;
// No separate careers inbox yet: applications go to the main service address.
export const CAREERS_EMAIL = SITE.email;

export function buildMailto(to: string, subject: string, fields: Field[], intro?: string) {
  const lines = fields
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`);
  const body = [intro, ...lines].filter(Boolean).join("\n\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
