import React from "react";
import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceFeature } from "@/components/services/ServiceFeature";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ContactCTA } from "@/components/home/ContactCTA";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of bespoke services including full-service wedding planning, destination celebrations, event design, and private galas.",
};

export default function ServicesPage() {
  return (
    <main className="pb-12">
      <ServicesHero />

      {services.map((service, index) => (
        <ServiceFeature key={service.id} service={service} index={index} />
      ))}

      <ServiceProcess />

      <ContactCTA />
    </main>
  );
}
