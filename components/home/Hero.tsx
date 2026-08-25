"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">

      {/* ── Background Image (dark editorial) ────────────────────────────────── */}
      <Image
        src="/images/portfolio/manhattan-gala.jpg"
        alt="Eterna — Luxury Wedding & Event Atelier"
        fill
        priority
        className="object-cover object-center opacity-45"
        sizes="100vw"
      />

      {/* ── Video overlay (when file is added, plays on top of image) ───────────
          Place at: /public/videos/hero-wedding.mp4
      ─────────────────────────────────────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/videos/wedding-ceremony.mp4"
      />

      {/* ── Dark gradient overlay: heavy at bottom, subtle at top ─────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/20" />
      {/* ── Left vignette for editorial depth ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* ── Hero Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-16 sm:pb-24">

        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#C5A880] mb-5 font-light"
        >
          Luxury Wedding &amp; Event Atelier
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-serif font-light text-white leading-[1.07] tracking-tight mb-9"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
        >
          Crafting Timeless<br />
          Celebrations of<br />
          Love &amp; Grandeur
        </motion.h1>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="w-12 h-px bg-[#C5A880] mb-8"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-wrap items-center gap-4 sm:gap-7"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-3 bg-white text-[#1A1A1A] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#C5A880] hover:text-white transition-colors duration-300"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors duration-300"
          >
            Begin Planning
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 right-10 hidden sm:flex flex-col items-center gap-2.5"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/15" />
      </motion.div>

    </section>
  );
}
