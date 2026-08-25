import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  isLight?: boolean;
}

export function SectionHeading({
  tag,
  title,
  description,
  align = "center",
  className,
  isLight = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16 max-w-3xl",
        alignmentClasses[align],
        className
      )}
    >
      {tag && (
        <span
          className={cn(
            "text-xs tracking-[0.25em] uppercase font-medium mb-3",
            isLight ? "text-amber-200/90" : "text-[#B8976C]"
          )}
        >
          {tag}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-tight",
          isLight ? "text-white" : "text-[#1A1A1A]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed font-light",
            isLight ? "text-neutral-300" : "text-neutral-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
