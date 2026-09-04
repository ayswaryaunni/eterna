import React from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";

import Image from "next/image";

export function ContactCTA() {
  return (
    <section className="relative py-28 overflow-hidden text-white text-center">
      {/* Background Image with Deep Luxury Purple Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/portfolio/lake-como-wedding.jpg"
          alt="Eterna Atelier luxury backdrop"
          fill
          className="object-cover object-center opacity-25 filter saturate-[0.8]"
          sizes="100vw"
        />
        {/* Soft Radial Vignette Gradient featuring #4D004D brand purple */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#4D004D]/90 to-[#141414]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4D004D]/60 via-[#2A002A]/90 to-[#0F0F0F]" />
      </div>

      {/* Elegant Frame Lines */}
      <div className="absolute inset-x-8 top-6 bottom-6 border border-[#C5A880]/15 pointer-events-none hidden md:block" />

      <Container size="default" className="relative z-10">
        <FadeIn className="max-w-2xl mx-auto space-y-7">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-px bg-[#C5A880]/50" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-light">
              Begin Your Journey
            </span>
            <span className="w-6 h-px bg-[#C5A880]/50" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light leading-[1.15] text-white tracking-tight">
            Let Us Craft Your Next Masterpiece
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
            We accept a limited number of commissions each year to ensure uncompromising
            devotion to every client. Inquire today for upcoming dates.
          </p>

          <div className="pt-4">
            <Button
              href="/contact"
              size="lg"
              className="bg-[#C5A880] text-[#1A1A1A] hover:bg-white hover:text-[#4D004D] tracking-[0.25em] transition-all duration-300 shadow-xl"
            >
              Request a Consultation
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
