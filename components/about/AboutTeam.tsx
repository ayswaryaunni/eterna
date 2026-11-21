"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* Card orchestrates its children; each child picks the variant it needs */
const card: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const imageWipe = (fromLeft: boolean): Variants => ({
  hidden: { clipPath: fromLeft ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease: EASE } },
});

const imageSettle: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const badge: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

export function AboutTeam({ team }: { team: TeamMember[] }) {


  return (
    <section className="py-[100px] bg-white border-t border-linen overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs uppercase tracking-[0.4em] text-mauve font-light block mb-3"
            >
              The Visionaries
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="font-serif text-4xl sm:text-5xl font-light text-ink"
            >
              Leadership Atelier
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs text-neutral-500 tracking-widest uppercase font-light"
          >
            Discreet · World-Class · Dedicated
          </motion.p>
        </div>

        {/* Vertical Editorial Split Cards Layout */}
        <div className="space-y-12">
          {team.map((member, idx) => {
            const reversed = idx % 2 === 1;
            const index = String(idx + 1).padStart(2, "0");

            return (
              <motion.article
                key={member.name}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-linen p-6 lg:p-8 bg-ivory hover:border-purple/25 hover:shadow-[0_24px_60px_-24px_rgba(90,37,72,0.35)] transition-[box-shadow,border-color] duration-500"
              >
                {/* Oversized index watermark */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-6 font-serif text-[9rem] leading-none text-purple/[0.04] select-none pointer-events-none transition-colors duration-500 group-hover:text-purple/[0.07]",
                    reversed ? "left-6" : "right-6"
                  )}
                >
                  {index}
                </span>

                {/* Image side */}
                <motion.div
                  variants={imageWipe(!reversed)}
                  className={cn(
                    "lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden",
                    reversed && "lg:order-2"
                  )}
                >
                  <motion.div variants={imageSettle} className="absolute inset-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                  </motion.div>
                  {/* Plum tint that lifts on hover */}
                  <div className="absolute inset-0 bg-purple/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                  {/* Index badge */}
                  <motion.span
                    variants={badge}
                    className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 backdrop-blur-md font-serif text-sm text-purple shadow-md"
                  >
                    {index}
                  </motion.span>
                  {/* Corner frame that draws on hover */}
                  <span className="absolute inset-3 border border-white/0 group-hover:border-white/60 transition-all duration-700 pointer-events-none scale-95 group-hover:scale-100" />
                </motion.div>

                {/* Bio side */}
                <div
                  className={cn(
                    "lg:col-span-7 space-y-4 relative",
                    reversed ? "lg:order-1 lg:pr-8" : "lg:pl-8"
                  )}
                >
                  <motion.span
                    variants={rise}
                    className="text-[11px] uppercase tracking-[0.3em] text-mauve font-medium block"
                  >
                    {member.role}
                  </motion.span>
                  <motion.h3 variants={rise} className="font-serif text-3xl lg:text-4xl text-ink inline-block">
                    {member.name}
                    <span className="block h-px bg-purple mt-2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                  </motion.h3>
                  <motion.span variants={rule} className="block w-16 h-px bg-purple/40 origin-left" />
                  <motion.p
                    variants={rise}
                    className="text-sm text-neutral-600 font-light leading-relaxed max-w-xl"
                  >
                    {member.bio}
                  </motion.p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
