/* Database row shapes (mirror supabase/migrations/0001_init.sql) */

export interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string;
  features: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface PortfolioRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string | null;
  event_date: string | null;
  description: string;
  cover_url: string;
  images: string[];
  video_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  event: string;
  image_url: string | null;
  published: boolean;
  sort_order: number;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  published: boolean;
  sort_order: number;
}

export interface SiteSettingsRow {
  id: number;
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  home_hero_image: string;
  home_hero_video: string;
  about_hero_image: string;
  showcase_video: string;
  contact_hero_image: string;
  // 0004_page_media — absent until that migration has run
  home_atelier_images?: string[];
  about_preview_images?: string[];
  portfolio_hero_images?: string[];
  contact_office_images?: string[];
  showcase_poster?: string;
  services_video?: string;
  services_poster?: string;
}

export interface EnquiryInsert {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date?: string | null;
  location?: string | null;
  message: string;
  source?: string;
}
