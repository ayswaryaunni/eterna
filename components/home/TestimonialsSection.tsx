"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/common/Container";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this 200vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    return smoothProgress.on("change", (latest: number) => {
      if (latest < 0.33) {
        setCurrentIndex(0);
      } else if (latest < 0.66) {
        setCurrentIndex(1);
      } else {
        setCurrentIndex(2);
      }
    });
  }, [smoothProgress]);

  const current = testimonials[currentIndex];

  return (
    // Sticky Scroll-Driven Container (Pinned height 200vh so user scrolls through all 3 testimonials before proceeding)
    <section ref={targetRef} className="relative h-[200vh] bg-onyx text-white border-t border-purple/40">
      {/* Sticky Content Viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient Purple & Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple/35 blur-[160px] rounded-full pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-white bg-purple px-3.5 py-1 font-medium rounded-full mb-3 shadow-md">
              Client Reflections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
              Words of Distinction
            </h2>
            <p className="text-[10px] text-neutral-400 font-light mt-1 tracking-wider">
              (Scroll down to read all client stories)
            </p>
          </div>

          {/* Compact Balanced Testimonial Display */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-neutral-900/80 border border-purple/60 p-6 sm:p-8 backdrop-blur-md relative"
            >
              {/* Image Side - Landscape low height aspect [16/10] */}
              {current.image && (
                <div className="md:col-span-4 relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border border-purple/50 group">
                  <Image
                    src={current.image}
                    alt={current.author}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-[9px] uppercase tracking-[0.2em] text-champagne font-light bg-purple/90 backdrop-blur-md px-2 py-0.5 border border-white/10 w-fit">
                    {current.event}
                  </div>
                </div>
              )}

              {/* Quote Details Side */}
              <div className="md:col-span-8 space-y-4">
                <p className="font-serif text-base sm:text-xl text-neutral-200 font-light leading-relaxed italic">
                  "{current.quote}"
                </p>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg text-champagne">
                      {current.author}
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-light mt-0.5">
                      {current.role} · <span className="text-champagne/80">{current.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll-Synced Dynamic Progress Dots */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {testimonials.map((item, idx) => (
                <div
                  key={item.id}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === currentIndex
                      ? "w-8 bg-purple"
                      : "w-2.5 bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
