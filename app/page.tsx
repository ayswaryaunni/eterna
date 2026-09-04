import React from "react";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { HeroGalleryShowcase } from "@/components/home/HeroGalleryShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <HeroGalleryShowcase />
      <TestimonialsSection />
      <ContactCTA />
    </main>
  );
}
