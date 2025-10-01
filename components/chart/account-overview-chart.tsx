"use client";

import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ACCOUNT_OVERVIEW_DATA } from "@/constants/charts";

interface AccountOverviewChartProps {
  className?: string;
}

const AccountOverviewChart = memo<AccountOverviewChartProps>(({ className = "" }) => {
  return (
    <div className={`w-full h-[200px] relative ${className}`}>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ACCOUNT_OVERVIEW_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
            domain={[120000, 200000]}
            ticks={[120000, 140000, 160000, 180000, 200000]}
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
