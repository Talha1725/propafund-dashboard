"use client";

import { useState, useEffect } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import { CardSection } from "@/components/trading-components/card-section";
import { Spinner } from "@/components/ui/spinner";

export default function ChallengesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <DashboardPageContainer>
      <CardSection type="challenges" activeTab="active" />
    </DashboardPageContainer>
  );
}