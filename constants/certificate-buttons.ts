import { CertificateButtonVariant } from "@/types/certificates";
import { ReactNode } from "react";

export const CERTIFICATE_BUTTON_BASE_CLASSES = "flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black border-white/15 rounded-[8px] h-[38px] py-1 px-3 font-lay-grotesk text-sm transition-all duration-200";

export interface ButtonIconConfig {
  type: "image" | "component" | "placeholder";
  src?: string;
  alt?: string;
  component?: () => ReactNode;
  className?: string;
}

export const CERTIFICATE_BUTTON_VARIANTS: Record<CertificateButtonVariant, {
  className: string;
  buttonVariant: "outline" | "ghost" | "gradient";
  hasShine?: boolean;
  icon: ButtonIconConfig;
}> = {
  "download-light": {
    className: "gap-[7.57px] w-[156.57px]",
    buttonVariant: "outline",
    icon: {
      type: "image",
      src: "/images/download-icon.svg",
      alt: "download",
      className: "w-4 h-4"
    }
  },
  "download-dark": {
    className: "gap-2 w-[156.57px]",
    buttonVariant: "outline",
    icon: {
      type: "component",
      component: () => {
        // This will be handled in the component
        return null;
      }
    }
  },
  "copy-link": {
    className: "gap-1 w-[124.57px] p-[14px_12px]",
    buttonVariant: "outline",
    icon: {
      type: "image",
      src: "/images/copy.svg",
      alt: "copy",
      className: "w-4 h-4"
    }
  },
  "verify": {
    className: "gap-2 w-full sm:w-auto px-2.5 xl:px-4 h-9 sm:h-10 rounded-lg hover:opacity-50",
    buttonVariant: "gradient",
    hasShine: false,
    icon: {
      type: "image",
      src: "/images/verify.svg",
      alt: "verify",
      className: "w-4 h-4"
    }
  },
  "share": {
    className: "gap-1.5 w-[32px] h-[32px] rounded-[8px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-[44px] hover:bg-gradient-to-b hover:from-white/[0.07] hover:to-white/[0.03]",
    buttonVariant: "ghost",
    icon: {
      type: "component",
      component: () => {
        return null;
      }
    }
  },
  "download-share": {
    className: "gap-1.5 w-[32px] h-[32px] rounded-[8px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-[44px] hover:bg-gradient-to-b hover:from-white/[0.07] hover:to-white/[0.03] p-[6px]",
    buttonVariant: "ghost",
    icon: {
      type: "image",
      src: "/images/download-icon.svg",
      alt: "download",
      className: "w-4 h-4 brightness-0 invert"
    }
  },
  "qr": {
    className: "gap-2 w-[156.57px]",
    buttonVariant: "outline",
    icon: {
      type: "placeholder",
      className: "w-4 h-4 bg-gray-400 rounded"
    }
  },
  "scan": {
    className: "gap-2 w-full h-[38px] border border-white/15 rounded-[8px] bg-white hover:bg-white/90 text-black font-lay-grotesk",
    buttonVariant: "outline",
    icon: {
      type: "image",
      src: "/images/scan.svg",
      alt: "scan",
      className: "w-4 h-4"
    }
  },
  "custom": {
    className: "",
    buttonVariant: "outline",
    icon: {
      type: "placeholder",
      className: ""
    }
  },
};
