import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { HeroSection } from "@/components/common/HeroSection";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { ContactCTA } from "@/components/home/ContactCTA";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our gallery of past destination weddings, French chateau galas, and bespoke luxury celebrations.",
};

export default function PortfolioPage() {
  return (
    <main className="">
{/* Hero Section */}
      <HeroSection
        image="/images/backgrounds/section-bg.jpg"
        tag="Curated Archive"
        title="Our Selected Works"
        description="A showcase of extraordinary love stories and bespoke celebrations crafted across the globe."
      />

      <section className="py-20 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </main>
  );
}
