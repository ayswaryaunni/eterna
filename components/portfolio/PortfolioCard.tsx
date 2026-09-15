"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  const [firstName, secondName] = (item.coupleName ?? "").split(" and ");
  const hasCouple = Boolean(firstName && secondName);

  return (
    <Link href={`/portfolio/${item.id}`} className="block h-full">
      <article
        className={cn(
          "group relative bg-[#141414] overflow-hidden border border-[#EAE5DE] aspect-[4/5] cursor-pointer transition-shadow duration-500 hover:shadow-[0_-25px_50px_-10px_rgba(255,255,255,0.35)]",
          className
        )}
      >
      {/* Background Image with Zoom Effect */}
      <Image
        src={item.coverImage}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
      />

      {/* Dark Overlay gradient - default subtle, deeper on hover */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" /> */}

      {/* White overlay - appears on hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-85 transition-opacity duration-500 ease-out pointer-events-none" />

      {/* Couple Name - Centered, Appears on Hover */}
      {hasCouple && (
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <h3 className="font-serif uppercase font-thin text-xl sm:text-2xl text-main-text text-center leading-tight">
            {firstName}{" "}
            <span>
              &
            </span>{" "}
            {secondName}
          </h3>
        </div>
      )}

      {/* Always Visible Category & Location Badge at Top */}
      {/* <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-light z-10">
        <span className="bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
          {item.category}
        </span>
        {item.location && (
          <span className="text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
            {item.location}
          </span>
        )}
      </div> */}

      {/* Content Container - Animated Reveal on Hover */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
        {/* Title always visible, moves up slightly on hover */}
        {/* <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-2">
          {item.title}
        </h3> */}

        {/* Hidden Details Container - Expands and Fades In on Hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden space-y-4 pt-2">
            {/* <p className="text-xs text-white/80 font-light leading-relaxed">
              {item.description}
            </p> */}

            {/* <div className="pt-2 border-t border-white/20">
              <Link
                href="/portfolio"
                className="inline-flex text-[11px] tracking-[0.22em] uppercase text-[#C5A880] font-medium hover:text-white transition-colors items-center gap-2"
              >
                <span>View Full Gallery</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
}
