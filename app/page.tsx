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
import { galleryImages, pageMedia } from "@/lib/media";

// Content is edited in Supabase; re-render at most once a minute.
export const revalidate = 60;

export default async function HomePage() {
  const [site, services, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
    getTestimonials(),
  ]);

  const media = pageMedia(site);
  // Gallery strip: only photos not already shown elsewhere on the site
  const gallery = galleryImages(projects, media, [
    site.homeHeroImage,
    site.aboutHeroImage,
    site.contactHeroImage,
    ...services.map((s) => s.image),
  ]);

  return (
    <main>
      <Hero imageUrl={site.homeHeroImage} videoUrl={site.homeHeroVideo} />
      <HomeAboutSection images={media.homeAtelier} />
      <ServicesPreview services={services} />
      <ShowcaseVideo videoUrl={site.showcaseVideo} posterUrl={media.showcasePoster} />
      <PortfolioPreview items={projects} />
      <HeroGalleryShowcase images={gallery} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA />
    </main>
  );
}
