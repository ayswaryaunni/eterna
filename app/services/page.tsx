import React from "react";
import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceFeature } from "@/components/services/ServiceFeature";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getServices, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of bespoke services including full-service wedding planning, destination celebrations, event design, and private galas.",
};

export default async function ServicesPage() {
  const [services, site] = await Promise.all([getServices(), getSiteSettings()]);
  return (
    <main className="pb-12">
      <ServicesHero services={services} videoUrl={site.showcaseVideo} posterUrl={services[2]?.image} />

      {services.map((service, index) => (
        <ServiceFeature key={service.id} service={service} index={index} />
      ))}

      <ServiceProcess />

      <ContactCTA />
    </main>
  );
}
