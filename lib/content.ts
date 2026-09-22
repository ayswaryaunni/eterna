import { supabase } from "@/lib/supabase/server";
import type { PortfolioItem, ServiceItem, SiteConfig, TeamMember, TestimonialItem } from "@/types";
import type { PortfolioRow, ServiceRow, SiteSettingsRow, TeamMemberRow, TestimonialRow } from "@/lib/supabase/types";

/*
 * Content layer. Every function returns the same shapes the components already
 * consume (types/index.ts), so swapping data/*.ts for Supabase touches only the
 * pages, never the UI.
 */

const toService = (r: ServiceRow): ServiceItem => ({
  id: r.slug,
  title: r.title,
  subtitle: r.subtitle ?? undefined,
  description: r.description,
  image: r.image_url,
  features: r.features,
  featured: r.featured,
});

const toProject = (r: PortfolioRow): PortfolioItem => ({
  id: r.slug,
  title: r.title,
  category: r.category,
  location: r.location ?? undefined,
  date: r.event_date ?? undefined,
  description: r.description,
  coverImage: r.cover_url,
  images: r.images,
  videoUrl: r.video_url ?? undefined,
  featured: r.featured,
});

const toTestimonial = (r: TestimonialRow): TestimonialItem => ({
  id: r.id,
  quote: r.quote,
  author: r.author,
  role: r.role,
  location: r.location,
  event: r.event,
  image: r.image_url ?? undefined,
});

const toTeamMember = (r: TeamMemberRow): TeamMember => ({
  id: r.id,
  name: r.name,
  role: r.role,
  bio: r.bio,
  image: r.image_url ?? "",
});

function fail(what: string, error: { message: string }): never {
  throw new Error(`Supabase: failed to load ${what} — ${error.message}`);
}

export async function getServices(): Promise<ServiceItem[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) fail("services", error);
  return (data as ServiceRow[]).map(toService);
}

export async function getProjects(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) fail("projects", error);
  return (data as PortfolioRow[]).map(toProject);
}

export async function getProject(slug: string): Promise<PortfolioItem | null> {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error) fail(`project "${slug}"`, error);
  return data ? toProject(data as PortfolioRow) : null;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) fail("testimonials", error);
  return (data as TestimonialRow[]).map(toTestimonial);
}

export async function getTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) fail("team", error);
  return (data as TeamMemberRow[]).map(toTeamMember);
}

export async function getSiteSettings(): Promise<SiteConfig> {
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error) fail("site settings", error);
  const r = data as SiteSettingsRow;
  return {
    name: r.name,
    tagline: r.tagline,
    description: r.description,
    email: r.email,
    phone: r.phone,
    address: r.address,
    homeHeroImage: r.home_hero_image || undefined,
    homeHeroVideo: r.home_hero_video || undefined,
    aboutHeroImage: r.about_hero_image || undefined,
    showcaseVideo: r.showcase_video || undefined,
    contactHeroImage: r.contact_hero_image || undefined,
  };
}
