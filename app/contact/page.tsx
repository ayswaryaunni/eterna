import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAside } from "@/components/contact/ContactAside";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Inquire & Contact",
  description:
    "Contact Eterna to inquire about wedding planning, destination celebrations, or private event design.",
};

const officeImages = [
  "/images/portfolio/chateau-wedding.jpg",
  "/images/portfolio/manhattan-gala.jpg",
  "/images/portfolio/lake-como-wedding.jpg",
];

export default function ContactPage() {
  const offices = siteConfig.address.split("•").map((s) => s.trim());

  return (
    <main className="pb-12 bg-ivory">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="relative pt-36 sm:pt-40 pb-14 overflow-hidden border-b border-linen">
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-purple/[0.06] blur-[140px] rounded-full pointer-events-none" />
        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium">
                  <span className="w-8 h-px bg-purple" />
                  Initiate Planning
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1
                  className="font-serif font-light text-ink leading-[1.02] tracking-tight mt-5"
                  style={{ fontSize: "clamp(2.9rem, 6.2vw, 5.6rem)" }}
                >
                  Begin your
                  <br />
                  <span className="italic text-purple">bespoke journey.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-lg mt-6">
                  Share the preliminary details of your celebration. Our atelier will reach out to arrange a
                  private consultation — discreet, considered, and entirely tailored to you.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} className="lg:col-span-4 lg:justify-self-end">
              <div className="inline-flex items-center gap-4 bg-white border border-linen px-5 py-4 shadow-sm">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-purple/60 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-purple" />
                </span>
                <span>
                  <span className="block font-serif text-lg text-ink leading-tight">Accepting 2026 commissions</span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mt-0.5">Response within 24 business hours</span>
                </span>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Form + aside ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5 xl:col-span-4">
              <ContactAside />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/85 via-purple-dark/25 to-transparent" />
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
