import React from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";

export function ContactCTA() {
  return (
    <section className="py-[60px] bg-[#141414] text-white text-center">
      <Container size="default">
        <FadeIn className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Let Us Craft Your Next Masterpiece
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            We accept a limited number of commissions each year to ensure uncompromising
            devotion to every client. Inquire today for upcoming dates.
          </p>
          <div className="pt-4">
            <Button
              href="/contact"
              size="lg"
              className="bg-[#C5A880] text-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A]"
            >
              Request a Consultation
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
