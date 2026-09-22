import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AboutPreview } from "@/components/home/AboutPreview";
// import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutProcess } from "@/components/about/AboutProcess";
import { AboutTeam } from "@/components/about/AboutTeam";
import { InfiniteMarquee } from "@/components/common/InfiniteMarquee";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getSiteSettings, getTeam } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the philosophy, vision, and craftsmanship behind Eterna, world-renowned luxury event and wedding planners.",
};

export default async function AboutPage() {
  const [site, team] = await Promise.all([getSiteSettings(), getTeam()]);
  return (
    <main>
      {/* Editorial Luxury Hero Header */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-40 pb-32 text-white text-center">
        {/* Background Image - Bright Luxury View with Targeted Text-Area Contrast */}
        <div className="absolute inset-0 z-0">
          <Image
            src={site.aboutHeroImage ?? "/images/about-hero.jpg"}
            alt="Eterna Atelier — The Art of Timeless Celebration"
            fill
            priority
            className="object-cover object-center opacity-100"
            sizes="100vw"
          />
          {/* Subtle Top Navbar Gradient & Soft Center Spotlight Vignette for 100% Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-onyx" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.65)_0%,_rgba(0,0,0,0.3)_60%,_transparent_100%)]" />
        </div>

        <Container size="default" className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-mauve" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-mauve font-semibold drop-shadow">
              Our Story & Vision
            </span>
            <span className="w-8 h-px bg-mauve" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-[1.15] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            The Art of Timeless<br />
            <span className="italic font-light text-mauve-light">Celebration & Grandeur</span>
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Dedicated to orchestrating extraordinary milestone celebrations with architectural elegance, poetic romance, and bespoke grace.
          </p>
        </Container>
      </section>

      {/* 1. Main Atelier Story (Editorial Grid) */}
      <AboutPreview />

      {/* 2. Infinite Ticker Tape Marquee */}
      <InfiniteMarquee />

      {/* 3. Guiding Philosophy (Offset Dark Floating Cards) */}
      {/* <AboutPhilosophy /> */}

      {/* 4. Bespoke Process (Connecting Horizontal Timeline) */}
      <AboutProcess />

      {/* 5. Leadership Atelier (Alternating Split Cards) */}
      <AboutTeam team={team} />

      {/* 6. Contact Consultation CTA */}
      <ContactCTA />
    </main>
  );
}
