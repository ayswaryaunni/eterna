import React from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  image?: string;
  tag?: string;
  title: string;
  description?: string;
  className?: string;
}

export function HeroSection({
  image,
  tag,
  title,
  description,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "py-30 border-b border-[#EAE5DE] bg-cover bg-center",
        className
      )}
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      <Container size="default" className="text-center">
        <SectionHeading tag={tag} title={title} description={description} />
      </Container>
    </section>
  );
}