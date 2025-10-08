"use client";

import { useState, useEffect } from "react";
import ChallengeMonitoringSection from "@/components/challenges-components/challenge-monitoring-section";
import ChallengeStatistics from "@/components/challenges-components/challenge-statistics";
import ChallengeStats from "@/components/challenges-components/challenge-stats";
import Credentials from "@/components/challenges-components/credentials";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import StatsSection from "@/components/dashboard-components/stats-section";
import { getChallengeById, type ChallengeData } from "@/lib/data/challenges";
import { notFound } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const [challengeId, setChallengeId] = useState<string>("");
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setChallengeId(id);
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const challengeData = getChallengeById(id);
        if (!challengeData) {
          notFound();
        }
        setChallenge(challengeData);
      } catch (error) {
        console.error("Error loading challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [params]);

  if (loading) {
    return (
         <div className="h-screen overflow-hidden pb-10 md:pb-0">
        <DashboardPageContainer>
        <div className="h-full flex items-center justify-center">
          <Spinner variant="ring" className="h-8 w-8 text-white" />
        </div>
        </DashboardPageContainer>
      </div>
    );
  }

  if (!challenge) {
    notFound();
  }

  return (
    <DashboardPageContainer>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold">Challenge #{challengeId}</h1>
            <p className="text-white/70">
              {challenge.phase} • Started {challenge.startDate} • {challenge.result}
            </p>
          </div>
          <div className="text-right">
            <div className="text-white/50 text-sm">Platform</div>
            <div className="text-white font-medium">{challenge.platform}</div>
            <div className="text-white/50 text-sm mt-1">Server</div>
            <div className="text-white font-medium">{challenge.server}</div>
          </div>
        </div>
      </div>
      
      <Credentials />
      <ChallengeStats />
      <ChallengeMonitoringSection />
      <StatsSection />
      <ChallengeStatistics />
    </DashboardPageContainer>
  );
}
