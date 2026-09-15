"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/common/Container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000 })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-[60px] bg-background-light text-white overflow-hidden">
      {/* Ambient Glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C5A880]/10 blur-[140px] rounded-full pointer-events-none" /> */}

      <Container size="wide" className="relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-light block mb-1">
            Client Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-primary-text tracking-tight">
            Words of Distinction
          </h2>
        </div>

        {/* Embla Carousel */}
        <div className="max-w-4xl mx-auto">
          {/* Viewport */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((current) => (
                <div key={current.id} className="flex-[0_0_100%] min-w-0 mr-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-theme-background border border-border-dark p-6 sm:p-8 backdrop-blur-md relative h-full">
                    {/* Image Side - Landscape low height aspect [16/10] */}
                    {current.image && (
                      <div className="md:col-span-4 relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border border-border-dark group">
                        <Image
                          src={current.image}
                          alt={current.author}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2 text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-light bg-black/50 backdrop-blur-md px-2 py-0.5 border border-white/10 w-fit">
                          {current.event}
                        </div>
                      </div>
                    )}

                    {/* Quote Details Side */}
                    <div className="md:col-span-8 space-y-4">
                      <p className="font-serif text-base sm:text-xl text-neutral-200 font-light leading-relaxed italic">
                        &ldquo;{current.quote}&rdquo;
                      </p>

                      <div className="pt-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-serif text-lg text-[#C5A880]">
                            {current.author}
                          </h4>
                          <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-light mt-0.5">
                            {current.role} · <span className="text-[#C5A880]/80">{current.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border-dark text-main-text hover:text-eterna-primary hover:border-eterna-primary hover:bg-eterna-primary/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* <div className="flex items-center justify-center gap-2.5">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === selectedIndex
                      ? "w-8 bg-[#C5A880]"
                      : "w-2.5 bg-neutral-800 hover:bg-neutral-600 cursor-pointer"
                  }`}
                />
              ))}
            </div> */}

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border-dark text-main-text hover:text-eterna-primary hover:border-eterna-primary hover:bg-eterna-primary/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}