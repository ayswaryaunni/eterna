"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { services } from "@/data/services";
import { ServiceIcon } from "@/components/services/serviceIcons";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

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

export function ServicesHero() {
  const reduce = useReducedMotion();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative pt-36 sm:pt-40 pb-16 lg:pb-24 bg-ivory overflow-hidden border-b border-linen">
      <div className="absolute -top-40 right-0 w-[560px] h-[560px] bg-purple/[0.06] blur-[150px] rounded-full pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">

          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-8">
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
              What We Do
            </motion.span>

            <h1 className="font-serif font-light text-ink leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.9rem, 6.2vw, 5.6rem)" }}>
              <Line delay={0.15}>Crafted for</Line>
              <Line delay={0.28} className="italic text-purple">every chapter.</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md"
            >
              From intimate destination ceremonies to grand multi-day estate weddings and private galas —
              four signature services, one uncompromising standard.
            </motion.p>

            {/* Quick navigation to each service */}
            <motion.ul
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.08, delayChildren: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              {services.map((s, i) => {
                return (
                  <motion.li key={s.id} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
                    <Link
                      href={`#${s.id}`}
                      className="group flex items-center gap-4 bg-white border border-linen px-4 py-3.5 hover:border-purple/40 hover:shadow-[0_16px_40px_-20px_rgba(90,37,72,0.35)] transition-all duration-300"
                    >
                      <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0 group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                        <ServiceIcon id={s.id} size={17} strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">{pad(i + 1)}</span>
                        <span className="block font-serif text-base text-ink leading-tight truncate">{s.title}</span>
                      </span>
                      <ArrowRight size={14} className="text-neutral-400 group-hover:text-purple transition-all duration-300 group-hover:translate-x-1 shrink-0" />
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* ── Media ────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/5.6] w-full overflow-hidden shadow-2xl bg-charcoal"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/images/portfolio/chateau-wedding.jpg"
                src="/videos/services-reel.mp4"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 via-purple-dark/10 to-transparent" />

              {/* Floating stat chip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
                className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4"
              >
                <div className="bg-white/90 backdrop-blur-md border border-white/40 px-5 py-4 shadow-lg">
                  <span className="font-serif text-4xl font-light text-purple leading-none">{pad(services.length)}</span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-600 mt-1.5">Signature services</span>
                </div>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-white/80 pb-1">Eterna Atelier</span>
              </motion.div>
            </motion.div>

            {/* Vertical word list — nod to the client reference */}
            <motion.ul
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}
              className="hidden sm:flex absolute top-6 right-6 z-10 flex-col items-end gap-2.5 text-[10px] uppercase tracking-[0.35em] text-white/85 drop-shadow"
            >
              {["Weddings", "Destinations", "Design", "Galas"].map((w) => (
                <motion.li key={w} variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0 } }}>
                  {w}
                </motion.li>
              ))}
              <motion.li
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
                className="w-px h-14 bg-white/50 origin-top mt-1"
              />
            </motion.ul>

            {/* Scroll cue */}
            {!reduce && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-neutral-400"
              >
                <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-px h-8 bg-purple/40 block" />
              </motion.div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}
