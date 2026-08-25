import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  href,
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#1A1A1A] text-white hover:bg-[#C5A880] hover:text-[#1A1A1A] shadow-sm",
    secondary:
      "bg-[#FAF8F5] text-[#1A1A1A] border border-[#E5E0D8] hover:bg-[#F3EFEA]",
    outline:
      "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white",
    ghost:
      "text-[#1A1A1A] hover:text-[#C5A880] hover:bg-transparent underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-widest uppercase",
    default: "px-7 py-3 text-xs tracking-[0.2em] uppercase",
    lg: "px-9 py-4 text-sm tracking-[0.2em] uppercase",
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
