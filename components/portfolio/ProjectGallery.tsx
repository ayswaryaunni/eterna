"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* Editorial rhythm: aspect ratios cycle so the grid feels curated rather than uniform */
const ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]"];

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setActive((i) => (i === null ? i : (i + d + images.length) % images.length));
    },
    [images.length]
  );

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, step]);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            type="button"
            onClick={() => {
              setDir(1);
              setActive(i);
            }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
            aria-label={`Open image ${i + 1} of ${images.length}`}
            className={cn(
              "group relative block w-full break-inside-avoid overflow-hidden bg-linen cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple",
              ASPECTS[i % ASPECTS.length]
            )}
          >
            <Image
              src={src}
              alt={`${title} — image ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-purple-dark/0 group-hover:bg-purple-dark/30 transition-colors duration-500" />
            <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 text-purple flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <Maximize2 size={14} />
            </span>
            <span className="absolute top-4 left-4 font-serif text-sm text-white/0 group-hover:text-white/90 transition-colors duration-500">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-onyx/95 backdrop-blur-sm flex flex-col"
            onClick={close}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-5 text-white/70" onClick={(e) => e.stopPropagation()}>
              <div className="min-w-0">
                <p className="font-serif text-base sm:text-lg text-white truncate">{title}</p>
                <p className="text-[11px] tracking-[0.25em] uppercase mt-0.5">
                  {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stage */}
            <div className="relative flex-1 min-h-0 px-4 sm:px-20 pb-6">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={active}
                  custom={dir}
                  initial={{ opacity: 0, x: 40 * dir, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40 * dir, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={images[active]}
                    alt={`${title} — image ${active + 1}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / next */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-ink transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-ink transition-colors cursor-pointer"
                  >
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex items-center justify-center gap-2 px-5 pb-6 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => {
                    setDir(i > active ? 1 : -1);
                    setActive(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "relative w-14 h-10 sm:w-16 sm:h-11 shrink-0 overflow-hidden transition-all duration-300 cursor-pointer",
                    i === active ? "ring-2 ring-mauve-light opacity-100" : "opacity-40 hover:opacity-80"
                  )}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
