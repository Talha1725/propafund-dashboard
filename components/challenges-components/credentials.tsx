import { Copy, ExternalLink } from "lucide-react";
import DashboardHeadings from "../common/dashboard-headings";
import StatusCard from "../common/status-card";

export default function Credentials() {
  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] p-4">
        <DashboardHeadings title="Credentials" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
            <StatusCard title="Platform" value="MT5" small={true} icon={<ExternalLink className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Login" value="1511560165" small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Password" value="●●●●●●●●●●" small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Read-only password" titleShort={true} value="!?Q*39L*sH" small={true} icon={<Copy className="size-4.5" />} tradeIcon={false} />
            <StatusCard title="Server" value="Propafund-Demo" small={true} tradeIcon={false} />
        </div>
    </div>
  );
}