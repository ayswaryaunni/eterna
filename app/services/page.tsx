import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ContactCTA } from "@/components/home/ContactCTA";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of bespoke services including full-service wedding planning, destination celebrations, event design, and private galas.",
};

export default function ServicesPage() {
  return (
    <main className="pt-28 pb-12">
      <div className="py-16 bg-[#FAF8F5] border-b border-[#EAE5DE]">
        <Container size="default" className="text-center">
          <SectionHeading
            tag="Curated Offerings"
            title="Our Bespoke Services"
            description="From intimate destination celebrations to grand multi-day estate weddings, we craft unforgettable experiences."
          />
        </Container>
      </div>

      <section className="py-20 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </main>
  );
}
