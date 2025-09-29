import EventsSection from "./events-section";
import RiskSection from "./risk-section";
import TradingBehaviorSection from "./trading-behavior";

export default function MonitoringSection() {
  return (
    <div className="flex gap-4 justify-between flex-wrap lg:flex-nowrap">
      <TradingBehaviorSection />
      <RiskSection />
      <EventsSection />
    </div>
  );
}
