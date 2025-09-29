import StatsSection from "@/components/dashboard-components/stats-section";
import StatusCardSection from "@/components/dashboard-components/status-card-section";

export default function Dashboard() {
  return (
    <div className="p-3 md:p-6 space-y-5">
     <StatusCardSection />
     <StatsSection />
    </div>
  );
}
