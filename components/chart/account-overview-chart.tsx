"use client";

import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useAccounts } from "@/lib/hooks/use-accounts";

interface AccountOverviewChartProps {
  className?: string;
}

const AccountOverviewChart = memo<AccountOverviewChartProps>(({ className = "" }) => {
  const { currentAccountData } = useAccounts();
  
  // Generate chart data from real trades with dates
  const generateChartData = () => {
    if (!currentAccountData) return [];
    
    const trades = currentAccountData.trades || [];
    const dailyGrowth = currentAccountData.metaStats?.dailyGrowth || [];
    const startingBalance = currentAccountData.analysis?.[0]?.startingBalance || currentAccountData.mtAccount?.balance || 0;
    
  
    if (dailyGrowth.length > 0) {
      return dailyGrowth.map((day: { date: string; balance: number }) => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: day.balance || startingBalance
      }));
    }
    
    if (trades.length === 0) {
      return [{ date: "No Trade", value: 0 }];
    }
    
    const tradesByDate: { [key: string]: number } = {};
    
    const actualTrades = trades
      .filter((trade: { type: string }) => trade.type !== 'DEAL_TYPE_BALANCE')
      .sort((a: { closeTime?: string }, b: { closeTime?: string }) => new Date(a.closeTime || '').getTime() - new Date(b.closeTime || '').getTime());
    
    actualTrades.forEach((trade: { closeTime?: string; profit: number }) => {
      const tradeDate = new Date(trade.closeTime || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!tradesByDate[tradeDate]) {
        tradesByDate[tradeDate] = 0;
      }
      tradesByDate[tradeDate] += (trade.profit || 0);
    });
    
    // Create chart data with cumulative balance
    const chartData: { date: string; value: number }[] = [];
    let cumulativeBalance = startingBalance;
    
    Object.entries(tradesByDate).forEach(([date, dailyProfit]) => {
      cumulativeBalance += dailyProfit;
      chartData.push({
        date,
        value: cumulativeBalance
      });
    });
    
    return chartData.length > 0 ? chartData : [{ date: "No Trade", value: 0 }];
  };
  
  const chartData = generateChartData();
  
  if (chartData.length === 0) {
    return <div className={`w-full h-[200px] flex items-center justify-center text-white/60 ${className}`}>No data available</div>;
  }
  
  const allBalances = chartData.map(d => d.value);
  const minBalance = Math.min(...allBalances);
  const maxBalance = Math.max(...allBalances);
  const padding = Math.max((maxBalance - minBalance) * 0.1, 1000);
  
  const yAxisMin = Math.max(0, minBalance - padding);
  const yAxisMax = maxBalance + padding;

  return (
    <div className={`w-full h-[200px] relative ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1}/>
              <stop offset="100%" stopColor="#4EB2E4" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="2 2" 
            stroke="rgba(255, 255, 255, 0.1)" 
            horizontal={true}
            vertical={true}
          />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`}
            domain={[yAxisMin, yAxisMax]}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
            labelFormatter={(date) => `Date: ${date}`}
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[14, 14, 0, 0]}
            maxBarSize={54}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

AccountOverviewChart.displayName = "AccountOverviewChart";

export default AccountOverviewChart;
