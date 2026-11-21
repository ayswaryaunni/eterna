import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SocialLinks } from "@/components/common/SocialLinks";
import { footerLinks } from "@/data/navigation";
import { getSiteSettings } from "@/lib/content";

export async function Footer() {
  const siteConfig = await getSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-purple-deep text-ivory/80 pt-20 pb-12 border-t border-purple overflow-hidden">
      {/* Subtle Luxury Grid Lines Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-mauve) 1px, transparent 1px), linear-gradient(to bottom, var(--color-mauve) 1px, transparent 1px)`,
          backgroundSize: `60px 60px`
        }}
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-purple/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-3xl tracking-[0.2em] text-white block">
                ETERNA
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-mauve font-light">
                Luxury Weddings & Events
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed font-light">
              Crafting bespoke celebrations and architectural spatial experiences
              for discerning couples and esteemed hosts worldwide.
            </p>
            <div className="pt-2">
              <SocialLinks isLight={true} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-mauve font-medium">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-mauve font-medium">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-mauve font-medium">
              Concierge
            </h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <p className="hover:text-white transition-colors cursor-pointer">{siteConfig.email}</p>
              <p className="hover:text-white transition-colors cursor-pointer">{siteConfig.phone}</p>
              <p className="text-xs text-neutral-500 pt-2 leading-relaxed">
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <p>© {currentYear} {siteConfig.name} Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-neutral-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
