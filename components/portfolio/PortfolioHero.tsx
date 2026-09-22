"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import type { PortfolioItem } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* Headline line that rises out of a clipped wrapper */
function Line({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className={cn("block", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <span className="font-serif text-3xl sm:text-4xl font-light text-purple leading-none">{value}</span>
      <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mt-2">{label}</span>
    </motion.div>
  );
}

export function PortfolioHero({ items: portfolioItems }: { items: PortfolioItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Derive live figures from the data so the hero never goes stale
  const stories = portfolioItems.length;
  const countries = new Set(portfolioItems.map((p) => p.location?.split(",").pop()?.trim())).size;
  const categories = new Set(portfolioItems.map((p) => p.category)).size;
  const featured = portfolioItems.filter((p) => p.featured).slice(0, 3);

  // Scroll parallax: each photo drifts at a different rate as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={ref} className="relative pt-36 sm:pt-40 pb-20 lg:pb-28 bg-ivory overflow-hidden border-b border-linen">
      {/* Ambient plum glow */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-purple/[0.06] blur-[140px] rounded-full pointer-events-none" />

      {/* Oversized archive index watermark */}
      <span
        aria-hidden
        className="absolute -bottom-10 -right-4 font-serif text-[16rem] lg:text-[22rem] leading-none text-purple/[0.035] select-none pointer-events-none"
      >
        {pad(stories)}
      </span>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">

          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <motion.div style={{ y: textY }} className="lg:col-span-6 space-y-8">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="w-8 h-px bg-purple origin-left"
              />
              Curated Archive
            </motion.span>

            <h1 className="font-serif font-light text-ink leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.9rem, 6.2vw, 5.6rem)" }}>
              <Line delay={0.15}>Our Selected</Line>
              <Line delay={0.28} className="italic text-purple">Works</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md"
            >
              A showcase of extraordinary love stories and bespoke celebrations crafted across the globe —
              from cliffside Amalfi ceremonies to gilded Parisian galas.
            </motion.p>

            <div className="flex items-start gap-10 sm:gap-14 pt-4 border-t border-linen">
              <div className="pt-6"><Stat value={`${pad(stories)}`} label="Stories" delay={0.55} /></div>
              <div className="pt-6"><Stat value={`${pad(countries)}`} label="Countries" delay={0.65} /></div>
              <div className="pt-6"><Stat value={`${pad(categories)}`} label="Categories" delay={0.75} /></div>
            </div>

            <motion.a
              href="#works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-purple transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-linen flex items-center justify-center group-hover:border-purple transition-colors">
                <motion.span animate={reduce ? undefined : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="inline-flex">
                  <ArrowDown size={13} />
                </motion.span>
              </span>
              Explore the archive
            </motion.a>
          </motion.div>

          {/* ── Photo collage ─────────────────────────────────────────────── */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[520px] lg:h-[600px]">
            {/* A — tall, left */}
            <motion.div
              style={{ y: yA }}
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="absolute left-0 top-10 w-[54%] aspect-[4/5] overflow-hidden shadow-2xl group"
            >
              <Image src={featured[0].coverImage} alt={featured[0].title} fill priority sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block text-[9px] uppercase tracking-[0.25em] text-white/70">{featured[0].category}</span>
                <span className="block font-serif text-base sm:text-lg text-white leading-tight mt-1">{featured[0].title}</span>
              </div>
            </motion.div>

            {/* B — portrait, top right (fastest parallax) */}
            <motion.div
              style={{ y: yB }}
              initial={{ opacity: 0, y: 80, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="absolute right-0 top-0 w-[42%] aspect-[3/4] overflow-hidden shadow-xl group"
            >
              <Image src={featured[1].coverImage} alt={featured[1].title} fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-purple/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
            </motion.div>

            {/* C — landscape, bottom right, overlapping with ivory frame */}
            <motion.div
              style={{ y: yC }}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="absolute right-[6%] bottom-0 w-[46%] aspect-[4/3] overflow-hidden border-[6px] border-ivory shadow-2xl group"
            >
              <Image src={featured[2].coverImage} alt={featured[2].title} fill sizes="(max-width: 1024px) 50vw, 24vw" className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
            </motion.div>

            {/* Floating label chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
              className="absolute left-[40%] bottom-[4%] z-10 bg-white/90 backdrop-blur-md border border-linen shadow-lg px-4 py-2.5"
            >
              <span className="block text-[9px] uppercase tracking-[0.25em] text-purple font-medium">Featured</span>
              <span className="block font-serif text-sm text-ink mt-0.5">{featured[2].location?.split(",").slice(-2).join(",")}</span>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
