import { Resend } from "resend";
import { SITE } from "@/lib/site";
import { CV_TYPES, ENQUIRY_KINDS, HONEYPOT_FIELD, LIMITS, type EnquiryKind } from "@/lib/enquiry";

// Website form → email to the Softmusk inbox via Resend.
// Env: RESEND_API_KEY (required), ENQUIRY_FROM (a sender on a domain verified in Resend), ENQUIRY_TO (optional).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KIND_LABEL: Record<EnquiryKind, string> = {
  contact: "Website enquiry",
  careers: "Job application",
  internship: "Internship application",
  demo: "Demo request",
  workshop: "Workshop request",
};

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

// Per-instance limiter: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = [req.headers.get("x-forwarded-host"), req.headers.get("host"), new URL(SITE.url).host];
  return allowed.includes(host);
}

const oneLine = (s: string, max: number) => s.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function parseFields(raw: string): [string, string][] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > LIMITS.fields) return null;
  const out: [string, string][] = [];
  for (const item of parsed) {
    if (!Array.isArray(item) || typeof item[0] !== "string" || typeof item[1] !== "string") return null;
    out.push([oneLine(item[0], LIMITS.label), item[1].trim().slice(0, LIMITS.value)]);
  }
  return out;
}

// Check the file's leading bytes, not just its name: PDF, DOCX (zip) or legacy DOC (OLE).
function isDocument(bytes: Uint8Array) {
  const hex = Array.from(bytes.slice(0, 4), (b) => b.toString(16).padStart(2, "0")).join("");
  return hex === "25504446" || hex === "504b0304" || hex === "d0cf11e0";
}

const fail = (error: string, status = 400) => Response.json({ error }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Forbidden.", 403);

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > LIMITS.cvBytes + 64 * 1024) return fail("The upload is too large (max 4 MB).", 413);

  if (rateLimited(clientIp(req))) return fail("Too many submissions. Please try again in a few minutes.", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid submission.");
  }
  const get = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };

  // Bots: pretend success so they don't retry.
  if (get(HONEYPOT_FIELD) || Number(get("elapsed")) < LIMITS.minFillMs) return Response.json({ ok: true });

  const kind = get("kind") as EnquiryKind;
  if (!ENQUIRY_KINDS.includes(kind)) return fail("Invalid submission.");

  const replyTo = oneLine(get("replyTo"), 150);
  if (!EMAIL_RE.test(replyTo)) return fail("Please enter a valid email address.");

  const subject = oneLine(get("subject"), LIMITS.subject) || KIND_LABEL[kind];
  const fields = parseFields(get("fields"));
  if (!fields) return fail("Invalid submission.");

  const attachments: { filename: string; content: Buffer }[] = [];
  const cv = form.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (kind !== "careers") return fail("Invalid submission.");
    const ext = cv.name.slice(cv.name.lastIndexOf(".")).toLowerCase();
    if (!CV_TYPES.includes(ext)) return fail("CV must be a PDF or Word document.");
    if (cv.size > LIMITS.cvBytes) return fail("CV is too large (max 4 MB).");
    const buf = Buffer.from(await cv.arrayBuffer());
    if (!isDocument(buf)) return fail("CV must be a PDF or Word document.");
    const safeName = cv.name.replace(/[^\w.\- ]+/g, "_").slice(-100) || `cv${ext}`;
    attachments.push({ filename: safeName, content: buf });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!apiKey || !from) {
    console.error("[enquiry] RESEND_API_KEY or ENQUIRY_FROM is not set");
    return fail("Online sending is not available right now.", 503);
  }
  const to = process.env.ENQUIRY_TO || SITE.email;

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const html =
    `<div style="font-family:Arial,sans-serif;max-width:640px">` +
    `<h2 style="margin:0 0 4px;color:#1D7CE0">${escapeHtml(KIND_LABEL[kind])}</h2>` +
    `<p style="margin:0 0 16px;color:#64748b;font-size:13px">From the ${escapeHtml(SITE.name)} website. Reply to this email to answer the sender.</p>` +
    `<table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>` +
    (attachments.length ? `<p style="color:#64748b;font-size:13px">CV attached.</p>` : "") +
    `</div>`;
  const text = `${KIND_LABEL[kind]}\n\n${fields.map(([l, v]) => `${l}: ${v}`).join("\n\n")}`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: [to],
      replyTo,
      subject: `[Website] ${subject}`,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    });
    if (error) {
      console.error("[enquiry] Resend error:", error.name, error.message);
      return fail("Could not send right now.", 502);
    }
  } catch (err) {
    console.error("[enquiry] send failed:", err instanceof Error ? err.message : err);
    return fail("Could not send right now.", 502);
  }

  return Response.json({ ok: true });
}
