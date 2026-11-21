import { Flower2, Plane, Sparkles, Wine, type LucideIcon, type LucideProps } from "lucide-react";

/* Icon per service id — falls back to Sparkles for anything new added to data/services.ts */
const icons: Record<string, LucideIcon> = {
  "wedding-planning": Sparkles,
  "destination-weddings": Plane,
  "event-design": Flower2,
  "private-galas": Wine,
};

interface ServiceIconProps extends LucideProps {
  id: string;
}

export function ServiceIcon({ id, ...props }: ServiceIconProps) {
  const Icon = icons[id] ?? Sparkles;
  return <Icon {...props} />;
}
