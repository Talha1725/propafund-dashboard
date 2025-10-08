import { Copy, ExternalLink } from "lucide-react";
import DashboardHeadings from "../common/dashboard-headings";
import StatusCard from "../common/status-card";
import { useAccounts } from "@/lib/hooks/use-accounts";

export default function Credentials() {
  const { currentAccountData } = useAccounts();
  
  if (!currentAccountData?.mtAccount) {
    return (
      <div className="border border-white/10 gradient-dark-primary rounded-[14px] p-4">
        <DashboardHeadings title="Credentials" />
        <div className="text-white/50 text-center py-4">Loading credentials...</div>
      </div>
    );
  }

  const { mtAccount } = currentAccountData;

  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] p-4">
        <DashboardHeadings title="Credentials" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
            <StatusCard title="Platform" value={mtAccount.platform || "N/A"} small={true} icon={<ExternalLink className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Login" value={mtAccount.login || "N/A"} small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Password" value="●●●●●●●●●●" small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Read-only password" titleShort={true} value="●●●●●●●●●●" small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Server" value={mtAccount.server || "N/A"} small={true} tradeIcon={false} />
        </div>
    </div>
  );
}