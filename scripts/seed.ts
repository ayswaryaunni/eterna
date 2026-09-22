/*
 * One-off seed: migrates the original hardcoded content (scripts/seed-data/*)
 * into Supabase, uploading every referenced image to the public `media` bucket.
 *
 *   npm run seed
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local. Safe to re-run: rows are
 * upserted by slug/author and existing storage objects are overwritten.
 */
import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { services } from "./seed-data/services";
import { portfolioItems } from "./seed-data/portfolio";
import { testimonials } from "./seed-data/testimonials";
import { siteConfig } from "./seed-data/site";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✖ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false }, realtime: { transport: ws as unknown as typeof WebSocket } });
const BUCKET = "media";

// Team members currently live inline in components/about/AboutTeam.tsx
const team = [
  {
    name: "Ayswarya Unni",
    role: "Founder & Creative Director",
    bio: "Master of spatial design with over a decade spent curating private galas and high-profile nuptials across Europe and Asia.",
    image: "/images/portfolio/kyoto-wedding.jpg",
  },
  {
    name: "Marcus Vance",
    role: "Head of International Logistics",
    bio: "Specializes in multi-day destination venue transformations, cross-border hospitality, and royal estate production.",
    image: "/images/portfolio/manhattan-gala.jpg",
  },
  {
    name: "Elena Rostova",
    role: "Floral Architecture Lead",
    bio: "Haute couture floral artist known for installing monumental, immersive botanical sculptures in historic venues.",
    image: "/images/portfolio/chateau-wedding.jpg",
  },
];

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
};

const uploaded = new Map<string, string>();

/** Upload a /public path to storage (once) and return its public URL. */
async function upload(publicPath: string): Promise<string> {
  if (!publicPath) return "";
  if (uploaded.has(publicPath)) return uploaded.get(publicPath)!;

  const rel = publicPath.replace(/^\//, ""); // images/portfolio/x.jpg
  const objectPath = rel.replace(/^images\//, ""); // portfolio/x.jpg
  const file = await readFile(path.join(process.cwd(), "public", rel));
  const contentType = MIME[path.extname(rel).toLowerCase()] ?? "application/octet-stream";

  const { error } = await db.storage.from(BUCKET).upload(objectPath, file, { contentType, upsert: true });
  if (error) throw new Error(`upload ${rel}: ${error.message}`);

  const { data } = db.storage.from(BUCKET).getPublicUrl(objectPath);
  uploaded.set(publicPath, data.publicUrl);
  process.stdout.write(`  ↑ ${rel}\n`);
  return data.publicUrl;
}

async function main() {
  console.log("→ site settings");
  {
    const { error } = await db.from("site_settings").upsert({
      id: 1,
      ...siteConfig,
      home_hero_image: await upload("/images/hero-couple.jpg"),
      home_hero_video: await upload("/images/hero/6a6305bf5040b777232a1810_GG_mp4.mp4"),
      about_hero_image: await upload("/images/about-hero.jpg"),
      showcase_video: await upload("/videos/services-reel.mp4"),
      contact_hero_image: await upload("/images/hero/6a6305bf5040b777232a1833_post-one-multy-image-three.avif"),
    });
    if (error) throw error;
  }

  console.log("→ services");
  for (const [i, s] of services.entries()) {
    const { error } = await db.from("services").upsert(
      {
        slug: s.id,
        title: s.title,
        subtitle: s.subtitle ?? null,
        description: s.description,
        image_url: await upload(s.image),
        features: s.features ?? [],
        featured: s.featured ?? false,
        sort_order: i,
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
  }

  console.log("→ portfolio projects");
  for (const [i, p] of portfolioItems.entries()) {
    const images: string[] = [];
    for (const img of p.images ?? [p.coverImage]) images.push(await upload(img));
    const { error } = await db.from("portfolio_projects").upsert(
      {
        slug: p.id,
        title: p.title,
        category: p.category,
        location: p.location ?? null,
        event_date: p.date ?? null,
        description: p.description,
        cover_url: await upload(p.coverImage),
        images,
        video_url: p.videoUrl ?? null,
        featured: p.featured ?? false,
        sort_order: i,
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
  }

  console.log("→ testimonials");
  // no natural unique key — clear and re-insert to keep re-runs idempotent
  await db.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  for (const [i, t] of testimonials.entries()) {
    const { error } = await db.from("testimonials").insert({
      quote: t.quote,
      author: t.author,
      role: t.role,
      location: t.location,
      event: t.event,
      image_url: t.image ? await upload(t.image) : null,
      sort_order: i,
    });
    if (error) throw error;
  }

  console.log("→ team members");
  await db.from("team_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  for (const [i, m] of team.entries()) {
    const { error } = await db.from("team_members").insert({
      name: m.name,
      role: m.role,
      bio: m.bio,
      image_url: await upload(m.image),
      sort_order: i,
    });
    if (error) throw error;
  }

  console.log(`✔ Seed complete — ${uploaded.size} files uploaded to "${BUCKET}"`);
}

main().catch((e) => {
  console.error("✖ Seed failed:", e.message ?? e);
  process.exit(1);
});
