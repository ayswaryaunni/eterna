import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and commissioning agreements of Eterna Atelier.",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-20 bg-ivory">
      <Container size="default" className="space-y-12">
        <SectionHeading
          tag="Agreement"
          title="Terms of Service"
          description="Guidelines governing our bespoke event design commissions, venue logistics, and client engagements."
          align="left"
        />

        <div className="space-y-8 text-neutral-700 font-light leading-relaxed border-t border-linen pt-8">
          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ink">1. Commission Acceptance</h3>
            <p className="text-sm">
              Eterna accepts a limited number of commissions annually to maintain white-glove devotion. Dates are secured only upon execution of a formal planning agreement and deposit.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ink">2. Vendor & Artisan Contracts</h3>
            <p className="text-sm">
              All third-party vendors (culinary chefs, floral growers, musical artists, estate rentals) curated by Eterna operate under vetted luxury standards and individual contractual agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ink">3. Force Majeure & Transfers</h3>
            <p className="text-sm">
              Multi-day international destination events include comprehensive contingency planning and transfer clauses for unforeseen global travel advisories.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
