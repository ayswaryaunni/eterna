"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "@/components/common/Container";

export function AboutProcess() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress strictly within this section container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Scale line scaleX smoothly from 0 to 1 across full 100% width
  const scaleX = useTransform(smoothProgress, [0, 0.85], [0, 1]);

  const steps = [
    {
      step: "01",
      title: "Discovery & Vision",
      text: "We define your personal aesthetic, story, venue parameters, and sensory requirements in private consultations.",
      threshold: 0.0,
    },
    {
      step: "02",
      title: "Spatial & Conceptual Design",
      text: "Our atelier creates 3D renders, mood boards, floral mockups, and custom lighting blueprints.",
      threshold: 0.28,
    },
    {
      step: "03",
      title: "Global Logistics & Curation",
      text: "We manage cross-border contracts, Michelin culinary tastings, guest hospitality, and artisan sourcing.",
      threshold: 0.55,
    },
    {
      step: "04",
      title: "Flawless Execution",
      text: "On-site white-glove production team ensures minute-by-minute perfection and seamless event flow.",
      threshold: 0.82,
    },
  ];

  return (
    // Sticky Scroll Container (Pinned height 250vh so user stays in timeline while scrolling)
    <section ref={targetRef} className="relative h-[250vh] bg-ivory border-t border-linen">
      {/* Sticky Content Viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <Container size="wide">
          <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs uppercase tracking-[0.4em] text-champagne font-medium block mb-3">
              The Timeline
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink">
              Bespoke Creation Process
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-2 tracking-wider">
              (Scroll down to experience the journey step-by-step)
            </p>
          </div>

          {/* Interactive Scroll-Driven Timeline */}
          <div className="relative px-4 sm:px-8">
            {/* Base Line (Full Width across all nodes) */}
            <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-linen z-0" />

            {/* Scroll Progress Active Gold Line (Full 100% width grow) */}
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-champagne z-0"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((item) => (
                <StepCard key={item.step} item={item} progress={smoothProgress} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

// Individual Step Card Component with Dynamic Scroll State
function StepCard({
  item,
  progress,
}: {
  item: { step: string; title: string; text: string; threshold: number };
  progress: any;
}) {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    return progress.on("change", (latest: number) => {
      if (latest >= item.threshold) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  }, [progress, item.threshold]);

  return (
    <div className="relative space-y-6 transition-all duration-500 flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Timeline Step Round Badge - Fills when scroll reaches this step */}
      <div className="flex items-center justify-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-lg transition-all duration-500 shadow-md relative z-10 ${
            isActive
              ? "bg-champagne text-white border-2 border-champagne scale-110 shadow-champagne/30"
              : "bg-white text-neutral-400 border border-linen"
          }`}
        >
          {item.step}
        </div>
      </div>

      <div
        className={`space-y-3 pt-2 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
        }`}
      >
        <h3
          className={`font-serif text-2xl transition-colors duration-500 ${
            isActive ? "text-ink" : "text-neutral-400"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-xs text-neutral-600 font-light leading-relaxed">
          {item.text}
        </p>
      </div>
    </div>
  );
}
