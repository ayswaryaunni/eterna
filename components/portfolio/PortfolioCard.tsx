"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${item.id}`}
      aria-label={`View ${item.title} gallery`}
      className={cn(
        "group relative block bg-charcoal overflow-hidden border border-linen aspect-[4/5] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple",
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" />

      {/* Always Visible Category & Location Badge at Top */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-mauve font-light z-10">
        <span className="bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
          {item.category}
        </span>
        {item.location && (
          <span className="text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
            {item.location}
          </span>
        )}
      </div>

      {/* Content Container - Animated Reveal on Hover */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
        {/* Title always visible, moves up slightly on hover */}
        <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-2">
          {item.title}
        </h3>

        {/* Hidden Details Container - Expands and Fades In on Hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden space-y-4 pt-2">
            <p className="text-xs text-white/80 font-light leading-relaxed">
              {item.description}
            </p>

            <div className="pt-2 border-t border-white/20">
              <span className="inline-flex text-[11px] tracking-[0.22em] uppercase text-mauve font-medium group-hover:text-white transition-colors items-center gap-2">
                <span>View Full Gallery</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
