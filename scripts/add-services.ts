/*
 * Adds services from scripts/seed-data/services.ts that are not yet in Supabase.
 * Existing rows are never touched, so edits made in the dashboard are safe.
 *
 *   npm run services:add
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { services } from "./seed-data/services";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✖ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false }, realtime: { transport: ws as unknown as typeof WebSocket } });
const BUCKET = "media";
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };

/** Upload a /public image to storage and return its public URL. */
async function upload(publicPath: string): Promise<string> {
  const rel = publicPath.replace(/^\//, "");
  const objectPath = rel.replace(/^images\//, "");
  const file = await readFile(path.join(process.cwd(), "public", rel));
  const contentType = MIME[path.extname(rel).toLowerCase()] ?? "application/octet-stream";
  const { error } = await db.storage.from(BUCKET).upload(objectPath, file, { contentType, upsert: true });
  if (error) throw new Error(`upload ${rel}: ${error.message}`);
  return db.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
}

async function main() {
  const { data: existing, error } = await db.from("services").select("slug");
  if (error) throw error;
  const have = new Set((existing ?? []).map((r) => r.slug as string));

  let added = 0;
  for (const [i, s] of services.entries()) {
    if (have.has(s.id)) continue;
    const { error: insErr } = await db.from("services").insert({
      slug: s.id,
      title: s.title,
      subtitle: s.subtitle ?? null,
      description: s.description,
      image_url: await upload(s.image),
      features: s.features ?? [],
      featured: s.featured ?? false,
      sort_order: i,
    });
    if (insErr) throw insErr;
    console.log(`  + ${s.id}`);
    added++;
  }
  console.log(added ? `✓ Added ${added} service(s)` : "✓ Nothing to add — all services already exist");
}

main().catch((e) => {
  console.error("✖", e.message ?? e);
  process.exit(1);
});
