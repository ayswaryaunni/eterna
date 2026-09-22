"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Pause } from "lucide-react";

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-charcoal">
      {/* ── Main Romantic Couple Background ──────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-couple.jpg"
          alt="Where forever begins beautifully together — Eterna"
          fill
          priority
          className="object-cover object-[65%_center] sm:object-center opacity-85"
          sizes="100vw"
        />
        {/* Soft Vignette Overlay: Darker on left for text readability, subtle purple tint on bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple/30 via-transparent to-transparent" />
      </div>

      {/* ── Content Container ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Headline & Narrative */}
        <div className="w-full lg:max-w-2xl xl:max-w-3xl text-left space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3"
          >
            <span className="w-8 h-px bg-champagne" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-champagne font-light">
              Eterna Atelier
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif font-light text-white leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 5.8vw, 5.5rem)" }}
          >
            Where forever<br />
            begins <span className="italic font-light text-champagne">beautifully</span><br />
            together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg"
          >
            A walkthrough of how we translate your personal love story into a visual language at Eterna Atelier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pt-2 flex items-center gap-5"
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-charcoal text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-champagne hover:text-white transition-all duration-300 shadow-lg"
            >
              Start Planning
            </Link>
            <Link
              href="/portfolio"
              className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-all"
            >
              Explore Stories
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Compact Floating Interactive Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full lg:w-[280px] xl:w-[320px] bg-white rounded-2xl p-3.5 shadow-2xl relative self-center lg:self-end border border-white/20"
        >
          {/* Card Media Preview Container */}
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-900 group">
            {/* Embedded Ambient Video */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
              src="/images/hero/6a6305bf5040b777232a1810_GG_mp4.mp4"
            />

            {/* Play/Pause Overlay Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video preview" : "Play video preview"}
              className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-black/80 transition-all cursor-pointer z-20"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
          </div>

          {/* Card Details Text */}
          <div className="pt-3 px-0.5 pb-0.5">
            <p className="text-[11px] sm:text-xs text-neutral-600 font-light leading-relaxed">
              A walkthrough of how we shape your vision and turn dreams into real.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
