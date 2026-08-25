import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
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
    <main className="pt-28 pb-12">
      <div className="py-16 bg-[#FAF8F5] border-b border-[#EAE5DE]">
        <Container size="default" className="text-center">
          <SectionHeading
            tag="Curated Archive"
            title="Our Selected Works"
            description="A showcase of extraordinary love stories and bespoke celebrations crafted across the globe."
          />
        </Container>
      </div>

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
