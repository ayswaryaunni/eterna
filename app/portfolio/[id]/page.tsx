import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Tag } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/FadeIn";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ContactCTA } from "@/components/home/ContactCTA";
import { portfolioItems } from "@/data/portfolio";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: { title: item.title, description: item.description, images: [item.coverImage] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const index = portfolioItems.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const item = portfolioItems[index];
  const images = item.images?.length ? item.images : [item.coverImage];
  const prev = portfolioItems[(index - 1 + portfolioItems.length) % portfolioItems.length];
  const next = portfolioItems[(index + 1) % portfolioItems.length];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="pb-12">
      {/* ── Editorial header ─────────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-12 bg-ivory border-b border-linen">
        <Container size="wide">
          <FadeIn>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-500 hover:text-purple transition-colors"
            >
              <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to archive
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end mt-10">
            <div className="lg:col-span-8">
              <FadeIn delay={0.05}>
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium">
                  <span className="w-8 h-px bg-purple" />
                  Story {pad(index + 1)} / {pad(portfolioItems.length)}
                </span>
              </FadeIn>
              <FadeIn delay={0.12}>
                <h1
                  className="font-serif font-light text-ink leading-[1.05] tracking-tight mt-5"
                  style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)" }}
                >
                  {item.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl mt-6">
                  {item.description}
                </p>
              </FadeIn>
            </div>

            {/* Meta */}
            <FadeIn delay={0.28} className="lg:col-span-4">
              <dl className="bg-white border border-linen divide-y divide-linen">
                <div className="flex items-center gap-4 px-6 py-4">
                  <Tag size={15} className="text-purple shrink-0" />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Category</dt>
                    <dd className="font-serif text-base text-ink mt-0.5">{item.category}</dd>
                  </div>
                </div>
                {item.location && (
                  <div className="flex items-center gap-4 px-6 py-4">
                    <MapPin size={15} className="text-purple shrink-0" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Location</dt>
                      <dd className="font-serif text-base text-ink mt-0.5">{item.location}</dd>
                    </div>
                  </div>
                )}
                {item.date && (
                  <div className="flex items-center gap-4 px-6 py-4">
                    <CalendarDays size={15} className="text-purple shrink-0" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Date</dt>
                      <dd className="font-serif text-base text-ink mt-0.5">{item.date}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Cover ────────────────────────────────────────────────────────── */}
      <section className="bg-ivory">
        <Container size="wide" className="py-8">
          <FadeIn>
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-linen">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/40 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-linen">
        <Container size="wide">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="text-[11px] uppercase tracking-[0.35em] text-purple font-medium">The Gallery</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink mt-3">
                  Captured <span className="italic text-purple">Moments</span>
                </h2>
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                {pad(images.length)} Photographs · Click to view
              </p>
            </div>
          </FadeIn>
          <ProjectGallery images={images} title={item.title} />
        </Container>
      </section>

      {/* ── Prev / Next project ──────────────────────────────────────────── */}
      <section className="bg-ivory-dark border-t border-linen">
        <Container size="wide" className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-linen">
          <Link href={`/portfolio/${prev.id}`} className="group relative flex items-center gap-6 py-10 md:pr-10 overflow-hidden">
            <div className="relative w-24 h-16 sm:w-32 sm:h-20 overflow-hidden shrink-0 bg-linen">
              <Image src={prev.coverImage} alt={prev.title} fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500 group-hover:text-purple transition-colors">
                <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" /> Previous story
              </span>
              <p className="font-serif text-xl sm:text-2xl text-ink mt-1 truncate">{prev.title}</p>
            </div>
          </Link>
          <Link href={`/portfolio/${next.id}`} className="group relative flex items-center justify-end gap-6 py-10 md:pl-10 text-right overflow-hidden">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500 group-hover:text-purple transition-colors">
                Next story <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <p className="font-serif text-xl sm:text-2xl text-ink mt-1 truncate">{next.title}</p>
            </div>
            <div className="relative w-24 h-16 sm:w-32 sm:h-20 overflow-hidden shrink-0 bg-linen">
              <Image src={next.coverImage} alt={next.title} fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </Link>
        </Container>
      </section>

      <ContactCTA />
    </main>
  );
}
