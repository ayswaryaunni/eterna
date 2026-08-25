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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm py-4 border-b border-[#EBE6DF]"
          : "bg-transparent py-6"
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
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-[#1A1A1A] group-hover:text-[#B8976C] transition-colors">
              ETERNA
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-neutral-500 font-light -mt-1">
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
                    "text-xs tracking-[0.18em] uppercase transition-colors duration-200 relative py-1 font-medium",
                    isActive
                      ? "text-[#1A1A1A]"
                      : "text-neutral-600 hover:text-[#1A1A1A]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8976C]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Button href="/contact" size="sm" variant="primary">
              Inquire
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#FAF8F5] border-b border-[#EBE6DF] px-6 py-8 shadow-xl transition-all">
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
                    isActive ? "text-[#B8976C]" : "text-[#1A1A1A]"
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
