"use client";

import DashboardPageContainer from "@/components/common/dashboard-page-container";
import { CardSection } from "@/components/trading-components/card-section";

export default function ChallengesPage() {
  return (
    <DashboardPageContainer>
      <CardSection type="challenges" activeTab="active" />
    </DashboardPageContainer>
   
  );
}