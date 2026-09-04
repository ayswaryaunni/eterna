"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

interface WordProps {
  children: string;
  range: [number, number];
  progress: any;
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#9E9E9E", "#1A1A1A"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em] transition-colors">
      {children}
    </motion.span>
  );
}

export function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.2"],
  });

  const statementText = "At Eterna, We turn weddings into unforgettable stories. Our team designs, plans, and manages every detail with care.";
  const words = statementText.split(" ");

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-y border-[#EAE5DE] relative overflow-hidden">
      <Container size="wide" className="relative z-10 space-y-12 lg:space-y-16">
        
        {/* Top Header Large Statement Typography (Word-by-word scroll lighting/brightening) */}
        <div ref={containerRef} className="max-w-5xl">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.25] tracking-tight">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>

        {/* 3-Column Layout: Left Image | Center Details | Right Tall Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Landscape Image with Rounded Corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src="/images/portfolio/amalfi-wedding.jpg"
              alt="Beach Floral Arch Ceremony"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Middle Column: Two Stacked Feature Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-4 space-y-8 lg:px-2"
          >
            <div className="space-y-2.5">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                Personalized Planning
              </h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Every wedding is tailored to reflect your unique love story. Whether it's designing breathtaking décor or coordinating elite global vendors.
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                Trusted Expertise
              </h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                With years of master craftsmanship, we ensure perfection in every moment. From architectural layouts to seamless day-of execution.
              </p>
            </div>

            <div className="pt-2">
              <Button href="/about" variant="outline" size="default" className="border-[#4D004D] text-[#4D004D] hover:bg-[#4D004D] hover:text-white rounded-full">
                Discover Our Story
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Tall Portrait Image with Rounded Corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src="/images/portfolio/chateau-wedding.jpg"
              alt="Outdoor Floral Archway"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
