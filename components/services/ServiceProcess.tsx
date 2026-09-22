import React from "react";
import { Compass, Layers, PartyPopper, PenTool } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/FadeIn";

const steps = [
  {
    icon: Compass,
    title: "Discovery",
    text: "A private consultation to understand your story, your guests and the atmosphere you dream of.",
  },
  {
    icon: PenTool,
    title: "Concept",
    text: "Mood boards, venue scouting and a design direction that translates your vision into a visual language.",
  },
  {
    icon: Layers,
    title: "Production",
    text: "Vendor curation, logistics, timelines and budgets — every thread managed with discretion.",
  },
  {
    icon: PartyPopper,
    title: "Celebration",
    text: "On-the-day direction by our atelier team, so you are free to simply be present.",
  },
];

export function ServiceProcess() {
  return (
    <section className="py-24 bg-ivory-dark border-b border-linen relative overflow-hidden">
      <Container size="wide">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-purple font-medium">
                <span className="w-8 h-px bg-purple" />
                The Eterna Approach
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink leading-[1.05] tracking-tight mt-4">
                Four steps to <span className="italic text-purple">unforgettable</span>
              </h2>
            </div>
            <p className="text-xs text-neutral-500 tracking-widest uppercase font-light">
              Discreet · Considered · Flawless
            </p>
          </div>
        </FadeIn>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* connecting line on desktop */}
          <span aria-hidden className="hidden lg:block absolute top-[58px] left-[12.5%] right-[12.5%] h-px bg-purple/25" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.title} delay={i * 0.12} className="relative">
                <article className="group h-full bg-white border border-linen p-7 transition-all duration-500 hover:-translate-y-1 hover:border-purple/25 hover:shadow-[0_24px_60px_-28px_rgba(90,37,72,0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="w-[60px] h-[60px] rounded-full bg-ivory border border-linen text-purple flex items-center justify-center group-hover:bg-purple group-hover:text-white group-hover:border-purple transition-colors duration-500">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="font-serif text-3xl text-purple/40 font-light">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-ink mt-7">{step.title}</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mt-3">{step.text}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
