
import { CalendarIcon } from "@/components/common/calendar-icon-wrapper";

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

  billing: [
    { id: "all", label: "All" },
    { id: "paid", label: "Paid" },
    { id: "unpaid", label: "Unpaid" },
  ] as const,

  "economic-calendar": [
    { id: "yesterday", label: "Yesterday" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "thisWeek", label: "This Week" },
    { id: "nextWeek", label: "Next Week" },
    { id: "calendar", label: "Calendar", icon: CalendarIcon, isCalendar: true },
  ] as const,
} as const;

// Economic Calendar page styling constants
export const ECONOMIC_CALENDAR_STYLES = {
  container: {
    inner: "rounded-lg bg-gradient-to-b from-[rgba(110,110,110,0.1)] to-[rgba(19,19,21,0.02)] border border-white/10 min-h-screen w-full",
  },
  layout: {
    content: "pr-5 pl-2 py-2",
    tabsAndFilters: "flex md:flex-row flex-col md:justify-between md:items-center gap-4",
    tabsContainer: "flex flex-col md:flex-row md:items-center gap-4 relative",
    tableContainer: "border-t border-white/10 rounded-t-none"
  }
} as const;

export const getTabConfig = (type: keyof typeof COMMON_TABS) => {
  return COMMON_TABS[type];
};
