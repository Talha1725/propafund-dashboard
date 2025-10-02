
export const COMMON_TABS = {
  certificates: [
    { id: "all", label: "All" },
    { id: "core-skills", label: "Core Skills" },
    { id: "advanced-tactics", label: "Advanced Tactics" },
    { id: "pro-trader-level", label: "Pro Trader Level" },
    { id: "max-allocation", label: "Max Allocation" },
    { id: "performance-goals", label: "Performance Goals" },
    { id: "risk-control", label: "Risk Control" },
  ] as const,

  trading: [
    { id: "overview", label: "Overview" },
    { id: "positions", label: "Positions" },
    { id: "history", label: "History" },
    { id: "analytics", label: "Analytics" },
  ] as const,

  account: [
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ] as const,
} as const;

export const getTabConfig = (type: keyof typeof COMMON_TABS) => {
  return COMMON_TABS[type];
};
