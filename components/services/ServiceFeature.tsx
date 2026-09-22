"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { ServiceItem } from "@/types";
import { ServiceIcon } from "@/components/services/serviceIcons";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

interface ServiceFeatureProps {
  service: ServiceItem;
  index: number;
}

export function ServiceFeature({ service, index }: ServiceFeatureProps) {
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <section
      id={service.id}
      className={cn(
        "relative py-20 lg:py-28 scroll-mt-24 border-b border-linen overflow-hidden",
        reversed ? "bg-ivory" : "bg-white"
      )}
    >
      {/* Faint index watermark */}
      <span
        aria-hidden
        className={cn(
          "absolute -top-6 font-serif text-[12rem] lg:text-[16rem] leading-none text-purple/[0.035] select-none pointer-events-none",
          reversed ? "right-6" : "left-6"
        )}
      >
        {num}
      </span>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Image ───────────────────────────────────────────────────── */}
          {/* The in-view observer lives on this unclipped wrapper: a fully clipped
              element has a zero-area box and never intersects, so the wipe would
              never start if it observed itself. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={cn("lg:col-span-6 relative group", reversed && "lg:order-2")}
          >
            <motion.div
              variants={{
                hidden: { clipPath: reversed ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
                show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE } },
              }}
              className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl"
            >
              <motion.div
                variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: { duration: 1.5, ease: EASE } } }}
                className="absolute inset-0"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-purple/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />

              {/* Icon badge */}
              <span className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-purple flex items-center justify-center shadow-md">
                <ServiceIcon id={service.id} size={18} strokeWidth={1.6} />
              </span>
            </motion.div>

            {/* Offset frame accent */}
            <span
              aria-hidden
              className={cn(
                "absolute -z-10 inset-0 border border-purple/25 transition-transform duration-700",
                reversed ? "translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6" : "-translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6"
              )}
            />
          </motion.div>

          {/* ── Content ─────────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={cn("lg:col-span-6 space-y-6", reversed && "lg:order-1")}
          >
            <motion.div variants={rise} className="flex items-center gap-4">
              <span className="font-serif text-3xl text-purple/60 font-light leading-none">{num}</span>
              <span className="w-10 h-px bg-purple/40" />
              {service.subtitle && (
                <span className="text-[11px] uppercase tracking-[0.3em] text-purple font-medium">{service.subtitle}</span>
              )}
            </motion.div>

            <motion.h2 variants={rise} className="font-serif text-4xl sm:text-5xl font-light text-ink leading-[1.08] tracking-tight">
              {service.title}
            </motion.h2>

            <motion.p variants={rise} className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl">
              {service.description}
            </motion.p>

            {service.features && service.features.length > 0 && (
              <motion.ul variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-6 border-t border-linen">
                {service.features.map((feat) => (
                  <motion.li key={feat} variants={rise} className="flex items-start gap-3 text-sm text-neutral-700 font-light">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-purple/[0.08] text-purple flex items-center justify-center shrink-0">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.div variants={rise} className="flex flex-wrap items-center gap-6 pt-4">
              <Button href="/contact" size="default" className="gap-3 group/btn">
                Request Consultation
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Link
                href="/portfolio"
                className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 hover:text-purple transition-colors border-b border-transparent hover:border-purple/40 pb-0.5"
              >
                See related work
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
