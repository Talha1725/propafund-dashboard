"use client";

import ComponentContainer from "@/components/common/component-container";
import { SectionHeading } from "@/components/common/section-heading";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabClick = useCallback((tab: string) => {
    onTabChange(tab);
    
    // Update URL with query params
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [onTabChange, router, searchParams]);

  const tabs = [
    { id: "personal-information", label: "Personal Information" },
    { id: "security", label: "Security" },
  ];

  return (
    <ComponentContainer className="w-full md:w-[250px] lg:w-[320px] h-fit py-3.5">
      <SectionHeading title="Menu" />
      <ul className="mt-4">
        <li>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`settings-menu-item py-2 px-4 h-[37px] hover:bg-white/10 transition-all duration-300 w-full text-start ${
                activeTab === tab.id
                  ? "bg-gradient-to-b from-white to-blue text-black active rounded-sm"
                  : "text-white/50 rounded-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </li>
      </ul>
    </ComponentContainer>
  );
}
