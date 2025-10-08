"use client";

import DashboardHeadings from "../common/dashboard-headings";
import StatusCard from "../common/status-card";
import { useAccounts } from "@/lib/hooks/use-accounts";

export default function ChallengeStats() {
  const { currentAccountData } = useAccounts();

  const calculateStats = () => {
    if (!currentAccountData) {
      return {
        todayPermittedLoss: "--",
        totalAmountPaid: "--",
        totalPayouts: "--"
      };
    }

    const { metaStats, mtAccount, payment } = currentAccountData;
    
    // Calculate today's permitted loss
    const balance = metaStats?.balance || mtAccount.balance || 0;
    const todayPermittedLoss = balance > 0 ? `$${(balance * 0.05).toLocaleString()}` : "--";
    
    // Calculate total amount paid from payment add-ons
    let totalAmountPaid = "--";
    if (payment?.addOns) {
      const addOns = payment.addOns as Record<string, unknown>;
      if (addOns.addonDetails && Array.isArray(addOns.addonDetails)) {
        const total = addOns.addonDetails.reduce((sum: number, addon: Record<string, unknown>) => {
          return sum + (parseFloat(addon.amount as string) || 0);
        }, 0);
        totalAmountPaid = total > 0 ? `$${total.toLocaleString()}` : "--";
      }
    }
    
    // Calculate total payouts (number of successful trades)
    const totalPayouts = metaStats?.trades || 0;
    
    return {
      todayPermittedLoss,
      totalAmountPaid,
      totalPayouts: totalPayouts.toString()
    };
  };

  const stats = calculateStats();

  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] p-4">
      <DashboardHeadings title="Challenge Statistics" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <StatusCard title="Today's permitted loss" value={stats.todayPermittedLoss} tradeIcon={false} />
        <StatusCard title="Total amount paid" value={stats.totalAmountPaid} tradeIcon={false} />
        <StatusCard title="Total payouts" value={stats.totalPayouts} tradeIcon={false} />
      </div>
    </div>
  );
}
