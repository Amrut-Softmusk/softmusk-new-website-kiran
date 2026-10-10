// Shared between the form hook (browser) and /api/enquiry (server).

export const ENQUIRY_KINDS = ["contact", "careers", "internship", "demo", "workshop"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export type Field = [label: string, value: string | undefined | null];

export const LIMITS = {
  subject: 200,
  label: 60,
  value: 3000,
  fields: 15,
  cvBytes: 4 * 1024 * 1024, // stays under typical 4.5 MB serverless body limits
  minFillMs: 2500, // faster than this is a bot
} as const;

export const CV_TYPES = [".pdf", ".doc", ".docx"];
export const HONEYPOT_FIELD = "website";
