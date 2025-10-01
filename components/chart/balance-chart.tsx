"use client";

import { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { BALANCE_CHART_DATA, BUTTON_POSITIONS } from "@/constants/charts";
import type { ChartButtonProps } from "@/types/common";

interface BalanceChartProps {
  className?: string;
}

const BalanceChart = memo<BalanceChartProps>(({ className = "" }) => {
  const Button = ({ children, top, visibility, isRed = false }: ChartButtonProps) => (
    <div className={`absolute left-20 z-10 px-2 ${visibility}`} style={{ top }}>
      <button 
        className={`text-white w-[114px] h-7 rounded-lg p-2 flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis font-lay-grotesk font-medium text-xs ${
          isRed 
            ? 'bg-gradient-to-b from-[#98001B] to-[#C40023]' 
            : 'bg-gradient-to-b from-[#00EB6E] to-[#00853E]'
        } border border-white/10`}
      >
        {children}
      </button>
    </div>
  );

  return (
    <div className={`w-full h-[200px] xs:h-[240px] sm:h-[210px] md:h-[360px] lg:h-[360px] xl:h-[360px] 2xl:h-[380px] relative ${className}`} style={{ minHeight: '250px' }}>
      <div className="absolute left-1 top-1/2 transform -rotate-90 -translate-y-1/2 z-10">
        <span className="text-white/60 font-lay-grotesk text-xs font-medium">Balance</span>
      </div>
      
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <span className="text-white/60 font-lay-grotesk text-[9px] xs:text-[10px] md:text-xs font-medium whitespace-nowrap">Number of Trades</span>
      </div>
      
      {BUTTON_POSITIONS.profit.map((button, index) => (
        <Button key={`profit-${index}`} top={button.top} visibility={button.visibility}>
          Max Profit: -$6,000
        </Button>
      ))}

      {BUTTON_POSITIONS.loss.map((button, index) => (
        <Button key={`loss-${index}`} top={button.top} visibility={button.visibility} isRed>
          Max Loss: -$6,000
        </Button>
      ))}

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={BALANCE_CHART_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4EB2E4" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#4EB2E4" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="2 2" 
            stroke="rgba(255, 255, 255, 0.1)" 
            horizontal={true}
            vertical={true}
          />
          <XAxis 
            dataKey="trades" 
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value >= 100 ? "100+" : value.toString()}
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.6)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()}
            domain={[-20000, 60000]}
            ticks={[-20000, -10000, 0, 10000, 20000, 30000, 40000, 50000, 60000]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
            labelFormatter={(trades) => `Trades: ${trades}`}
          />
          <ReferenceLine 
            y={7000} 
            stroke="#00EB6E" 
            strokeWidth={2} 
            strokeDasharray="0"
            label={{ value: "", position: "top" }}
          />
          <ReferenceLine 
            y={-7000} 
            stroke="#98001B" 
            strokeWidth={2} 
            strokeDasharray="0"
            label={{ value: "", position: "top" }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#60A5FA"
            strokeWidth={2}
            fill="url(#balanceGradient)"
            dot={false}
            activeDot={{ r: 4, stroke: '#60A5FA', strokeWidth: 2, fill: 'white' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

BalanceChart.displayName = "BalanceChart";

export default BalanceChart;
