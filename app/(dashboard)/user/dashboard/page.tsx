"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAccounts } from "@/lib/hooks/use-accounts";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import CertificatesSection from "@/components/dashboard-components/certificates-section";
import MonitoringSection from "@/components/dashboard-components/monitoring-section";
import RecentTrades from "@/components/dashboard-components/recent-trades";
import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get('accountId');
  
  // This will trigger data fetching when the component mounts
  const { error, setSelectedAccount, accounts, loading } = useAccounts();
  useEffect(() => {
    if (accountId && accounts.length > 0) {
      const account = accounts.find(acc => acc.login === accountId);
      if (account) {
        setSelectedAccount(account.id);
      }
    }
  }, [accountId, accounts, setSelectedAccount]);

  if (loading) {
    return (
      <div className="h-screen overflow-hidden pb-10 md:pb-0">
        <DashboardPageContainer fullHeight={true}>
          <div className="h-full flex items-center justify-center">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        </DashboardPageContainer>
      </div>
    );
  }

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
