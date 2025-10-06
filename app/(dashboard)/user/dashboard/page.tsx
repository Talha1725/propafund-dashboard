"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import CertificatesSection from "@/components/dashboard-components/certificates-section";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import RecentTrades from "@/components/dashboard-components/recent-trades";
import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";

export default function Dashboard() {
  // This will trigger data fetching when the component mounts
  const { loading, error } = useAccounts();

  if (error) {
    return (
      <DashboardPageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </DashboardPageContainer>
    );
  }

  return (
    <DashboardPageContainer>
      <StatusCardSection />
      <StatsSection />
      <MonitoringSection />
      <CertificatesSection />
      <RecentTrades />
    </DashboardPageContainer>
  );
}
