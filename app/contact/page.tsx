import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Inquire & Contact",
  description:
    "Contact Eterna to inquire about wedding planning, destination celebrations, or private event design.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 bg-[#FAF8F5]">
      <Container size="default">
        <SectionHeading
          tag="Initiate Planning"
          title="Begin Your Bespoke Journey"
          description="Please share the preliminary details of your celebration. Our atelier will reach out to arrange a private consultation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 sm:p-10 border border-[#EAE5DE]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B8976C] font-medium block">
                Atelier Concierge
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mt-1">Direct Inquiries</h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-600 font-light">
              <div>
                <span className="font-medium text-[#1A1A1A] block">Email</span>
                <p>{siteConfig.email}</p>
              </div>
              <div>
                <span className="font-medium text-[#1A1A1A] block">Telephone</span>
                <p>{siteConfig.phone}</p>
              </div>
              <div>
                <span className="font-medium text-[#1A1A1A] block">Offices</span>
                <p className="leading-relaxed">{siteConfig.address}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE5DE]">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium block mb-2">
                Consultation Hours
              </span>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Monday – Friday: 9:00 AM – 6:00 PM CET / EST<br />
                Private weekend consultations by appointment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
