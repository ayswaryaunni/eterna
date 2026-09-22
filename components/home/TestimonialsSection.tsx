"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/common/Container";
import { TestimonialItem } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ── Motion helpers ────────────────────────────────────────────────────── */

/** Scroll-triggered entrance for a grid cell (fade + rise + settle). */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Cursor-tracking 3D tilt with an optional soft glare that follows the pointer. */
function TiltCard({ children, className, glare = false }: { children: React.ReactNode; className?: string; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18 });
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(90,37,72,0.10), transparent 65%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={cn("relative will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}

/** Number that counts up from zero when it scrolls into view. */
function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduce, mv, to]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}

/** Quote that reveals word by word. */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.025, delayChildren: 0.25 }}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
            transition={{ duration: 0.45, ease: EASE }}
            className="inline-block"
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.p>
  );
}

/* ── Small building blocks ─────────────────────────────────────────────── */

function Stars({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("flex items-center gap-0.5", className)}
      aria-label="5 out of 5 stars"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { scale: 0, rotate: -30, opacity: 0 }, show: { scale: 1, rotate: 0, opacity: 1 } }}
          transition={{ type: "spring", stiffness: 420, damping: 16 }}
          className="inline-flex"
        >
          <Star size={13} className="fill-current" />
        </motion.span>
      ))}
    </motion.div>
  );
}

function Avatar({ item, size = 44, className }: { item: TestimonialItem; size?: number; className?: string }) {
  return (
    <div
      className={cn("relative rounded-full overflow-hidden bg-purple/10 shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {item.image && (
        <Image src={item.image} alt={item.author} fill sizes={`${size}px`} className="object-cover" />
      )}
    </div>
  );
}

/** Overlapping avatar stack that pops in one by one. */
function AvatarStack({ items, size, ring, spacing = "-space-x-3" }: { items: TestimonialItem[]; size: number; ring: string; spacing?: string }) {
  return (
    <motion.div
      className={cn("flex", spacing)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
    >
      {items.map((t) => (
        <motion.div
          key={t.id}
          variants={{ hidden: { scale: 0, x: -8, opacity: 0 }, show: { scale: 1, x: 0, opacity: 1 } }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          <Avatar item={t} size={size} className={cn("ring-2", ring)} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function Author({ item, light = false }: { item: TestimonialItem; light?: boolean }) {
  return (
    <div className="flex items-center gap-3.5">
      <Avatar item={item} className={cn("ring-2", light ? "ring-white/30" : "ring-linen")} />
      <div className="min-w-0">
        <p className={cn("font-serif text-base leading-tight truncate", light ? "text-white" : "text-ink")}>
          {item.author}
        </p>
        <p className={cn("text-[11px] tracking-wide mt-0.5 truncate", light ? "text-white/60" : "text-neutral-500")}>
          {item.role} · {item.location}
        </p>
      </div>
    </div>
  );
}

function Pill({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium",
        light ? "bg-white/15 text-white backdrop-blur-md border border-white/20" : "bg-purple/[0.07] text-purple"
      )}
    >
      {children}
    </span>
  );
}

const tile = "rounded-3xl w-full flex-1 transition-shadow duration-500";

/* ── Tiles ─────────────────────────────────────────────────────────────── */

function PhotoTile({ item }: { item: TestimonialItem }) {
  const reduce = useReducedMotion();
  return (
    <TiltCard className="flex flex-1 group">
      <article className={cn(tile, "relative overflow-hidden min-h-[460px] lg:min-h-0 shadow-lg group-hover:shadow-2xl")}>
        {item.image && (
          // Slow Ken Burns drift so the photo never feels static
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { scale: [1, 1.08], x: ["0%", "-1.5%"] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            <Image
              src={item.image}
              alt={item.event}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-dark via-purple-dark/70 to-purple-dark/10" />
        <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end gap-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <Pill light>{item.event}</Pill>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="font-serif text-xl sm:text-2xl font-light leading-snug text-white"
          >
            “{item.quote}”
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          >
            <Author item={item} light />
          </motion.div>
        </div>
      </article>
    </TiltCard>
  );
}

function QuoteTile({ item, large = false }: { item: TestimonialItem; large?: boolean }) {
  const quoteClass = cn(
    "font-serif font-light leading-snug text-ink relative flex-1",
    large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
  );
  return (
    <TiltCard glare className="flex flex-col flex-1 group">
      <article
        className={cn(
          tile,
          "relative bg-white border border-linen p-7 sm:p-8 flex flex-col gap-6 shadow-sm group-hover:shadow-xl group-hover:border-purple/20 transition-colors"
        )}
      >
        <motion.div
          aria-hidden
          className="absolute top-6 right-6 text-purple/[0.06] pointer-events-none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote size={large ? 96 : 64} className="fill-current" />
        </motion.div>
        <div className="flex items-center justify-between gap-3 relative">
          <Stars className="text-purple" delay={0.2} />
          <Pill>{item.event}</Pill>
        </div>
        {large ? (
          <WordReveal text={item.quote} className={quoteClass} />
        ) : (
          <p className={quoteClass}>{item.quote}</p>
        )}
        <Author item={item} />
      </article>
    </TiltCard>
  );
}

function StatTile({ items }: { items: TestimonialItem[] }) {
  return (
    <TiltCard className="flex flex-col flex-1 group">
      <article className={cn(tile, "relative overflow-hidden bg-purple text-white p-7 sm:p-8 flex flex-col justify-between gap-8 shadow-lg group-hover:shadow-2xl")}>
        {/* drifting highlight */}
        <motion.div
          aria-hidden
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-mauve-light/25 blur-3xl pointer-events-none"
          animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <span className="font-serif text-6xl sm:text-7xl font-light leading-none tabular-nums">
            <CountUp to={150} />
            <span className="text-mauve-light">+</span>
          </span>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mt-3">
            Celebrations crafted worldwide
          </p>
        </div>
        <div className="relative flex items-center justify-between gap-4 pt-6 border-t border-white/15">
          <AvatarStack items={items} size={36} ring="ring-purple" />
          <div className="text-right">
            <Stars className="text-mauve-light justify-end" delay={0.4} />
            <p className="text-[11px] tracking-wide text-white/70 mt-1">5.0 average rating</p>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [photo, wide, small] = testimonials;
  if (!photo || !wide || !small) return null;

  return (
    <section className="py-24 sm:py-28 bg-ivory-dark border-y border-linen relative overflow-hidden">
      <Container size="wide" className="relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="w-8 h-px bg-purple origin-left"
              />
              Client Reflections
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink leading-[1.05] tracking-tight mt-4"
            >
              Loved by couples <span className="italic text-purple">worldwide</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="inline-flex items-center gap-3 self-start md:self-auto rounded-full bg-white border border-linen pl-2 pr-5 py-2 shadow-sm"
          >
            <AvatarStack items={testimonials} size={30} ring="ring-white" spacing="-space-x-2.5" />
            <div className="leading-tight">
              <Stars className="text-purple" delay={0.5} />
              <p className="text-[11px] text-neutral-600 mt-0.5">Rated 5.0 by our clients</p>
            </div>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 lg:auto-rows-[minmax(280px,1fr)]">
          <Reveal className="md:col-span-2 lg:col-span-1 lg:row-span-2 flex" delay={0}>
            <PhotoTile item={photo} />
          </Reveal>
          <Reveal className="md:col-span-2 flex" delay={0.12}>
            <QuoteTile item={wide} large />
          </Reveal>
          <Reveal className="flex" delay={0.24}>
            <StatTile items={testimonials} />
          </Reveal>
          <Reveal className="flex" delay={0.36}>
            <QuoteTile item={small} />
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
