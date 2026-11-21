import "server-only";
import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import ws from "ws";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
}

// Node < 22 has no native WebSocket; realtime-js needs one even though we never subscribe.
const options: SupabaseClientOptions<"public"> = {
  auth: { persistSession: false, autoRefreshToken: false },
  // ws's constructor signature differs from the DOM WebSocket type supabase expects
  realtime: { transport: ws as unknown as typeof WebSocket },
};

/** Read-only client for public content (respects RLS: published rows only). */
export const supabase = createClient(url, anonKey, options);

/**
 * Privileged client — bypasses RLS. Server-only. Used for enquiry inserts
 * and the seed script. Throws if the secret key is not configured.
 */
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url!, serviceKey, options);
}
