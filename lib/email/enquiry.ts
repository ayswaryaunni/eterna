import "server-only";
import { Resend } from "resend";
import type { EnquiryInsert } from "@/lib/supabase/types";

/*
 * Enquiry emails via Resend. Configured with:
 *   RESEND_API_KEY      — from resend.com → API Keys
 *   ENQUIRY_NOTIFY_TO   — concierge inbox that receives new-enquiry alerts
 *   ENQUIRY_FROM        — sender, e.g. "Eterna <concierge@eternaevents.com>"
 *                         (domain must be verified in Resend; until then use
 *                         "Eterna <onboarding@resend.dev>", which can only
 *                         deliver to the Resend account owner's address)
 * If RESEND_API_KEY is missing the functions are a no-op, so the site keeps
 * working without email.
 */

const BRAND = { plum: "#5A2548", ink: "#1C1518", ivory: "#F5F1F0", linen: "#E5E1E0" };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function config() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return {
    resend: new Resend(key),
    to: process.env.ENQUIRY_NOTIFY_TO ?? "",
    from: process.env.ENQUIRY_FROM ?? "Eterna <onboarding@resend.dev>",
  };
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:${BRAND.ivory};font-family:Georgia,serif;color:${BRAND.ink}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid ${BRAND.linen}">
      <tr><td style="height:4px;background:${BRAND.plum}"></td></tr>
      <tr><td style="padding:36px 40px 8px">
        <div style="font:11px/1 Helvetica,Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:${BRAND.plum}">Eterna · Events &amp; Weddings</div>
        <h1 style="margin:16px 0 0;font:300 28px/1.2 Georgia,serif;color:${BRAND.ink}">${title}</h1>
      </td></tr>
      <tr><td style="padding:16px 40px 40px;font:15px/1.7 Helvetica,Arial,sans-serif;color:#444">${body}</td></tr>
    </table>
    <div style="padding:20px;font:11px Helvetica,Arial,sans-serif;color:#999">You are receiving this because an inquiry was submitted on the Eterna website.</div>
  </td></tr></table></body></html>`;
}

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.linen};font:11px Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#888;width:150px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.linen};font:14px/1.6 Helvetica,Arial,sans-serif;color:${BRAND.ink}">${esc(value)}</td>
  </tr>`;
}

/** Internal alert to the concierge team. */
export async function notifyConcierge(e: EnquiryInsert): Promise<void> {
  const cfg = config();
  if (!cfg || !cfg.to) return;

  const details = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${row("Name", e.name)}${row("Email", e.email)}${row("Phone", e.phone)}
    ${row("Event type", e.event_type)}${row("Event date", e.event_date)}${row("Location", e.location)}
  </table>
  <p style="margin:24px 0 8px;font:11px Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#888">Their vision</p>
  <p style="margin:0;white-space:pre-line;background:${BRAND.ivory};padding:16px;border-left:3px solid ${BRAND.plum}">${esc(e.message)}</p>
  <p style="margin:28px 0 0"><a href="mailto:${esc(e.email)}" style="display:inline-block;background:${BRAND.plum};color:#fff;text-decoration:none;padding:12px 22px;font:12px Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase">Reply to ${esc(e.name)}</a></p>`;

  await cfg.resend.emails.send({
    from: cfg.from,
    to: cfg.to,
    replyTo: e.email,
    subject: `New inquiry — ${e.name} · ${e.event_type || "Event"}`,
    html: shell("A new inquiry has arrived", details),
  });
}

/** Confirmation to the person who enquired. */
export async function confirmToClient(e: EnquiryInsert): Promise<void> {
  const cfg = config();
  if (!cfg) return;

  const body = `<p>Dear ${esc(e.name.split(" ")[0] || e.name)},</p>
  <p>Thank you for reaching out to Eterna. Your inquiry has been received and is being read personally by our concierge team. We will be in touch within <strong>24 business hours</strong> to arrange a private consultation.</p>
  <p style="margin:24px 0 8px;font:11px Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#888">A summary of what you shared</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${row("Event type", e.event_type)}${row("Event date", e.event_date)}${row("Location", e.location)}
  </table>
  <p style="margin-top:28px">With warm regards,<br><span style="font-family:Georgia,serif;font-size:18px;letter-spacing:.2em">ETERNA</span></p>`;

  await cfg.resend.emails.send({
    from: cfg.from,
    to: e.email,
    subject: "We have received your inquiry — Eterna",
    html: shell("Your inquiry has been received", body),
  });
}
