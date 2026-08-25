import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";

export function AboutPreview() {
  return (
    <section className="py-24 bg-white border-y border-[#EAE5DE]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full bg-neutral-100 overflow-hidden border border-[#EAE5DE]">
            <Image
              src="/images/services/event-design.svg"
              alt="Eterna Atelier Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-8">
            <SectionHeading
              tag="The Atelier"
              title="Where Architectural Precision Meets Poetic Romance"
              description="Founded on the belief that unforgettable milestones are masterworks of art, Eterna curates immersive experiences tailored to the world's most breathtaking settings."
              align="left"
              className="mb-6"
            />

            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#EAE5DE] text-center">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] block">10+</span>
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-light">Years of Artistry</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] block">150+</span>
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-light">Bespoke Events</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] block">18+</span>
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-light">Global Destinations</span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              From historic European palaces to secluded island estates, our team coordinates
              every sensory dimension—lighting, floral architecture, gastronomy, and live music—with
              unrivaled discretion and elegance.
            </p>

            <div>
              <Button href="/about" variant="outline" size="default">
                Discover Our Story
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
