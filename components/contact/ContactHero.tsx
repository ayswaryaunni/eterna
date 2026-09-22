"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import type { SiteConfig, TeamMember } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function Line({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className={cn("block", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface ContactHeroProps {
  siteConfig: SiteConfig;
  team: TeamMember[];
  imageUrl: string;
}

export function ContactHero({ siteConfig, team, imageUrl }: ContactHeroProps) {
  const reduce = useReducedMotion();
  const tel = siteConfig.phone.replace(/[^\d+]/g, "");
  const offices = siteConfig.address.split("•").map((s) => s.trim().split(",")[0]);

  const quick = [
    { icon: Mail, label: "Email the atelier", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Speak to concierge", value: siteConfig.phone, href: `tel:${tel}` },
  ];

  return (
    <section className="relative pt-36 sm:pt-40 pb-20 lg:pb-24 bg-ivory overflow-hidden border-b border-linen">
      <div className="absolute -top-40 -left-20 w-[560px] h-[560px] bg-purple/[0.06] blur-[150px] rounded-full pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">

          {/* ── Copy ─────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-8">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="w-8 h-px bg-purple origin-left"
              />
              Initiate Planning
            </motion.span>

            <h1 className="font-serif font-light text-ink leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.9rem, 6.2vw, 5.6rem)" }}>
              <Line delay={0.15}>Begin your</Line>
              <Line delay={0.28} className="italic text-purple">bespoke journey.</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md"
            >
              Share the preliminary details of your celebration. Our atelier will reach out to arrange a
              private consultation — discreet, considered, and entirely tailored to you.
            </motion.p>

            {/* Quick actions */}
            <motion.ul
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              {quick.map((q) => {
                const Icon = q.icon;
                return (
                  <motion.li key={q.label} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
                    <a
                      href={q.href}
                      className="group flex items-center gap-4 bg-white border border-linen px-4 py-3.5 hover:border-purple/40 hover:shadow-[0_16px_40px_-20px_rgba(90,37,72,0.35)] transition-all duration-300"
                    >
                      <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0 group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                        <Icon size={16} strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">{q.label}</span>
                        <span className="block text-sm text-ink truncate group-hover:text-purple transition-colors">{q.value}</span>
                      </span>
                      <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-purple transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Scroll cue */}
            <motion.a
              href="#inquiry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-purple transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-linen flex items-center justify-center group-hover:border-purple transition-colors">
                <motion.span animate={reduce ? undefined : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="inline-flex">
                  <ArrowDown size={13} />
                </motion.span>
              </span>
              Or send a confidential inquiry
            </motion.a>
          </div>

          {/* ── Visual ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full overflow-hidden shadow-2xl bg-linen"
            >
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src={imageUrl} alt="Eterna atelier" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Office list on the photo */}
              <motion.ul
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.1, delayChildren: 0.9 }}
                className="absolute top-6 right-6 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.35em] text-white/85 drop-shadow"
              >
                {offices.map((o) => (
                  <motion.li key={o} variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0 } }}>
                    {o}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Floating concierge card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: 1.05 }}
              className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-[360px] bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_30px_80px_-30px_rgba(90,37,72,0.45)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex -space-x-3">
                  {team.slice(0, 3).map((m) => (
                    <span key={m.id} className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white bg-linen">
                      {m.image && <Image src={m.image} alt={m.name} fill sizes="44px" className="object-cover" />}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-purple font-medium">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-purple/60 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-purple" />
                  </span>
                  Accepting 2026
                </span>
              </div>
              <p className="font-serif text-xl text-ink leading-tight mt-4">Your concierge team is ready.</p>
              <p className="text-xs text-neutral-600 font-light leading-relaxed mt-1.5">
                Every enquiry is read personally. Expect a reply within <span className="text-purple font-medium">24 business hours</span>.
              </p>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
