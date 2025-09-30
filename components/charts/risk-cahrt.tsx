"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, ReactElement } from "react";

interface RiskChartProps {
  value?: number;
  risk?: string;
  maxValue?: number;
}

export default function RiskChart({
  value = 1200,
  risk = "Overall loss",
  maxValue = 5000,
}: RiskChartProps) {
  const [currentValue] = useState(value);
  const [currentRisk] = useState(risk);


  // Calculate progress angle
  const progressPercentage = (currentValue / maxValue) * 100;
  const totalArcSpan = 320; // Total arc span in degrees
  const progressAngle = Math.round(((progressPercentage / 100) * totalArcSpan) * 10000) / 10000;

  const chartData = [
    { name: "Progress", value: currentValue, color: "url(#sentimentGradient)" },
    { name: "Remaining", value: maxValue - currentValue, color: "transparent" },
  ];

  // Generate dots around the arc
  const generateDots = () => {
    const dots: ReactElement[] = [];
    const dotCount = 40; // Number of dots in the arc
    const startAngle = 120; // Start angle in degrees
    const endAngle = 420; // End angle in degrees
    const arcSpan = startAngle - endAngle; // Total arc span (320 degrees)

    // Inner arc dots
    const innerRadius = 63;
    for (let i = 0; i < dotCount; i++) {
      const angle = startAngle - (i / (dotCount - 1)) * arcSpan;
      const radian = (angle * Math.PI) / 180;
      const x = Math.round((50 + (innerRadius / 2) * Math.cos(radian)) * 10000) / 10000;
      const y = Math.round((50 + (innerRadius / 3.2) * Math.sin(radian)) * 10000) / 10000;

      dots.push(
        <div
          key={`inner-${i}`}
          className="absolute w-[1px] h-[1px] bg-[#4FBAF0] rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      );
    }

    return dots;
  };


  return (
    <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {/* Gradient for the progress bar */}
            <linearGradient
              id="sentimentGradient"
              x1="0%"
              y1="50%"
              x2="50%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4FBAF0" />
              <stop offset="100%" stopColor="#7AD3FF" />
            </linearGradient>
          </defs>

          <defs>
            {/* Gradient for the progress bar */}
            <linearGradient
              id="sentimentGradient2"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>

          {/* Background track arc */}
          <Pie
            data={[{ name: "Track", value: maxValue }]}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={115}
            dataKey="value"
            stroke="transparent"
            fill="rgba(255, 255, 255, 0.04)"
            strokeLinecap="round"
            startAngle={250}
            endAngle={-70}
            cornerRadius={50}
          />

          {/* Progress and Remaining arcs */}
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={115}
            dataKey="value"
            stroke="none"
            strokeLinecap="round"
            startAngle={250}
            endAngle={-70}
            cornerRadius={50}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Progress indicator dot */}
          <circle
            cx="51%"
            cy="51%"
            r="3"
            className="drop-shadow-lg"
            fill="url(#sentimentGradient2)"
            style={{
              transform: `rotate(${Math.round((190 + progressAngle) * 10000) / 10000}deg) translateY(-105px)`,
              transformOrigin: "50% 50%",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Decorative dots around the chart */}
      <div className="w-[250px] h-[400px] mt-[-75px] absolute inset-0 left-1/2 -translate-x-1/2">
        {generateDots()}
      </div>

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <div className="text-center relative">
          <p className="text-white text-sm font-lay-grotesk mb-1">
            {currentRisk}
          </p>
          <h3 className="text-white text-2xl font-semibold font-lay-grotesk mb-2">
            ${currentValue.toLocaleString()}
          </h3>
          <p className="text-white/70 text-sm font-lay-grotesk">
            / ${maxValue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
