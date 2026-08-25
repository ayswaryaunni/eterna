import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/common/Button";
import { services } from "@/data/services";

export function ServicesPreview() {
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <Container size="wide">
        <SectionHeading
          tag="Curated Offerings"
          title="Bespoke Event & Wedding Services"
          description="Tailored services designed to bring refined elegance and meticulous execution to every chapter of your celebration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/services" variant="outline" size="default">
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
