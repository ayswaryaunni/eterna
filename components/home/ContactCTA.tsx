import React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { FadeIn } from "@/components/common/FadeIn";
import { getSiteSettings } from "@/lib/content";

/* Delicate botanical line-art used as a corner ornament (mirrored on the right) */
function LeafOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      {/* main stem */}
      <path d="M20 350 C 60 260, 120 180, 220 40" />
      {/* leaves along the stem */}
      <path d="M62 262 C 30 240, 24 200, 46 172 C 78 194, 82 236, 62 262 Z" />
      <path d="M98 208 C 66 190, 58 150, 80 122 C 112 142, 118 184, 98 208 Z" />
      <path d="M138 158 C 108 138, 104 98, 128 72 C 158 94, 162 134, 138 158 Z" />
      <path d="M180 108 C 152 86, 150 46, 176 22 C 204 46, 206 86, 180 108 Z" />
      <path d="M92 292 C 122 274, 160 282, 178 310 C 148 328, 110 320, 92 292 Z" />
      <path d="M128 240 C 158 224, 196 232, 214 260 C 184 278, 146 270, 128 240 Z" />
      <path d="M166 190 C 196 174, 234 182, 252 210 C 222 228, 184 220, 166 190 Z" />
      {/* leaf veins */}
      <path d="M46 172 L 62 262 M80 122 L 98 208 M128 72 L 138 158 M176 22 L 180 108" strokeOpacity="0.6" />
      <path d="M92 292 L 178 310 M128 240 L 214 260 M166 190 L 252 210" strokeOpacity="0.6" />
    </svg>
  );
}

export async function ContactCTA() {
  const siteConfig = await getSiteSettings();
  return (
    <section className="relative py-28 sm:py-36 bg-ivory overflow-hidden text-center border-t border-linen">
      {/* Corner ornaments */}
      <LeafOrnament className="absolute -bottom-10 -left-8 w-56 sm:w-72 lg:w-80 text-mauve/40 pointer-events-none" />
      <LeafOrnament className="absolute -top-10 -right-8 w-56 sm:w-72 lg:w-80 text-mauve/40 pointer-events-none rotate-180" />

      {/* Soft plum glow behind the headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-purple/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <Container size="default" className="relative z-10">
        <FadeIn className="max-w-3xl mx-auto space-y-7">
          <span className="text-[11px] uppercase tracking-[0.35em] text-purple font-medium">
            Let&apos;s Create Something Timeless
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-ink tracking-tight">
            Ready to craft your
            <br />
            <span className="italic text-purple">next masterpiece?</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-light max-w-lg mx-auto leading-relaxed">
            We accept a limited number of commissions each year to ensure uncompromising
            devotion to every client. We would love to be part of your journey.
          </p>

          <div className="pt-3">
            <Button href="/contact" size="lg" className="gap-3 group">
              Request a Consultation
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>

          {/* Direct concierge lines */}
          {/* <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs tracking-[0.15em] uppercase text-neutral-500 font-light">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-purple transition-colors border-b border-transparent hover:border-purple/40 pb-0.5"
            >
              {siteConfig.email}
            </a>
            <span className="hidden sm:block w-px h-4 bg-linen" />
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
              className="hover:text-purple transition-colors border-b border-transparent hover:border-purple/40 pb-0.5"
            >
              {siteConfig.phone}
            </a>
          </div> */}
        </FadeIn>
      </Container>
    </section>
  );
}
