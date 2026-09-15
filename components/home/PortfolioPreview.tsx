import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";
import { portfolioItems } from "@/data/portfolio";

export function PortfolioPreview() {
  const featuredProjects = portfolioItems.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="py-[60px] bg-primary-background">
      <Container size="wide">

        <FadeIn>
          <SectionHeading
            tag="Selected Works"
            title="Memories in the Making"
            description="A glimpse into our portfolio of international weddings, luxury private galas, and bespoke gatherings."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.12}>
              <PortfolioCard item={item} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-14 text-center">
          <Button href="/portfolio" variant="primary" size="default">
            Explore Complete Portfolio
          </Button>
        </FadeIn>

      </Container>
    </section>
  );
}
