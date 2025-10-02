"use client";

import AccountInformationSection from "@/components/setting-components/account-information";
import PersonalInformationSection from "@/components/setting-components/personal-information-section";
import SecuritySection from "@/components/setting-components/security-section";
import SettingsTabs from "@/components/setting-components/setting-tabs";
import NotificationSection from "@/components/setting-components/notification-section";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SettingsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("personal-information");

  // Initialize active tab from query params
  useEffect(() => {
    const tabFromParams = searchParams.get("tab");
    if (
      tabFromParams &&
      [
        "personal-information",
        "account-information",
        "security",
        "notifications",
      ].includes(tabFromParams)
    ) {
      setActiveTab(tabFromParams);
    } else if (!tabFromParams) {
      // Set default tab in URL if no tab is specified
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "personal-information");
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [searchParams]);

  return (
    <DashboardPageContainer>
      <div className="flex md:flex-row flex-col gap-5">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "personal-information" && (
          <PersonalInformationSection />
        )}
        {activeTab === "account-information" && (
          <AccountInformationSection />
        )}
        {activeTab === "security" && (
          <SecuritySection />
        )}
        {activeTab === "notifications" && (
          <NotificationSection />
        )}
      </div>
    </DashboardPageContainer>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
