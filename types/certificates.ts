export type CertificateTabId = "all" | "core-skills" | "advanced-tactics" | "pro-trader-level" | "max-allocation" | "performance-goals" | "risk-control";

export type UnlockableCertificateTabId = "all" | "core-skills" | "advanced-tactics" | "pro-trader-level" | "max-allocation" | "performance-goals" | "risk-control";

export interface CertificateTab {
  id: CertificateTabId;
  label: string;
}

export interface UnlockableCertificateTab {
  id: UnlockableCertificateTabId;
  label: string;
}

export interface Certificate {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
  type: CertificateTabId;
}

// Certificate Button Types
export type CertificateButtonVariant = 
  | "download-light" 
  | "download-dark" 
  | "copy-link" 
  | "verify" 
  | "share" 
  | "download-share"
  | "qr"
  | "scan"
  | "custom";

export interface CertificateButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  variant?: CertificateButtonVariant;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface CertificateGridProps {
  certificates: Certificate[];
}
