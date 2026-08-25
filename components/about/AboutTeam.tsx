"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";

export function AboutTeam() {
  const team = [
    {
      name: "Ayswarya Unni",
      role: "Founder & Creative Director",
      bio: "Master of spatial design with over a decade spent curating private galas and high-profile nuptials across Europe and Asia.",
      image: "/images/portfolio/kyoto-wedding.jpg"
    },
    {
      name: "Marcus Vance",
      role: "Head of International Logistics",
      bio: "Specializes in multi-day destination venue transformations, cross-border hospitality, and royal estate production.",
      image: "/images/portfolio/manhattan-gala.jpg"
    },
    {
      name: "Elena Rostova",
      role: "Floral Architecture Lead",
      bio: "Haute couture floral artist known for installing monumental, immersive botanical sculptures in historic venues.",
      image: "/images/portfolio/chateau-wedding.jpg"
    }
  ];

  return (
    <section className="py-[100px] bg-white border-t border-[#EAE5DE] overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-light block mb-3">
              The Visionaries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#1A1A1A]">
              Leadership Atelier
            </h2>
          </div>
          <p className="text-xs text-neutral-500 tracking-widest uppercase font-light">
            Discreet · World-Class · Dedicated
          </p>
        </div>

        {/* Vertical Editorial Split Cards Layout */}
        <div className="space-y-12">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#EAE5DE] p-6 lg:p-8 bg-[#FAF8F5] ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image side */}
              <div className={`lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Bio side */}
              <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
                  {member.role}
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl text-[#1A1A1A]">
                  {member.name}
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-xl">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
