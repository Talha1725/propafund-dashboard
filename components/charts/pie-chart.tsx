"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PerformancePieChartProps {
  data: Array<{
    [key: string]: string | number;
  }>;
  height?: number;
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
}

export default function PerformancePieChart({
  data,
  height = 200,
  dataKey = "value",
  nameKey = "name",
  colors = ["#1CCDE6", "#E5E7EB"],
  innerRadius = 60,
  outerRadius = 100,
}: PerformancePieChartProps) {
  // Calculate percentage for center text
  const total = data.reduce((sum, item) => sum + Number(item[dataKey] || 0), 0);
  const completed = Number(data[0]?.[dataKey] || 0);
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div style={{ height }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="75%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4EB2E4" />
              <stop offset="50%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey={dataKey}
            nameKey={nameKey}
            startAngle={180}
            endAngle={0}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? "url(#progressGradient)" : colors[index % colors.length]} 
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
        <div className="text-white text-3xl font-bold font-creato-display">
          {percentage}%
        </div>
        <div className="text-white/60 text-sm font-light font-creato-display">
          Phase one
        </div>
      </div>
    </div>
  );
}