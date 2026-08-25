import { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "wedding-planning",
    title: "Full-Service Wedding Planning",
    subtitle: "Complete curation from concept to realization",
    description:
      "A seamless, end-to-end planning journey tailored to your unique love story. We orchestrate every detail, from vendor curation and timeline management to spatial production and day-of execution.",
    image: "/images/services/wedding-planning.svg",
    features: [
      "Bespoke concept design & mood boards",
      "Full vendor curation & contract negotiations",
      "Comprehensive budget & timeline management",
      "Unlimited consultations & on-site coordination",
    ],
    featured: true,
  },
  {
    id: "destination-weddings",
    title: "Destination Weddings",
    subtitle: "Extraordinary celebrations in the world's most romantic havens",
    description:
      "From historic Italian villas on Lake Como to sun-drenched châteaux in Provence, we manage cross-border logistics, guest experiences, travel hospitality, and multi-day celebrations.",
    image: "/images/services/destination-weddings.svg",
    features: [
      "Global venue scouting & international logistics",
      "Multi-day celebration planning (Welcome dinner, Recovery brunch)",
      "Guest concierge, accommodation & transfer management",
      "Local artisan & luxury supplier integration",
    ],
    featured: true,
  },
  {
    id: "event-design",
    title: "Event Design & Floral Styling",
    subtitle: "Transforming spaces into breathtaking visual narratives",
    description:
      "Our creative direction team designs sculptural floral installations, bespoke lighting architecture, custom table scapes, and tailored sensory atmospheres that leave indelible impressions.",
    image: "/images/services/event-design.svg",
    features: [
      "Spatial floor planning & 3D visualization",
      "Haute floral artistry & centerpiece styling",
      "Custom stationery, linen & tableware curation",
      "Architectural lighting & ambiance direction",
    ],
    featured: true,
  },
  {
    id: "private-galas",
    title: "Private Celebrations & Galas",
    subtitle: "Elevated milestones, anniversaries, and luxury gatherings",
    description:
      "We design exclusive private soirées, milestone anniversaries, and high-profile galas with discreet, flawless hospitality, world-class entertainment, and gastronomy.",
    image: "/images/services/private-galas.svg",
    features: [
      "Exclusive private estate & venue sourcing",
      "Michelin-tier culinary & mixology coordination",
      "Immersive performance & live musical curation",
      "Discreet VIP security & hospitality protocols",
    ],
    featured: true,
  },
];
