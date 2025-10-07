"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import profile from "../../public/assets/profile.svg";
import graphUp from "../../public/assets/graph-up.svg";
import key from "../../public/assets/key.svg";
import plus from "../../public/assets/plus.svg";
import { CredentialsDialog } from "../common/credentials-dialog";
import { ACCOUNT_CARD_CONSTANTS } from "../../constants/accounts";
import type { AccountCardProps } from "../../types/common";

const { CARD_STYLES, STATS_CONFIG } = ACCOUNT_CARD_CONSTANTS;

export const AccountCard = memo<AccountCardProps>(({ 
  accountId, 
  phase, 
  tradesCount, 
  daysTraded,
  balance = false,
  isAddNewCard = false,
  ...credentials
}) => {
  const [isClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleGraphClick = () => {
    if (!isAddNewCard && accountId) {
      router.push(`/user/dashboard?accountId=${accountId}`);
    }
  };

  const handleKeyClick = () => {
    if (!isAddNewCard) {
      setIsModalOpen(true);
    }
  };

  const getCardStyle = () => {
    if (isClicked) return CARD_STYLES.clicked;
    if (balance) return CARD_STYLES.balance;
    return CARD_STYLES.default;
  };

  const isGradientCard = balance;
  // const isInstantFunding = phase === "Instant Funding";

  const AddNewCard = () => {
    return (
      <div className="w-full flex justify-start">
        <div className="flex items-center justify-center gap-[10px] bg-[#0B0E1233] border border-white rounded-[10px] h-[41px] px-[42px] w-full text-white">
          <Image src={plus} alt="plus" width={16} height={16} className="invert" />
          <span className="text-white font-lay-grotesk font-medium text-sm leading-none">Add New Account</span>
        </div>
      </div>
    );
  };

  const ProfileSection = () => (
    <div className="w-full h-7 flex justify-between items-center mb-5">
      <div className="flex items-center gap-1.5 flex-1 h-7">
        <Image src={profile} alt="profile" width={16} height={22} className={`${isGradientCard ? "brightness-0" : "opacity-100"}`} />
        <span className={`${isGradientCard ? "text-[#0B0E12]" : "text-white"} font-lay-grotesk font-medium text-lg leading-none tracking-tight text-center`}>
          {accountId}
        </span>
      </div>
      <button className={`${isGradientCard ? "bg-[#0B0E121A] text-[#0B0E12]" : "text-white bg-instant-funding"} font-lay-grotesk font-medium text-sm leading-[136%] tracking-[-2%] rounded px-3.5 py-1 h-[27px] whitespace-nowrap`}>
        {phase}
      </button>
    </div>
  );

  const StatsDisplay = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col">
      <span className={`${isGradientCard ? "text-[#0B0E12]/50" : "text-white/60"} font-lay-grotesk font-medium text-sm leading-none tracking-tight`}>
        {label}
      </span>
      <span className={`${isGradientCard ? "text-[#0B0E12]" : "text-white"} font-lay-grotesk font-medium text-base leading-none tracking-tight`}>
        {value}
      </span>
    </div>
  );

  const ActionButton = ({ onClick, icon, alt }: { onClick: () => void; icon: StaticImageData; alt: string }) => (
    <button
      className={`flex items-center justify-center rounded-lg w-[38px] h-[38px] p-1.5 cursor-pointer hover:opacity-90 transition-opacity ${
          isGradientCard
            ? "border border-white bg-[#0B0E1233]"
            : "border border-white bg-[#ffffff42]"
      }`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center rounded-md w-full h-full`}>
        <Image src={icon} alt={alt} width={16} height={16} className="invert" />
      </div>
    </button>
  );

  if (isAddNewCard) {
    return <AddNewCard />;
  }

  return (
    <>
      <div 
        className={`border rounded-[20px] p-5 sm:p-6 relative overflow-hidden max-h-[146px] hover:opacity-90 transition-all duration-200 ${getCardStyle()}`}
      >        
        <ProfileSection />
        
        <div className="w-full h-px border-t border-white/10 mb-5" />

        <div className="w-full h-[38px] flex justify-between items-center">
          <div className="flex gap-5 flex-1 h-[30px]">
            {STATS_CONFIG.map(({ label, key }) => (
              <StatsDisplay 
                key={key} 
                label={label} 
                value={key === "tradesCount" ? tradesCount : daysTraded} 
              />
            ))}
          </div>

          <div className="flex gap-2.5 h-[38px] flex-shrink-0">
            <ActionButton onClick={handleGraphClick} icon={graphUp} alt="graph up" />
            <ActionButton onClick={handleKeyClick} icon={key} alt="key" />
          </div>
        </div>
      </div>

      <CredentialsDialog
        accountId={accountId}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        {...credentials}
        showDeleteButton={true}
        onDelete={() => {
          console.log("Delete account clicked");
          setIsModalOpen(false);
        }}
      />
    </>
  );
});

AccountCard.displayName = "AccountCard";
