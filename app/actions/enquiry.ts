"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import type { ContactFormData } from "@/types";
import type { EnquiryInsert } from "@/lib/supabase/types";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Inserts a contact-form submission into `enquiries` using the service role (table is RLS-locked). */
export async function submitEnquiry(form: ContactFormData): Promise<EnquiryResult> {
  const row: EnquiryInsert = {
    name: clean(form.name, 120),
    email: clean(form.email, 160).toLowerCase(),
    phone: clean(form.phone, 40),
    event_type: (Array.isArray(form.eventTypes) ? form.eventTypes : [])
      .map((t) => clean(t, 80))
      .filter(Boolean)
      .join(", ")
      .slice(0, 200),
    event_date: clean(form.eventDate, 80) || null,
    location: clean(form.location, 160) || null,
    message: clean(form.message, 4000),
    source: "website",
  };

  if (!row.name || !row.email || !row.phone || !row.message) {
    return { ok: false, error: "Please complete all required fields." };
  }
  if (!row.event_type) {
    return { ok: false, error: "Please select at least one event type." };
  }
  if (!EMAIL_RE.test(row.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    const { error } = await supabaseAdmin().from("enquiries").insert(row);
    if (error) {
      console.error("[enquiry] insert failed:", error.message);
      return { ok: false, error: "We couldn't send your inquiry just now. Please try again or email us directly." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[enquiry] unexpected:", e);
    return { ok: false, error: "We couldn't send your inquiry just now. Please try again or email us directly." };
  }
}
