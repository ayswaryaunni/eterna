"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export function HomeAboutSection() {
  return (
    <section className="py-[100px] bg-ivory border-y border-linen relative overflow-hidden">
      {/* Subtle purple background lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="wide" className="relative z-10">
        {/* Top Header Badge & Large Typography */}
        <div className="max-w-4xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[11px] uppercase tracking-[0.35em] text-white bg-purple px-3.5 py-1 font-medium rounded-full"
          >
            The Atelier
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-ink leading-[1.1] tracking-tight"
          >
            Where Architectural Precision<br className="hidden sm:block" />
            Meets <span className="italic font-serif text-purple">Poetic Romance</span>
          </motion.h2>
        </div>

        {/* Asymmetric Overlapping Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Overlapping Dual Image Composition */}
          <div className="lg:col-span-7 relative">
            {/* Primary Large Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[16/10] w-full overflow-hidden shadow-xl border-l-4 border-purple"
            >
              <Image
                src="/images/portfolio/lake-como-wedding.jpg"
                alt="Lake Como Grandeur"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            {/* Overlapping Secondary Accent Image Box (Floating Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-10 -right-6 w-1/2 aspect-[4/5] border-4 border-ivory shadow-2xl overflow-hidden"
            >
              <Image
                src="/images/portfolio/amalfi-wedding.jpg"
                alt="Amalfi Detail"
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column: Narrative & Counter Stats Badge */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed"
            >
              Founded on the belief that unforgettable milestones are masterworks of art, Eterna curates immersive experiences tailored to the world's most breathtaking settings.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm text-neutral-500 font-light leading-relaxed"
            >
              From historic European palaces to secluded island estates, our team coordinates every sensory dimension—lighting, floral architecture, gastronomy, and live music.
            </motion.p>

            {/* Minimalist Floating Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-purple/20"
            >
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-purple block font-light">10+</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-light">Years</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-purple block font-light">150+</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-light">Events</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-purple block font-light">18+</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-light">Havens</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2"
            >
              <Button href="/about" variant="outline" size="default" className="border-purple text-purple hover:bg-purple hover:text-white">
                Discover Our Story
              </Button>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
