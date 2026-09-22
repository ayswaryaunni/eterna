"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/common/Container";

const heroFolderImages = [
  "/images/hero/68f4fee8bf77d1636d385647_Service_02.avif",
  "/images/hero/68f7a9ec00af763bac20fb90_moment_02.avif",
  "/images/hero/68f7a9ec0ff41c408c8ccca4_moment_06.avif",
  "/images/hero/68f7a9ec2594c90df320fd2e_moment_01.avif",
  "/images/hero/68f7a9ec75ddeef8288c6569_moment_03.avif",
  "/images/hero/6a6305bf5040b777232a15c2_Gallery-image.avif",
  "/images/hero/6a6305bf5040b777232a15ee_Vision-home-two-image.avif",
  "/images/hero/6a6305bf5040b777232a15f1_Vision-home-two-image.avif",
  "/images/hero/6a6305bf5040b777232a1817_post-one-multy-image-one.avif",
  "/images/hero/6a6305bf5040b777232a182d_post-two-multy-image-one.avif",
  "/images/hero/6a6305bf5040b777232a1832_post-one-multy-image-two.avif",
  "/images/hero/6a6305bf5040b777232a1833_post-one-multy-image-three.avif",
  "/images/hero/6a6305bf5040b777232a183b_post-one-multy-image-four.avif",
  "/images/hero/6a6305bf5040b777232a183c_post-two-venue-details-image-three.avif",
  "/images/hero/6a6305bf5040b777232a1846_post-four-multy-image-one.avif",
];

const row1 = heroFolderImages.slice(0, 5);
const row2 = heroFolderImages.slice(5, 10);
const row3 = heroFolderImages.slice(10, 15);

export function HeroGalleryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Row 1 moves Left to Right on scroll
  const xRow1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  
  // Row 2 moves Right to Left on scroll
  const xRow2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  
  // Row 3 moves Left to Right on scroll
  const xRow3 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section 
      ref={containerRef} 
      className="py-24 bg-ivory text-ink overflow-hidden relative border-y border-linen"
    >
      {/* Subtle Soft Purple Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple/5 blur-[160px] rounded-full pointer-events-none" />

      <Container size="wide" className="mb-14 text-center relative z-10">
        <span className="text-[11px] uppercase tracking-[0.35em] text-mauve font-light block mb-3">
          Curated Gallery
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink tracking-tight">
          Captured Moments of Grandeur
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-lg mx-auto mt-3 leading-relaxed">
          An interactive motion showcase featuring moments from our recent wedding & event commissions.
        </p>
      </Container>

      {/* Motion Scroll Image Rows */}
      <div className="space-y-6 sm:space-y-8 relative z-10">
        
        {/* Row 1: Left to Right */}
        <motion.div style={{ x: xRow1 }} className="flex gap-4 sm:gap-6 w-[150vw] sm:w-[130vw] -ml-[15vw]">
          {row1.concat(row1).map((src, i) => (
            <div
              key={`row1-${i}`}
              className="relative w-64 sm:w-80 h-44 sm:h-56 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group border border-linen hover:border-mauve transition-all duration-500 bg-neutral-100"
            >
              <Image
                src={src}
                alt="Eterna Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Row 2: Right to Left */}
        <motion.div style={{ x: xRow2 }} className="flex gap-4 sm:gap-6 w-[150vw] sm:w-[130vw] -ml-[15vw]">
          {row2.concat(row2).map((src, i) => (
            <div
              key={`row2-${i}`}
              className="relative w-64 sm:w-80 h-44 sm:h-56 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group border border-linen hover:border-mauve transition-all duration-500 bg-neutral-100"
            >
              <Image
                src={src}
                alt="Eterna Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Row 3: Left to Right */}
        <motion.div style={{ x: xRow3 }} className="flex gap-4 sm:gap-6 w-[150vw] sm:w-[130vw] -ml-[15vw]">
          {row3.concat(row3).map((src, i) => (
            <div
              key={`row3-${i}`}
              className="relative w-64 sm:w-80 h-44 sm:h-56 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group border border-linen hover:border-mauve transition-all duration-500 bg-neutral-100"
            >
              <Image
                src={src}
                alt="Eterna Moment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
