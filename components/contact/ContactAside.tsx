import React from "react";
import { CalendarCheck, Clock, FileText, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { FadeIn } from "@/components/common/FadeIn";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/data/site";

const nextSteps = [
  { icon: MessageSquare, title: "We read every word", text: "Your enquiry lands directly with our concierge team." },
  { icon: CalendarCheck, title: "Private consultation", text: "We reach out within 24 business hours to arrange a call." },
  { icon: FileText, title: "Bespoke proposal", text: "A tailored concept and scope, shaped around your story." },
];

export function ContactAside() {
  const offices = siteConfig.address.split("•").map((s) => s.trim());
  const tel = siteConfig.phone.replace(/[^\d+]/g, "");

  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      {/* Concierge card */}
      <FadeIn delay={0.1}>
        <div className="bg-white border border-linen">
          <div className="px-7 py-6 border-b border-linen">
            <span className="text-[11px] uppercase tracking-[0.3em] text-purple font-medium">Atelier Concierge</span>
            <h3 className="font-serif text-2xl text-ink mt-1.5">Direct inquiries</h3>
          </div>
          <ul className="divide-y divide-linen">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4 px-7 py-5 hover:bg-ivory transition-colors">
                <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0 group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                  <Mail size={16} strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">Email</span>
                  <span className="block text-sm text-ink truncate group-hover:text-purple transition-colors">{siteConfig.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${tel}`} className="group flex items-center gap-4 px-7 py-5 hover:bg-ivory transition-colors">
                <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0 group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                  <Phone size={16} strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">Telephone</span>
                  <span className="block text-sm text-ink group-hover:text-purple transition-colors">{siteConfig.phone}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-4 px-7 py-5">
              <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0">
                <MapPin size={16} strokeWidth={1.6} />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">Offices</span>
                <span className="block text-sm text-ink leading-relaxed">
                  {offices.map((o) => (
                    <span key={o} className="block">{o}</span>
                  ))}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-4 px-7 py-5">
              <span className="w-10 h-10 rounded-full bg-purple/[0.07] text-purple flex items-center justify-center shrink-0">
                <Clock size={16} strokeWidth={1.6} />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500">Consultation hours</span>
                <span className="block text-sm text-ink leading-relaxed">
                  Mon – Fri · 9:00 – 18:00 CET / EST
                  <span className="block text-xs text-neutral-500 font-light">Private weekend consultations by appointment</span>
                </span>
              </span>
            </li>
          </ul>
          <div className="px-7 py-5 border-t border-linen flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Follow the atelier</span>
            <SocialLinks />
          </div>
        </div>
      </FadeIn>

      {/* What happens next */}
      <FadeIn delay={0.2}>
        <div className="relative bg-purple text-white p-7 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-mauve-light/25 blur-3xl pointer-events-none" />
          <span className="relative text-[11px] uppercase tracking-[0.3em] text-mauve-light font-medium">What happens next</span>
          <ol className="relative mt-5 space-y-5">
            {nextSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex gap-4">
                  <span className="relative shrink-0">
                    <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center">
                      <Icon size={15} strokeWidth={1.6} />
                    </span>
                    {i < nextSteps.length - 1 && <span className="absolute left-1/2 top-9 -translate-x-1/2 w-px h-5 bg-white/20" />}
                  </span>
                  <span>
                    <span className="block font-serif text-base leading-tight">{s.title}</span>
                    <span className="block text-xs text-white/70 font-light leading-relaxed mt-1">{s.text}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </FadeIn>
    </div>
  );
}
