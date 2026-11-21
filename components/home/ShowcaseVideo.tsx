import React from "react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/FadeIn";

interface ShowcaseVideoProps {
  videoUrl?: string;
  posterUrl?: string;
  label?: string;
}

/* Full-width cinematic reel — sits directly under the portfolio glimpse */
export function ShowcaseVideo({ videoUrl, posterUrl, label = "Eterna Events & Weddings" }: ShowcaseVideoProps) {
  if (!videoUrl) return null;
  return (
    <section className="pb-20 sm:pb-24 bg-ivory">
      <Container size="wide">
        <FadeIn>
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-charcoal">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={posterUrl}
              src={videoUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 sm:left-8 flex items-center gap-3">
              <span className="w-8 h-px bg-white/60" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/80 font-light">{label}</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
