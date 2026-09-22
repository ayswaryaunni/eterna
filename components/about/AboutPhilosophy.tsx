"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";

export function AboutPhilosophy() {
  const values = [
    {
      num: "01",
      title: "Architectural Precision",
      desc: "Every event is designed with spatial harmony, intentional lighting, and structural perfection in mind.",
      tag: "Spatial Design"
    },
    {
      num: "02",
      title: "Uncompromising Discretion",
      desc: "We serve high-profile hosts and royal venues with absolute privacy, white-glove confidentiality, and grace.",
      tag: "Confidentiality"
    },
    {
      num: "03",
      title: "Sensory Storytelling",
      desc: "Beyond aesthetics, we curate soundscapes, haute gastronomy, and olfactory memories unique to your story.",
      tag: "Curated Experience"
    }
  ];

  return (
    <section className="py-[100px] bg-purple-dark text-white overflow-hidden relative border-y border-purple">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple blur-[150px] rounded-full pointer-events-none" />

      <Container size="wide">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-champagne font-light block mb-3">
              Guiding Philosophy
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
              The Pillars of Eterna
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed lg:pt-4">
            Our approach bridges classical European heritage with modern luxury production.
          </p>
        </div>

        {/* Asymmetric Offset Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -8 }}
              className={`p-8 lg:p-10 bg-neutral-900/60 border border-neutral-800 backdrop-blur-md relative flex flex-col justify-between group transition-colors duration-500 hover:border-champagne/60 ${
                idx === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="font-serif text-5xl text-champagne/80 group-hover:text-champagne transition-colors font-light">
                    {item.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-white group-hover:text-champagne transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-8">
                <div className="w-8 h-px bg-neutral-800 group-hover:w-full group-hover:bg-champagne transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
