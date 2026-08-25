import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the philosophy, vision, and craftsmanship behind Eterna, world-renowned luxury event and wedding planners.",
};

export default function AboutPage() {
  return (
    <main className="pt-28 pb-12">
      <div className="py-16 bg-[#FAF8F5] border-b border-[#EAE5DE]">
        <Container size="default" className="text-center">
          <SectionHeading
            tag="Our Story"
            title="The Art of Timeless Celebration"
            description="Dedicated to orchestrating extraordinary milestone celebrations with architectural elegance and bespoke grace."
          />
        </Container>
      </div>
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}
