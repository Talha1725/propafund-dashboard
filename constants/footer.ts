export type FooterLink = { label: string; href: string };

// Re-export from routes for backward compatibility
export { FOOTER_QUICKLINKS, FOOTER_LEGAL } from "./routes";

export type SocialKey = "youtube" | "instagram" | "discord" | "twitter";
export type FooterSocial = { label: string; href: string; icon: SocialKey };

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Discord", href: "#", icon: "discord" },
  { label: "Twitter", href: "#", icon: "twitter" },
];


