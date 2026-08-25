"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FAF8F5]">
      {/* Subtle luxury ambient pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]" />

      <Container size="default" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#B8976C] font-medium block">
            Haute Wedding & Event Atelier
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] leading-[1.1] tracking-tight">
            Crafting Timeless Celebrations of Love & Grandeur
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
            Bespoke wedding planning, destination celebrations, and extraordinary
            event design for discerning couples worldwide.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/portfolio" size="lg" variant="primary">
              Explore Our Work
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Begin Planning
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
