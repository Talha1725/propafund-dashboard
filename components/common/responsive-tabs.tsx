"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TabItem {
  value: string;
  label: string;
}

interface ResponsiveTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  visibleTabsCount?: number; // Number of tabs to show on mobile
  className?: string;
  onTabChange?: (value: string) => void;
}

export default function ResponsiveTabs({
  tabs,
  defaultValue,
  visibleTabsCount = 3,
  className = "",
  onTabChange
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || "");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  const visibleTabs = tabs.slice(0, visibleTabsCount);
  const hiddenTabs = tabs.slice(visibleTabsCount);

  return (
    <div className={`w-full md:w-auto ${className}`}>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="flex-wrap md:flex-nowrap">
          {/* Visible tabs on mobile, all tabs on desktop */}
          <div className="flex md:hidden">
            {visibleTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
            
            {/* Dropdown for hidden tabs on mobile */}
            {hiddenTabs.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 text-sm font-creato-display whitespace-nowrap transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-[6px] text-white hover:text-white gradient-dark-primary ml-1">
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-dark border border-white/10 outline-0">
                  {hiddenTabs.map((tab) => (
                    <DropdownMenuItem 
                      key={tab.value}
                      className="text-white cursor-pointer"
                      onClick={() => handleTabChange(tab.value)}
                    >
                      {tab.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* All tabs visible on desktop */}
          <div className="hidden md:flex">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
    </div>
  );
}
