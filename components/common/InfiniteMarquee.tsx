"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function InfiniteMarquee() {
  const words = [
    "ARCHITECTURAL PRECISION",
    "POETIC ROMANCE",
    "BESPOKE PRODUCTION",
    "GLOBAL DESTINATIONS",
    "LAKE COMO",
    "AMALFI COAST",
    "PARISIAN CHÂTEAUX",
    "PRIVATE GALAS"
  ];

  return (
    <div className="py-8 bg-[#141414] text-white border-y border-neutral-800 overflow-hidden flex whitespace-nowrap select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex items-center gap-12 text-sm uppercase tracking-[0.4em] font-light text-neutral-400"
      >
        {words.concat(words).map((item, index) => (
          <React.Fragment key={index}>
            <span className="hover:text-[#C5A880] transition-colors">{item}</span>
            <span className="text-[#C5A880] font-serif text-lg">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
