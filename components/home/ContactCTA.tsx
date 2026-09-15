import React from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";

export function ContactCTA() {
  return (
    <section
      className="py-[60px] text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgrounds/footer-bg-image.png')" }}
    >
      <Container size="default">
        <FadeIn className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted font-medium block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl text-primary-text sm:text-5xl font-normal leading-tight">
            Let Us Craft Your Next Masterpiece
          </h2>
          <p className="text-sm sm:text-base text-main-text font-light max-w-xl mx-auto leading-relaxed">
            We accept a limited number of commissions each year to ensure uncompromising
            devotion to every client. Inquire today for upcoming dates.
          </p>
          <div className="pt-4">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
            >
              Request a Consultation
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
