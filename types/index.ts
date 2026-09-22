export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "instagram" | "pinterest" | "facebook" | "linkedin";
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location?: string;
  date?: string;
  description: string;
  coverImage: string;
  images?: string[];
  videoUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  features?: string[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  /** One or more selected event types */
  eventTypes: string[];
  eventDate: string;
  location: string;
  message: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  /** Storage URLs managed in Supabase → site_settings */
  homeHeroImage?: string;
  homeHeroVideo?: string;
  aboutHeroImage?: string;
  showcaseVideo?: string;
  contactHeroImage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  event: string;
  image?: string;
}
