"use client";

import { useState, useEffect } from "react";
import ChallengeMonitoringSection from "@/components/challenges-components/challenge-monitoring-section";
import ChallengeStatistics from "@/components/challenges-components/challenge-statistics";
import ChallengeStats from "@/components/challenges-components/challenge-stats";
import Credentials from "@/components/challenges-components/credentials";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import StatsSection from "@/components/dashboard-components/stats-section";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { notFound } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const [loading, setLoading] = useState(true);
  const { accounts, setSelectedAccount, currentAccountData, loading: accountsLoading } = useAccounts();

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        
        // Find the account that matches this challenge ID
        const accountToSelect = accounts.find(account => account.login === id);
        if (accountToSelect) {
          setSelectedAccount(accountToSelect.id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading challenge:", error);
        setLoading(false);
      }
    };

    loadChallenge();
  }, [params, accounts, setSelectedAccount]);

  if (loading || accountsLoading) {
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

  if (!currentAccountData) {
    notFound();
  }
  return (
    <DashboardPageContainer>      
      <Credentials />
      <ChallengeStats />
      <ChallengeMonitoringSection />
      <StatsSection />
      <ChallengeStatistics />
    </DashboardPageContainer>
  );
}
