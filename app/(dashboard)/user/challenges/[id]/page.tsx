import ChallengeMonitoringSection from "@/components/challenges-components/challenge-monitoring-section";
import ChallengeStatistics from "@/components/challenges-components/challenge-statistics";
import ChallengeStats from "@/components/challenges-components/challenge-stats";
import Credentials from "@/components/challenges-components/credentials";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import StatsSection from "@/components/dashboard-components/stats-section";
import { getChallengeById } from "@/lib/data/challenges";
import { notFound } from "next/navigation";

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const { id: challengeId } = await params;
  const challenge = getChallengeById(challengeId);

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
