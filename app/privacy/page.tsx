import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data handling commitment of Eterna Luxury Events.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 bg-[#FAF8F5]">
      <Container size="default" className="space-y-12">
        <SectionHeading
          tag="Legal & Discretion"
          title="Privacy Policy"
          description="Your confidentiality is paramount to our atelier. Here is how we protect your personal and event details."
          align="left"
        />

        <div className="space-y-8 text-neutral-700 font-light leading-relaxed border-t border-[#EAE5DE] pt-8">
          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-[#1A1A1A]">1. Confidentiality Commitment</h3>
            <p className="text-sm">
              Eterna Atelier operates under strict non-disclosure protocols for high-profile weddings, private galas, and VIP clients. All guest lists, venue coordinates, and financial budgets are kept completely confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-[#1A1A1A]">2. Information Collection</h3>
            <p className="text-sm">
              We only collect information necessary to execute your event services, including contact information, dietary preferences for gastronomy planning, and venue logistics requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-[#1A1A1A]">3. Photography & Media Discretion</h3>
            <p className="text-sm">
              Event imagery and videography are published only with explicit written consent from the hosts. Private celebrations remain unlisted upon request.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
