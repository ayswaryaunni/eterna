import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
  className?: string;
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const indexFormatted = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <article
      id={service.id}
      className={cn(
        "group bg-[#FAF8F5] border border-[#EAE5DE] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C5A880]/60",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {indexFormatted && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-serif px-3 py-1 text-[#1A1A1A] tracking-widest border border-neutral-200">
            {indexFormatted}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          {service.subtitle && (
            <span className="text-xs uppercase tracking-widest text-[#B8976C] font-medium block">
              {service.subtitle}
            </span>
          )}
          <h3 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#B8976C] transition-colors">{service.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            {service.description}
          </p>

          {service.features && service.features.length > 0 && (
            <ul className="pt-4 space-y-2 border-t border-[#EAE5DE]">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                  <Check size={14} className="text-[#B8976C] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 border-t border-[#EAE5DE]">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.18em] font-medium text-[#4D004D] hover:text-[#370037] transition-colors inline-flex items-center gap-1"
          >
            Request Consultation →
          </Link>
        </div>
      </div>
    </article>
  );
}
