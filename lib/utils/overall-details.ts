import { DataDisplayItemData } from "@/constants/accounts";
import { MetaAccount } from "@/lib/api/endpoints/meta";

export function calculateOverallDetails(accountData: MetaAccount | null): DataDisplayItemData[] {
  if (!accountData) {
    return getDefaultOverallDetails();
  }

  // Get best trade (only show if positive)
  const getBestTrade = (): string => {
    if (!accountData.metaStats) return "--";
    const metaStats = accountData.metaStats as Record<string, unknown>;
    const bestTrade = metaStats.bestTrade as number;
    return bestTrade && bestTrade > 0 ? `+$${bestTrade.toFixed(2)}` : "--";
  };

  // Get worst trade
  const getWorstTrade = (): string => {
    if (!accountData.metaStats) return "--";
    const metaStats = accountData.metaStats as Record<string, unknown>;
    const worstTrade = metaStats.worstTrade as number;
    return worstTrade ? `-$${Math.abs(worstTrade).toFixed(2)}` : "--";
  };

  // Get add-ons for this account
  const getAddOns = (): string => {
    if (!accountData.payment?.addOns) return "--";
    const addOns = accountData.payment.addOns as Record<string, unknown>;
    
    const addonDetails = addOns.addonDetails as unknown[];
    const totalAddons = addOns.totalAddons as number;
    
    if (addonDetails && addonDetails.length > 0) {
      return `${totalAddons || addonDetails.length} add-on${(totalAddons || addonDetails.length) > 1 ? 's' : ''}`;
    }
    
    // Check for boolean add-ons
    const booleanAddOns: string[] = [];
    if (addOns.accountProtection) booleanAddOns.push("Protection");
    if (addOns.fastPayout) booleanAddOns.push("Fast Payout");
    if (addOns.profitSplit100) booleanAddOns.push("100% Split");
    if (addOns.secondAccount) booleanAddOns.push("2nd Account");
    
    return booleanAddOns.length > 0 ? booleanAddOns.join(", ") : "--";
  };

  // Calculate average trade size for this account
  const getAverageTradeSize = (): string => {
    if (!accountData.trades) return "--";
    
    const realTrades = accountData.trades.filter(t => t.type !== 'DEAL_TYPE_BALANCE' && t.volume);
    if (realTrades.length === 0) return "--";
    
    const totalVolume = realTrades.reduce((sum, trade) => sum + (trade.volume || 0), 0);
    const avgVolume = totalVolume / realTrades.length;
    return `${avgVolume.toFixed(2)} lots`;
  };

  // Get risk of ruin for this account
  const getRiskOfRuin = (): string => {
    if (!accountData.metaStats) return "--";
    const metaStats = accountData.metaStats as Record<string, unknown>;
    const riskOfRuin = metaStats.riskOfRuin as Array<{ lossSize: number; probabilityOfLoss: number }>;
    
    if (!riskOfRuin || riskOfRuin.length === 0) return "--";
    
    // Get risk for 10% loss
    const risk10 = riskOfRuin.find((r) => r.lossSize === 0.1);
    return risk10 ? `${(risk10.probabilityOfLoss * 100).toFixed(1)}%` : "--";
  };

  // Get total lots traded for this account
  const getTotalLots = (): string => {
    if (!accountData.metaStats) return "--";
    const metaStats = accountData.metaStats as Record<string, unknown>;
    const totalLots = metaStats.lots as number;
    return totalLots ? `${totalLots.toFixed(2)} lots` : "--";
  };

  return [
    {
      label: "Best trade",
      value: getBestTrade(),
      valueColor: getBestTrade() !== "--" ? "green" : "white"
    },
    {
      label: "Worst trade", 
      value: getWorstTrade(),
      valueColor: getWorstTrade() !== "--" ? "red" : "white"
    },
    {
      label: "Add-ons",
      value: getAddOns(),
      valueColor: "white"
    },
    {
      label: "Avg. trade size",
      value: getAverageTradeSize(),
      valueColor: "white"
    },
    {
      label: "Risk of ruin (10%)",
      value: getRiskOfRuin(),
      valueColor: getRiskOfRuin() !== "--" ? "red" : "white"
    },
    {
      label: "Total lots traded",
      value: getTotalLots(),
      valueColor: "white"
    }
  ];
}

function getDefaultOverallDetails(): DataDisplayItemData[] {
  return [
    { label: "Best trade", value: "--", valueColor: "white" },
    { label: "Worst trade", value: "--", valueColor: "white" },
    { label: "Total add-ons", value: "--", valueColor: "white" },
    { label: "Avg. trade size", value: "--", valueColor: "white" },
    { label: "Highest risk of ruin", value: "--", valueColor: "white" },
    { label: "Total lots traded", value: "--", valueColor: "white" }
  ];
}
