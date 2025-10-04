"use client";

import { memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CalendarPopup } from "@/components/ui/calendar-popup";

/**
 * A reusable tabs component with multiple variants and sizes
 * 
 * @example
 * // Basic usage
 * <Tabs
 *   tabs={[{ id: "tab1", label: "Tab 1" }, { id: "tab2", label: "Tab 2" }]}
 *   activeTab="tab1"
 *   onTabChange={(tabId) => setActiveTab(tabId)}
 * />
 * 
 * @example
 * // Leaderboard style tabs
 * <Tabs
 *   tabs={LEADERBOARD_TABS}
 *   activeTab={activeTab}
 *   onTabChange={onTabChange}
 *   size="lg"
 *   variant="leaderboard"
 * />
 */

export interface Tab {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  isCalendar?: boolean;
  onCalendarDateSelect?: (date: Date | undefined) => void;
  onCalendarToggle?: () => void;
  selectedDate?: Date;
  isCalendarOpen?: boolean;
}

export type TabId = string;

export interface TabsProps<T extends TabId = TabId> {
  tabs: readonly Tab[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "leaderboard" | "minimal" | "certificate";
}

const sizeClasses = {
  sm: {
    container: "h-8 px-2 py-1 rounded-md",
    tab: "h-6 px-2 py-1 text-xs rounded-md min-w-[32px]",
  },
  md: {
    container: "h-10 px-3 py-2 rounded-lg",
    tab: "h-8 px-3 py-1 text-sm rounded-lg min-w-[40px]",
  },
  lg: {

    container: "h-12 sm:h-14 px-3 py-2 sm:px-[14px] sm:py-[10px] rounded-lg sm:rounded-[10px]",
    tab: "h-8 sm:h-9 px-3 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-lg sm:rounded-[10px] min-w-fit",
  },
};

const variantClasses = {
  default: {
    container: "border border-border bg-card",
    tab: "text-foreground hover:text-foreground/80",
    active: "bg-primary text-primary-foreground",
    inactive: "text-muted-foreground hover:text-foreground",
  },
  leaderboard: {
    container: "border-[0.5px] border-white/10 bg-gradient-to-b from-white/7 to-white/3",
    tab: "text-white hover:text-white/80",
    active: "white-purple-gradient text-black",
    inactive: "text-white hover:text-white/80",
  },
  minimal: {
    container: "border-0 bg-transparent",
    tab: "text-foreground hover:text-foreground/80",
    active: "bg-accent text-accent-foreground",
    inactive: "text-muted-foreground hover:text-foreground",
  },
  certificate: {
    container: "border-0 bg-transparent",
    tab: "text-gray-500 hover:text-gray-400 transition-colors duration-200",
    active: "bg-gradient-to-b from-white to-blue text-black shadow-sm rounded-[6px]",
    inactive: "text-white/50 hover:text-white/70",
  },
};

const TabButton = memo<{
  tab: Tab;
  isActive: boolean;
  onClick: (id: string) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  size: "sm" | "md" | "lg";
}>(({ tab, isActive, onClick, className, activeClassName, inactiveClassName, size }) => {
  const handleClick = useCallback(() => {
    if (tab.isCalendar) {
      // Call the calendar toggle handler
      if (tab.onCalendarToggle) {
        tab.onCalendarToggle();
      }
    } else {
      onClick(tab.id as string);
    }
  }, [tab, onClick]);

  const handleCalendarDateSelect = useCallback((date: Date | undefined) => {
    tab.onCalendarDateSelect?.(date);
    if (date) {
      onClick(tab.id);
    }
  }, [tab, onClick]);


  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        data-calendar-tab={tab.isCalendar}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          "font-creato-display leading-none",
          sizeClasses[size].tab,
          isActive ? activeClassName : inactiveClassName,
          className
        )}
        aria-pressed={isActive}
        aria-label={`Filter by ${tab.label}`}
      >
        {tab.icon ? (
          <tab.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-white")} />
        ) : (
          tab.label
        )}
      </button>
      
      {tab.isCalendar && (
        <div className="absolute top-full -left-2 z-[99999] mt-2 calendar-container">
          <CalendarPopup
            selectedDate={tab.selectedDate}
            onDateSelect={handleCalendarDateSelect}
            isOpen={tab.isCalendarOpen || false}
          />
        </div>
      )}
    </>
  );
});

TabButton.displayName = "TabButton";

export const Tabs = <T extends TabId = TabId>({
  tabs,
  activeTab,
  onTabChange,
  className,
  tabClassName,
  activeTabClassName,
  inactiveTabClassName,
  containerClassName,
  size = "md",
  variant = "default"
}: TabsProps<T>) => {
  const variantConfig = variantClasses[variant];
  const sizeConfig = sizeClasses[size];

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "w-auto border box-border overflow-auto flex items-center gap-1",
          sizeConfig.container,
          variantConfig.container,
          containerClassName
        )}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={onTabChange as (id: string) => void}
            className={tabClassName}
            activeClassName={cn(
              variantConfig.active,
              activeTabClassName
            )}
            inactiveClassName={cn(
              variantConfig.inactive,
              inactiveTabClassName
            )}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";
