export type FooterLink = { label: string; href: string };

export const FOOTER_QUICKLINKS: FooterLink[] = [
  { label: "Evaluation", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
  { label: "FAQs", href: "#" },
];

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Legal Disclosure", href: "#" },
];

export type SocialKey = "youtube" | "instagram" | "discord" | "twitter";
export type FooterSocial = { label: string; href: string; icon: SocialKey };

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Discord", href: "#", icon: "discord" },
  { label: "Twitter", href: "#", icon: "twitter" },
];


