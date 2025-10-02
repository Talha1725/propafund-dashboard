"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CertificateButtonProps } from "@/types/certificates";
import { CERTIFICATE_BUTTON_BASE_CLASSES, CERTIFICATE_BUTTON_VARIANTS } from "../../constants/certificate-buttons";
import { IconDownload, IconShare } from "@/components/common/icon";

const CertificateButton = memo(({ 
  onClick, 
  children,
  variant = "download-light",
  className,
  disabled = false,
  icon
}: CertificateButtonProps) => {
  const variantConfig = CERTIFICATE_BUTTON_VARIANTS[variant];
  
  const getVariantStyles = () => {
    return variantConfig.className;
  };
  const getIcon = () => {
    if (icon) return icon;
    
    const iconConfig = variantConfig.icon;
    
    switch (iconConfig.type) {
      case "image":
        return <Image src={iconConfig.src!} alt={iconConfig.alt!} className={iconConfig.className} width={18} height={18} />;
      case "component":
        // Handle specific component variants
        if (variant === "download-dark") return <IconDownload variant="dark" />;
        if (variant === "share") return <IconShare variant="light" />;
        return null;
      case "placeholder":
        return <div className={iconConfig.className} />;
      default:
        return null;
    }
  };

  const finalClassName = className || `${CERTIFICATE_BUTTON_BASE_CLASSES} ${getVariantStyles()}`;

  return (
    <Button
      variant={variantConfig.buttonVariant}
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {getIcon()}
      {children && <span className="font-lay-grotesk text-[14px] font-medium">{children}</span>}
    </Button>
  );
});

CertificateButton.displayName = "CertificateButton";

export default CertificateButton;
