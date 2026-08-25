import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { Button } from "@/components/common/Button";
import { portfolioItems } from "@/data/portfolio";

export function PortfolioPreview() {
  const featuredProjects = portfolioItems.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="py-24 bg-white border-t border-[#EAE5DE]">
      <Container size="wide">
        <SectionHeading
          tag="Selected Works"
          title="Memories in the Making"
          description="A glimpse into our portfolio of international weddings, luxury private galas, and bespoke gatherings."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/portfolio" variant="primary" size="default">
            Explore Complete Portfolio
          </Button>
        </div>
      </Container>
    </section>
  );
}
