"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Transparent hero-style navbar on pages with dark hero images (Home and About pages)
  const isHeroPage = pathname === "/" || pathname === "/about";
  const isTransparent = isHeroPage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent py-6"
          : "bg-ivory/95 backdrop-blur-md shadow-sm py-3 border-b border-linen"
      )}
    >
      <Container size="wide">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className={cn(
              "font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal transition-colors duration-500",
              isTransparent ? "text-white hover:text-mauve" : "text-purple hover:text-purple-dark"
            )}>
              ETERNA
            </span>
            <span className={cn(
              "text-[9px] tracking-[0.35em] uppercase font-light -mt-1 transition-colors duration-500",
              isTransparent ? "text-white/50" : "text-neutral-500"
            )}>
              Events & Weddings
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs tracking-[0.18em] uppercase transition-colors duration-300 relative py-1 font-medium",
                    isTransparent
                      ? isActive ? "text-white" : "text-white/60 hover:text-white"
                      : isActive ? "text-ink" : "text-neutral-500 hover:text-ink"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-0 left-0 right-0 h-[1.5px] transition-colors duration-300",
                      isTransparent ? "bg-mauve" : "bg-mauve-dark"
                    )} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              className={cn(
                isTransparent
                  ? "bg-purple text-white hover:bg-mauve hover:text-ink"
                  : "bg-purple text-white hover:bg-purple-dark"
              )}
            >
              Inquire
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden p-2 focus:outline-none transition-colors duration-300",
              isTransparent ? "text-white" : "text-ink"
            )}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-ivory border-b border-linen px-6 py-8 shadow-xl transition-all">
          <div className="flex flex-col gap-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm tracking-[0.2em] uppercase font-medium py-2 border-b border-neutral-200/50",
                    isActive ? "text-mauve-dark" : "text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Button
                href="/contact"
                className="w-full"
                size="default"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inquire
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
