import { NavItem, SocialLink } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
];

export const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Inquire", href: "/contact" },
  ],
  services: [
    { label: "Full-Service Wedding Planning", href: "/services#wedding-planning" },
    { label: "Destination Weddings", href: "/services#destination-weddings" },
    { label: "Event Design & Styling", href: "/services#event-design" },
    { label: "Private Celebrations & Galas", href: "/services#private-galas" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const socialLinks: SocialLink[] = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];
