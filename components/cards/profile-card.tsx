"use client";

import React from "react";
import { TradeUp, TradeDownRight, FirstRank, SecondRank, ThirdRank } from "@/components/common/icon";
import ReactCountryFlag from "react-country-flag";

interface ProfileCardProps {
  name: string;
  location: string;
  countryCode: string;
  rank: string;
  profitFactor: string;
  totalTrades: string;
  winRate: string;
  winRateTrend: "up" | "down";
  monthlyReturn: string;
  monthlyReturnTrend: "up" | "down";
  accountSize: string;
  cardType?: "first" | "second" | "third";
}

const getRankIcon = (rank: string) => {
  const rankNumber = parseInt(rank);
  switch (rankNumber) {
    case 1:
      return <FirstRank className="w-10 h-10" />;
    case 2:
      return <SecondRank className="w-10 h-10" />;
    case 3:
      return <ThirdRank className="w-10 h-10" />;
    default:
      return null;
  }
};

const getCardBackground = (cardType: "first" | "second" | "third") => {
  switch (cardType) {
    case "first":
      return 'linear-gradient(303.95deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 0.335969) 48%, rgba(78, 178, 228, 0.7) 100%)';
    case "second":
      return 'linear-gradient(303.95deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 0.167984) 48%, rgba(78, 178, 228, 0.35) 100%)';
    case "third":
      return 'linear-gradient(303.95deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 0.0671938) 48%, rgba(78, 178, 228, 0.14) 100%)';
    default:
      return 'linear-gradient(303.95deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 0.335969) 48%, rgba(78, 178, 228, 0.7) 100%)';
  }
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  location,
  countryCode,
  rank,
  profitFactor,
  totalTrades,
  winRate,
  winRateTrend,
  monthlyReturn,
  monthlyReturnTrend,
  accountSize,
  cardType = "first",
}) => {
  const rankIcon = getRankIcon(rank);
  
  return (
    <div className="flex flex-col items-center relative">
      {rankIcon && (
        <div className="relative flex items-center w-full h-12" >
          <div 
            className="absolute w-5/6 h-px left-1/2 transform -translate-x-1/2"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 30%, rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 0) 100%)'
            }}
          ></div>
          <div className="relative z-10 mx-auto p-2">
            {rankIcon}
          </div>
        </div>
      )}
      
      <div className="text-white font-creato-display font-medium text-lg mb-3">
        Ranked {rank}
      </div>
      
      <div 
        className="relative overflow-hidden w-full max-w-[370px] h-[250px] rounded-[20px] p-5"
        style={{
          background: getCardBackground(cardType),
          border: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          backdropFilter: (cardType === 'second' || cardType === 'third') ? 'blur(40px)' : 'blur(52.343833923339844px)',
          boxShadow: '0px 41.51px 16.67px 0px #4EB2E405, 0px 65.04px 18.3px 0px #4EB2E400',
          opacity: 1,
        }}
      >
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '85%',
            height: '0.5px',
            background: 'linear-gradient(90deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 1) 30%, rgba(78, 178, 228, 1) 70%, rgba(78, 178, 228, 0) 100%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: '85%',
            height: '0.5px',
            background: 'linear-gradient(90deg, rgba(78, 178, 228, 0) 0%, rgba(78, 178, 228, 1) 30%, rgba(78, 178, 228, 1) 70%, rgba(78, 178, 228, 0) 100%)'
          }}
        />
        
        <div className="mb-5 text-center">
          <div className="text-white font-creato-display font-medium text-2xl leading-none tracking-tight mb-1">
            {name}
          </div>
          <div className="flex items-center justify-center gap-2 text-white font-creato-display font-normal text-base">
            <div className="w-[19px] h-[19px] rounded-full overflow-hidden flex items-center justify-center">
              <ReactCountryFlag 
                countryCode={countryCode} 
                svg={true}
                className="w-[19px] h-[19px] rounded-full object-cover"
              />
            </div>
            <span>{location}</span>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-5" />

        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <div className="text-white/60 font-medium text-sm">
                Profit Factor
              </div>
              <div className="text-white font-creato-display font-medium text-base">
                {profitFactor}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white/60 font-medium text-sm">
                Total Trades
              </div>
              <div className="text-white font-creato-display font-medium text-base">
                {totalTrades}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white/60 font-medium text-sm">
                Win Rate
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-creato-display font-medium text-base">
                  {winRate}
                </span>
                {winRateTrend === "up" ? (
                  <TradeUp className="w-23 h-7" fill="#00EB6E" />
                ) : (
                  <TradeDownRight className="w-23 h-7" fill="#E13E3E" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="text-white/60 font-medium text-sm">
                Monthly Return
              </div>
              <div className="flex items-center gap-0 ml-auto">
                <span className="text-white font-creato-display font-medium text-base">
                  {monthlyReturn}
                </span>
                {monthlyReturnTrend === "up" ? (
                  <TradeUp className="w-10 h-7" fill="#00EB6E" />
                ) : (
                  <TradeDownRight className="w-23 h-7" fill="#E13E3E" />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-white/60 font-medium text-sm">
                Account Size
              </div>
              <div className="text-white font-creato-display font-medium text-base ml-auto">
                {accountSize}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};