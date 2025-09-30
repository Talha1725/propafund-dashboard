import TradingBehaviorSection from "../common/trading-behavior";
import RiskMonitor from "../common/risk-monitor";
import ChallengeSummary from "./challenge-summary";

export default function ChallengeMonitoringSection() {
  return (
    <div className="flex gap-4 justify-between flex-wrap lg:flex-nowrap">
      <TradingBehaviorSection />
      <RiskMonitor />
      <ChallengeSummary />
    </div>
  );
}
