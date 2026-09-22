import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAside } from "@/components/contact/ContactAside";
import { ContactHero } from "@/components/contact/ContactHero";
import { getProjects, getSiteSettings, getTeam } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Inquire & Contact",
  description:
    "Contact Eterna to inquire about wedding planning, destination celebrations, or private event design.",
};

export default async function ContactPage() {
  const [siteConfig, projects, team] = await Promise.all([getSiteSettings(), getProjects(), getTeam()]);
  // Hero photo from site_settings, falling back to the first featured project cover
  const heroImage = siteConfig.contactHeroImage ?? projects.find((p) => p.featured)?.coverImage ?? projects[0]?.coverImage ?? "";
  // Office tiles borrow a cover photo from the archive
  const officeImages = projects.map((p) => p.coverImage);
  const offices = siteConfig.address.split("•").map((s) => s.trim());

  return (
    <main className="pb-12 bg-ivory">
      <ContactHero siteConfig={siteConfig} team={team} imageUrl={heroImage} />

      {/* ── Form + aside ─────────────────────────────────────────────────── */}
      <section id="inquiry" className="py-20 lg:py-24 scroll-mt-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5 xl:col-span-4">
              <ContactAside siteConfig={siteConfig} />
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Offices ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-linen">
        <Container size="wide">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] uppercase tracking-[0.35em] text-purple font-medium">Our Ateliers</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink mt-3">
                  Three cities, <span className="italic text-purple">one standard</span>
                </h2>
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">Consultations by appointment</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {offices.map((office, i) => {
              const [city, region] = office.split(",").map((s) => s.trim());
              return (
                <FadeIn key={office} delay={i * 0.1}>
                  <article className="group relative aspect-[4/3] overflow-hidden bg-linen">
                    <Image
                      src={officeImages[i % officeImages.length]}
                      alt={office}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-white/70">{region}</span>
                        <span className="block font-serif text-2xl text-white leading-tight mt-1">{city}</span>
                      </div>
                      <span className="font-serif text-3xl text-white/40 font-light">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
