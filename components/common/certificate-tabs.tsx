"use client";

import { memo } from "react";
import { Tabs } from "./tabs";
import { Tab } from "./tabs";

interface CertificateTabsProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const CertificateTabs = memo(({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className 
}: CertificateTabsProps) => {
  return (
    <div className={className}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        variant="certificate"
        size="lg"
      />
    </div>
  );
});

CertificateTabs.displayName = "CertificateTabs";

export default CertificateTabs;
