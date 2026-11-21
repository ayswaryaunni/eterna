import type { PortfolioItem, SiteConfig } from "@/types";

/*
 * One place that decides which photo goes where, so no photo shows up in two
 * places on the site.
 *
 * Every slot is editable in Supabase → site_settings (migration 0004_page_media).
 * DEFAULT_SLOTS are the bundled fallbacks, used when a column is empty or the
 * migration hasn't run yet; the seed script uploads them to Storage and fills
 * the columns. Hero images, service images and project covers have their own
 * columns/tables. The home gallery strip then gets whatever is left.
 *
 * When changing a slot, pick a photo that is not used anywhere else — the
 * gallery filters out duplicates automatically, the fixed slots do not.
 */

const ev = (slug: string, file: string) => `/images/events/${slug}/${file}`;

export const DEFAULT_SLOTS = {
  /** Home "The Atelier" block: large 16:10 + floating 4:5.
   *  [0] is a crop with the subject on the left — its right half sits under the floating [1]. */
  homeAtelier: ["/images/site/home-atelier.jpg", ev("aksa-jinu", "aja05207.jpg")],
  /** About page preview block: 4:3 left, 3:4 right */
  aboutPreview: [ev("ruba-manoop", "dsc00876.jpg"), ev("ruba-manoop", "dsc09226.jpg")],
  /** Portfolio page hero collage — one alternate shot per featured project, in project order */
  portfolioHero: [ev("ruba-manoop", "16.jpg"), ev("jincy-sinu", "aja09937.jpg"), ev("aksa-jinu", "aja05175.jpg")],
  /** Contact page office tiles */
  contactOffices: [ev("ashik-afna", "21.jpg"), ev("jincy-sinu", "aja09876.jpg"), ev("ruba-manoop", "dsc09107.jpg")],
  /** Poster for the home showcase reel = its opening frame (scripts/make_showcase_video.sh) */
  showcasePoster: "/videos/showcase-highlights.jpg",
  /** Services page reel + its poster */
  servicesVideo: "/videos/event-planning.mp4",
  servicesPoster: ev("ruba-manoop", "dsc09013.jpg"),
};

export type PageMedia = typeof DEFAULT_SLOTS;

/** A list column counts only when it is filled for every position the layout needs. */
const list = (fromDb: string[] | undefined, fallback: string[]) =>
  fromDb && fromDb.length >= fallback.length && fromDb.every(Boolean) ? fromDb : fallback;

/** Resolve every page slot: Supabase value when set, bundled default otherwise. */
export function pageMedia(site: SiteConfig): PageMedia {
  return {
    homeAtelier: list(site.homeAtelierImages, DEFAULT_SLOTS.homeAtelier),
    aboutPreview: list(site.aboutPreviewImages, DEFAULT_SLOTS.aboutPreview),
    portfolioHero: list(site.portfolioHeroImages, DEFAULT_SLOTS.portfolioHero),
    contactOffices: list(site.contactOfficeImages, DEFAULT_SLOTS.contactOffices),
    showcasePoster: site.showcasePoster || DEFAULT_SLOTS.showcasePoster,
    servicesVideo: site.servicesVideo || DEFAULT_SLOTS.servicesVideo,
    servicesPoster: site.servicesPoster || DEFAULT_SLOTS.servicesPoster,
  };
}

/** Originals that the cropped site images (public/images/site/*) were cut from. */
const SITE_CROP_SOURCES = [
  ev("ruba-manoop", "11.jpg"),
  ev("jincy-sinu", "aja09770.jpg"),
  ev("aksa-jinu", "aja05907.jpg"),
  ev("ashik-afna", "19.jpg"),
];

/**
 * Compare local paths and Supabase Storage URLs by their tail:
 * "/images/events/x/1.jpg" and ".../object/public/media/events/x/1.jpg" → "events/x/1.jpg".
 */
const key = (src: string) => (src.split("?")[0].match(/\/(?:images|media)\/(.+)$/)?.[1] ?? src).toLowerCase();

const slotImages = (m: PageMedia) => [
  ...m.homeAtelier,
  ...m.aboutPreview,
  ...m.portfolioHero,
  ...m.contactOffices,
  m.showcasePoster,
  m.servicesPoster,
];

/**
 * Home gallery strip: every project photo not already used on the site
 * (covers, services, heroes, page slots), interleaved so each couple appears.
 */
export function galleryImages(projects: PortfolioItem[], media: PageMedia, alsoUsed: (string | undefined)[]): string[] {
  const used = new Set(
    [...slotImages(DEFAULT_SLOTS), ...slotImages(media), ...SITE_CROP_SOURCES, ...projects.map((p) => p.coverImage), ...alsoUsed]
      .filter(Boolean)
      .map((s) => key(s!))
  );
  const perProject = projects.map((p) => (p.images ?? []).filter((src) => !used.has(key(src))));
  const longest = Math.max(0, ...perProject.map((imgs) => imgs.length));
  const out: string[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < longest; i++) {
    for (const imgs of perProject) {
      const src = imgs[i];
      if (src && !seen.has(key(src))) {
        seen.add(key(src));
        out.push(src);
      }
    }
  }
  return out;
}
