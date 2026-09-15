import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutProcess } from "@/components/about/AboutProcess";
import { AboutTeam } from "@/components/about/AboutTeam";
import { InfiniteMarquee } from "@/components/common/InfiniteMarquee";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the philosophy, vision, and craftsmanship behind Eterna, world-renowned luxury event and wedding planners.",
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Editorial Hero Header */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#EAE5DE]">
        <Container size="default" className="text-center">
          <SectionHeading
            tag="Our Story & Vision"
            title="The Art of Timeless Celebration"
            description="Dedicated to orchestrating extraordinary milestone celebrations with architectural elegance, poetic romance, and bespoke grace."
          />
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
      {/* <AboutTeam /> */}

      {/* 6. Contact Consultation CTA */}
      <ContactCTA />
    </main>
  );
}
