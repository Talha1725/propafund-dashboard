import { Tab } from "@/components/common/tabs";

// Common tab configurations that can be reused across the app
export const COMMON_TABS = {
  // Certificate tabs with blue gradient styling
  certificates: [
    { id: "all", label: "All" },
    { id: "core-skills", label: "Core Skills" },
    { id: "advanced-tactics", label: "Advanced Tactics" },
    { id: "pro-trader-level", label: "Pro Trader Level" },
    { id: "max-allocation", label: "Max Allocation" },
    { id: "performance-goals", label: "Performance Goals" },
    { id: "risk-control", label: "Risk Control" },
  ] as const,

  // Trading tabs
  trading: [
    { id: "overview", label: "Overview" },
    { id: "positions", label: "Positions" },
    { id: "history", label: "History" },
    { id: "analytics", label: "Analytics" },
  ] as const,

  // Account tabs
  account: [
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ] as const,
} as const;

// Helper function to get tab configuration
export const getTabConfig = (type: keyof typeof COMMON_TABS) => {
  return COMMON_TABS[type];
};
