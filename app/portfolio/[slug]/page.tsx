import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { HeroSection } from "@/components/common/HeroSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.id === slug);

  if (!item) {
    return { title: "Work Not Found" };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.id === slug);

  if (!item) {
    notFound();
  }

  const galleryImages =
    item.images && item.images.length > 0 ? item.images : [item.coverImage];

  return (
    <main className="pt-24 pb-12">
      {/* Hero Section - no background image */}
      <HeroSection
        tag={item.category}
        title={item.title}
        description={item.coupleName}
      />

      {/* Couple Header & Gallery */}
      <section className="py-20 bg-white">
        <Container size="wide">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="font-serif font-thin text-3xl sm:text-4xl text-primary-text leading-tight">
              {item.coupleName}
            </h2>
            {item.location && (
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                {item.location}
              </p>
            )}
            {item.date && (
              <p className="mt-1 text-sm text-main-text font-light">
                {item.date}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {galleryImages.map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative overflow-hidden bg-[#141414]",
                  index === 0
                    ? "aspect-[16/9] md:col-span-2"
                    : "aspect-[4/5]"
                )}
              >
                <Image
                  src={src}
                  alt={`${item.title} - image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </main>
  );
}