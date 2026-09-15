import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";
import { services } from "@/data/services";

export function ServicesPreview() {
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-[60px] bg-primary-background">
      <Container size="wide">

        {/* ── Section Heading ─────────────────────────────────────────────── */}
        <FadeIn>
          <SectionHeading
            tag="Curated Offerings"
            title="Bespoke Event & Wedding Services"
            description="Tailored services designed to bring refined elegance and meticulous execution to every chapter of your celebration."
          />
        </FadeIn>

        {/* ── Cinematic Video Banner ────────────────────────────────────────
            Place video at: /public/videos/services-reel.mp4
            Free source:    https://www.pexels.com/search/videos/luxury+event/
        ──────────────────────────────────────────────────────────────────── */}
        <FadeIn delay={0.1} className="mb-14">
          <div className="relative w-full aspect-[21/8] overflow-hidden bg-neutral-900">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/portfolio/chateau-wedding.jpg"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              src="/videos/services-reel.mp4"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            {/* Optional overlay label */}
            <div className="absolute bottom-6 left-6 sm:left-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-light">
                Eterna Events &amp; Weddings
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ── Service Cards Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.12}>
              <ServiceCard service={service} index={index} />
            </FadeIn>
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <FadeIn delay={0.3} className="mt-14 text-center">
          <Button href="/services" variant="primary" size="default">
            View All Services
          </Button>
        </FadeIn>

      </Container>
    </section>
  )
}
