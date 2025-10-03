
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

  billing: [
    { id: "all", label: "All" },
    { id: "paid", label: "Paid" },
    { id: "unpaid", label: "Unpaid" },
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

// Billing page stylin constants
export const BILLING_STYLES = {
  container: {
    inner: "rounded-lg bg-gradient-to-b from-[rgba(110,110,110,0.1)] to-[rgba(19,19,21,0.02)] border border-white/10 min-h-screen w-full",
  },
  layout: {
    content: "pr-5 pl-2 py-2",
    tabsAndFilters: "flex md:flex-row flex-col md:justify-between md:items-center gap-4",
    tabsContainer: "flex flex-col md:flex-row md:items-center gap-4",
    tableContainer: "border-t border-white/10 rounded-t-none"
  },
  table: {
    header: "font-creato-display font-bold text-sm leading-none",
    cell: "font-creato-display font-normal text-sm leading-none"
  },
  button: {
    filter: "px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 font-creato-display",
    action: {
      base: "w-[132px] h-[33px] px-[27px] py-2 rounded-md font-creato-display font-medium text-sm leading-none transition-colors flex items-center justify-center gap-[10px] bg-gradient-to-b from-white to-blue text-white hover:opacity-90 !text-white"
    }
  }
} as const;

export const getTabConfig = (type: keyof typeof COMMON_TABS) => {
  return COMMON_TABS[type];
};
