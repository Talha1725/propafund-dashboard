"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import { ChevronRight, Calendar } from "lucide-react";
import { IconGraph, GraphUpIcon, KeyIcon } from "../common/icon";
import profile from "../../public/assets/profile.svg";
import { Button } from "../ui/button";
import { ChallengeCardProps } from "../../types/challenge";
import { CredentialsDialog } from "../common/credentials-dialog";


export function ChallengeCard({
  challengeId,
  phase,
  numberOfTrades,
  daysTraded,
  balance,
  endDate,
  result,
  todaysProfit,
  equity,
  unrealizedPnL,
  onGraphClick,
  username = "",
  password = "",
  server = "",
  platform = "",
}: ChallengeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyClick = (e:MouseEvent) => {
    e.stopPropagation(); 
    setIsModalOpen(true);
  };

  const handleGraphClick = (e:MouseEvent) => {
    e.stopPropagation(); 
    onGraphClick();
  };
  return (
    <div
      className={`border rounded-[20px] p-4 relative overflow-hidden z-[999] border-white/10 gradient-dark-primary  font-creato-display`}
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-1">
          <Image src={profile} alt="user" className="w-5 h-5 text-white" />
          <p className="text-white text-lg">
            {challengeId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="gradient" size="sm" className="text-black">
            {phase}
          </Button>
          <ChevronRight className="w-5 h-5 text-white/60" />
        </div>
      </div>

      {/* stats */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <IconGraph className="w-5 h-5 text-white mt-[2px]" />
          <div>
            <p className="text-white/60 text-base font-normal">
              No. of Trades
            </p>
            <p className="text-white text-xs font-normal md:text-lg md:font-medium leading-tight">
              {numberOfTrades}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Calendar className="w-5 h-5 text-white mt-[2px]" />
          <div>
            <p className="text-white/60 text-base font-normal">
              Days traded
            </p>
            <p className="text-white text-xs font-normal md:text-lg md:font-medium leading-tight">
              {daysTraded}
            </p>
          </div>
        </div>

         <div className="flex gap-2.5">
           <button
             onClick={handleGraphClick}
             className="flex items-center justify-center rounded-lg w-[38px] h-[38px] p-1.5 cursor-pointer hover:opacity-90 transition-opacity border border-white/10 bg-gradient-to-b from-[#FFFFFF12] to-[#FFFFFF08]"
           >
             <GraphUpIcon className="w-4 h-4 text-white" />
           </button>
           <button
             onClick={handleKeyClick}
             className="flex items-center justify-center rounded-lg w-[38px] h-[38px] p-1.5 cursor-pointer hover:opacity-90 transition-opacity border border-white/10 bg-gradient-to-b from-[#FFFFFF12] to-[#FFFFFF08]"
           >
             <KeyIcon className="w-4 h-4 text-white" />
           </button>
         </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <p className="text-white/60 text-base font-normal">Balance</p>
          <p className="text-white text-lg font-medium leading-tight">
            {balance}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-base font-normal">End</p>
          <p className="text-white text-lg font-medium leading-tight">
            {endDate}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-base font-normal">Result</p>
          <p className="gradient-text-secondary text-lg font-medium leading-tight">
            {result}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ marginTop: '20px' }}>
        <div>
          <p className="text-white/60 text-base font-normal">
            Today&apos;s profit
          </p>
          <p className="text-white text-lg font-medium leading-tight">
            {todaysProfit}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-base font-normal">Equity</p>
          <p className="text-white text-lg font-medium leading-tight">
            {equity}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-base font-normal">
            Unrealized PnL
          </p>
          <p className="text-white/60 text-lg font-medium leading-tight">
            {unrealizedPnL}
          </p>
        </div>
      </div>

      <CredentialsDialog
        accountId={challengeId}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        username={username}
        password={password}
        server={server}
        platform={platform}
        showDeleteButton={true}
        onDelete={() => {
          console.log("Delete account clicked");
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
