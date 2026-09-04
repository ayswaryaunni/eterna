"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/common/Container";
import { services } from "@/data/services";
import { Button } from "@/components/common/Button";

const serviceImageStack = [
  "/images/portfolio/amalfi-wedding.jpg",
  "/images/portfolio/lake-como-wedding.jpg",
  "/images/portfolio/chateau-wedding.jpg",
  "/images/portfolio/manhattan-gala.jpg",
];

export function InteractiveServiceShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Pin section for 300vh so scrolling steps through each service with rotating card reveal
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Card 1 rotation and position transforms (contained strictly within right container)
  const rotate1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [6, 2, -4, -8, -12]);
  const x1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -10, -25, -45, -60]);
  const y1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 10, 25, 45, 60]);

  // Card 2 rotation and position transforms
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const x2 = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 1], [60, 0, -15, -35]);
  const rotate2 = useTransform(scrollYProgress, [0.2, 0.45, 0.7, 1], [-8, 3, -2, -6]);

  // Card 3 rotation and position transforms
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const x3 = useTransform(scrollYProgress, [0.5, 0.75, 1], [70, 0, -20]);
  const rotate3 = useTransform(scrollYProgress, [0.5, 0.75, 1], [10, -3, 3]);

  // Card 4 rotation and position transforms
  const opacity4 = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]);
  const x4 = useTransform(scrollYProgress, [0.75, 1], [80, 0]);
  const rotate4 = useTransform(scrollYProgress, [0.75, 1], [-12, 5]);

  // Track current active index for text content (0 to 3)
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.28) {
        setActiveIndex(0);
      } else if (latest < 0.55) {
        setActiveIndex(1);
      } else if (latest < 0.8) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
  }, [scrollYProgress]);

  const activeService = services[activeIndex] || services[0];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FAF8F5] text-[#1A1A1A] border-y border-[#EAE5DE]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#4D004D]/5 blur-[160px] rounded-full pointer-events-none" />

        <Container size="wide" className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Dynamic Service Narrative & Bullet Details */}
            <div className="lg:col-span-6 space-y-6 pt-2 z-20">
              <motion.div
                key={`badge-${activeService.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-3"
              >
                <span className="text-[11px] uppercase tracking-[0.35em] text-white bg-[#4D004D] px-3.5 py-1 font-medium rounded-full shadow-sm">
                  0{activeIndex + 1} · {(activeService.subtitle || "Luxury Experience").slice(0, 26)}
                </span>
              </motion.div>

              <motion.h2
                key={`title-${activeService.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] leading-[1.15] tracking-tight min-h-[100px]"
              >
                {activeService.title}
              </motion.h2>

              <motion.p
                key={`desc-${activeService.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-md"
              >
                {activeService.description}
              </motion.p>

              <motion.ul
                key={`features-${activeService.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2.5 pt-1 max-w-md"
              >
                {activeService.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4D004D] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </motion.ul>

              <div className="pt-3 flex items-center gap-5">
                <Button href="/services" variant="primary" size="default">
                  Inquire For Service
                </Button>
                <span className="text-[11px] text-neutral-400 font-light uppercase tracking-widest hidden sm:inline">
                  (Scroll to view next service)
                </span>
              </div>
            </div>

            {/* Right Column: Neat Stacked & Rotating Card Animation */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] flex items-center justify-center lg:justify-end pr-4 sm:pr-8">
              
              {/* Card 1 */}
              <motion.div
                style={{ x: x1, y: y1, rotate: rotate1 }}
                className="absolute w-[240px] sm:w-[310px] aspect-[4/5] bg-white rounded-3xl p-2.5 shadow-xl border border-black/10 overflow-hidden z-10"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={serviceImageStack[0]}
                    alt="Service 1"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                style={{ opacity: opacity2, x: x2, rotate: rotate2 }}
                className="absolute w-[240px] sm:w-[310px] aspect-[4/5] bg-white rounded-3xl p-2.5 shadow-2xl border border-black/10 overflow-hidden z-20"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={serviceImageStack[1]}
                    alt="Service 2"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                style={{ opacity: opacity3, x: x3, rotate: rotate3 }}
                className="absolute w-[240px] sm:w-[310px] aspect-[4/5] bg-white rounded-3xl p-2.5 shadow-2xl border border-black/10 overflow-hidden z-30"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={serviceImageStack[2]}
                    alt="Service 3"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                style={{ opacity: opacity4, x: x4, rotate: rotate4 }}
                className="absolute w-[240px] sm:w-[310px] aspect-[4/5] bg-white rounded-3xl p-2.5 shadow-2xl border border-black/10 overflow-hidden z-40"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={serviceImageStack[3]}
                    alt="Service 4"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>

            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
