import React from "react";
import Link from "next/link";
import { Youtube, Instagram, Twitter, MessageCircle } from "lucide-react";
import { FOOTER_SOCIALS, type FooterSocial } from "./footer";
import { type FieldConfig } from "@/components/support/support-form";

export const iconMap: Record<FooterSocial["icon"], React.ComponentType<{ width?: number; height?: number; className?: string }>> = {
  youtube: Youtube,
  instagram: Instagram,
  discord: MessageCircle,
  twitter: Twitter,
};

export const supportInfo = [
  { 
    quote: React.createElement("div", { className: "flex flex-wrap justify-center gap-[14px]" },
      FOOTER_SOCIALS.map(({ label, href, icon }) => {
        const Icon = iconMap[icon];
        return React.createElement(Link, {
          key: label,
          href: href,
          "aria-label": label,
          className: "inline-flex items-center justify-center w-5 h-5"
        }, React.createElement(Icon, { className: "text-white", width: 21, height: 21 }));
      })
    ), 
    author: "Socials" 
  },
  { quote: "support@propafund.com", author: "Email" },
  { quote: "https://t.me/propafundchannel", author: "Telegram" },
];

export const supportFields: FieldConfig[] = [
  { type: "text", name: "firstName", label: "First Name", placeholder: "First Name" },
  { type: "text", name: "lastName", label: "Last Name", placeholder: "Last Name" },
  { type: "email", name: "email", label: "Email Address", placeholder: "Email Address" },
  { type: "textarea", name: "message", label: "Message", placeholder: "Message", rows: 6 },
];
