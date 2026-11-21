import React from "react";
import { Hero } from "@/components/home/Hero";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ShowcaseVideo } from "@/components/home/ShowcaseVideo";
import { HeroGalleryShowcase } from "@/components/home/HeroGalleryShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getProjects, getServices, getSiteSettings, getTestimonials } from "@/lib/content";

// Content is edited in Supabase; re-render at most once a minute.
export const revalidate = 60;

export default async function HomePage() {
  const [site, services, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
    getTestimonials(),
  ]);

  const featured = projects.filter((p) => p.featured);
  // Gallery strip: every project photo except the covers, de-duplicated
  const covers = new Set(projects.map((p) => p.coverImage));
  const gallery = [...new Set(projects.flatMap((p) => p.images ?? []))].filter((src) => !covers.has(src));

  return (
    <main>
      <Hero imageUrl={site.homeHeroImage} videoUrl={site.homeHeroVideo} />
      <HomeAboutSection images={featured.slice(0, 2).map((p) => p.coverImage)} />
      <ServicesPreview services={services} />
      <ShowcaseVideo videoUrl={site.showcaseVideo} posterUrl={featured[1]?.coverImage} />
      <PortfolioPreview items={projects} />
      <HeroGalleryShowcase images={gallery} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA />
    </main>
  );
}
