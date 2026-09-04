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
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4D004D]/50 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#4D004D] text-white hover:bg-[#370037] hover:shadow-md shadow-sm",
    secondary:
      "bg-[#FAF8F5] text-[#4D004D] border border-[#4D004D]/20 hover:bg-[#4D004D] hover:text-white",
    outline:
      "border border-[#4D004D] text-[#4D004D] hover:bg-[#4D004D] hover:text-white",
    ghost:
      "text-[#4D004D] hover:text-[#C5A880] hover:bg-transparent underline-offset-4 hover:underline",
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
