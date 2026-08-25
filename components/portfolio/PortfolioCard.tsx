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
    <article
      className={cn(
        "group block bg-[#FAF8F5] overflow-hidden border border-[#EAE5DE] transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
      </div>

      <div className="p-6 sm:p-8 space-y-3">
        <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#B8976C] font-medium">
          <span>{item.category}</span>
          {item.location && <span className="text-neutral-500">{item.location}</span>}
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] group-hover:text-[#B8976C] transition-colors leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-neutral-600 font-light line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex text-xs tracking-[0.18em] uppercase text-[#1A1A1A] font-medium group-hover:text-[#B8976C] transition-colors items-center gap-1"
          >
            Inquire About This Style →
          </Link>
        </div>
      </div>
    </article>
  );
}
