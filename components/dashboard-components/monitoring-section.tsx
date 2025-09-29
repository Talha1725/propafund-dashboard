import EventsSection from "./events-section";
import TradingBehaviorSection from "../common/trading-behavior";
import RiskMonitor from "../common/risk-monitor";

export default function MonitoringSection() {
  return (
    <div className="flex gap-4 justify-between flex-wrap lg:flex-nowrap">
      <TradingBehaviorSection />
      <RiskMonitor />
      <EventsSection />
    </div>
  );
}
