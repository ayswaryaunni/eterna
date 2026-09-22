"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ServiceIcon } from "@/components/services/serviceIcons";
import type { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function ServicesPreview({ services }: { services: ServiceItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-24 bg-ivory overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-sm uppercase tracking-[0.35em] text-purple font-medium leading-loose"
            >
              Curated
              <br />
              Offerings
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-xs"
            >
              Tailored services designed to bring refined elegance and meticulous execution to every chapter of your celebration.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm text-purple font-medium border-b border-transparent hover:border-purple/40 pb-0.5 transition-colors"
              >
                View All Services
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ── Service tiles carousel ───────────────────────────────────── */}
          <div className="lg:col-span-9 relative">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="snap-start shrink-0"
                >
                  <Link
                    href={`/services#${service.id}`}
                    aria-label={`${service.title} — explore service`}
                    className="group relative block w-[240px] sm:w-[270px] lg:w-[300px] aspect-[3/4] overflow-hidden bg-linen focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Icon badge + index */}
                    <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-purple flex items-center justify-center shadow-md transition-colors duration-500 group-hover:bg-purple group-hover:text-white">
                      <ServiceIcon id={service.id} size={16} strokeWidth={1.6} />
                    </span>
                    <span className="absolute top-4 right-4 font-serif text-xl text-white/80 leading-none drop-shadow">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title block */}
                    <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                      {service.subtitle && (
                        <span className="block text-[9px] uppercase tracking-[0.25em] text-white/70 line-clamp-1">
                          {service.subtitle}
                        </span>
                      )}
                      <span className="block font-serif text-xl sm:text-2xl text-white leading-tight">
                        {service.title}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        Explore service <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Arrow controls — white tab in the corner */}
            <div className="absolute -bottom-3 right-0 flex items-center gap-2 bg-ivory pl-4 pt-3 rounded-tl-3xl">
              {([-1, 1] as const).map((dir) => {
                const disabled = dir === -1 ? atStart : atEnd;
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollBy(dir)}
                    disabled={disabled}
                    aria-label={dir === -1 ? "Previous services" : "Next services"}
                    className={cn(
                      "w-11 h-11 rounded-full border border-purple/40 text-purple bg-white flex items-center justify-center transition-all duration-300 cursor-pointer",
                      "hover:bg-purple hover:text-white hover:border-purple disabled:opacity-30 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-purple disabled:hover:border-purple/40"
                    )}
                  >
                    {dir === -1 ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
