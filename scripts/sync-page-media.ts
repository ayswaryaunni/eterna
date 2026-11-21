/*
 * Upload the bundled page images/videos (DEFAULT_SLOTS in lib/media.ts) to the
 * `media` bucket and store their URLs in site_settings, so every slot is
 * editable from the Supabase dashboard.
 *
 *   npm run media:sync          (also runs as part of `npm run seed`)
 *
 * Needs migration supabase/migrations/0004_page_media.sql. Only touches the
 * page-media columns — nothing else in site_settings or any other table.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import ws from "ws";
import { DEFAULT_SLOTS } from "../lib/media";

const BUCKET = "media";
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4" };

export async function syncPageMedia(db: SupabaseClient): Promise<boolean> {
  const cache = new Map<string, string>();
  const upload = async (publicPath: string) => {
    if (cache.has(publicPath)) return cache.get(publicPath)!;
    // "/images/events/x/1.jpg" → "events/x/1.jpg" (same layout the seed uses)
    const objectPath = publicPath.replace(/^\/(images\/)?/, "");
    const file = await readFile(path.join("public", publicPath));
    const contentType = MIME[path.extname(publicPath).toLowerCase()] ?? "application/octet-stream";
    const { error } = await db.storage.from(BUCKET).upload(objectPath, file, { contentType, upsert: true });
    if (error) throw new Error(`upload ${objectPath}: ${error.message}`);
    console.log(`  ↑ ${objectPath}`);
    const url = db.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
    cache.set(publicPath, url);
    return url;
  };
  const all = async (paths: string[]) => {
    const out: string[] = [];
    for (const p of paths) out.push(await upload(p));
    return out;
  };

  const m = DEFAULT_SLOTS;
  const { error } = await db
    .from("site_settings")
    .update({
      home_atelier_images: await all(m.homeAtelier),
      about_preview_images: await all(m.aboutPreview),
      portfolio_hero_images: await all(m.portfolioHero),
      contact_office_images: await all(m.contactOffices),
      showcase_poster: await upload(m.showcasePoster),
      services_video: await upload(m.servicesVideo),
      services_poster: await upload(m.servicesPoster),
    })
    .eq("id", 1);
  if (error) {
    if (/column|schema cache/i.test(error.message)) {
      console.warn("  ! page media skipped — run supabase/migrations/0004_page_media.sql in the SQL Editor first");
      return false;
    }
    throw error;
  }
  return true;
}

// Run directly: npm run media:sync
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("✖ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false }, realtime: { transport: ws as unknown as typeof WebSocket } });
  console.log("→ page media");
  syncPageMedia(db)
    .then((ok) => console.log(ok ? "✔ page media synced" : "✖ not synced"))
    .catch((e) => {
      console.error("✖ failed:", e.message ?? e);
      process.exit(1);
    });
}
