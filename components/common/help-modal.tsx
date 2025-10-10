"use client";

import { memo, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/common/tabs";
import { HELP_TABS, FAQ_ITEMS } from "@/constants/help";
import { StackedTabsProps, FAQCardProps } from "@/types/help";
import { ChevronDownIcon } from "@/components/common/chevron-down-icon";
import closeBtn from "@/public/assets/close-btn.svg";

const StackedTabs = memo(({ tabs, activeTab, onTabChange }: StackedTabsProps) => (
  <div className="w-full h-fit rounded-[10px] p-[14px] bg-gradient-to-b from-transparent to-white/10 border-t-[0.5px] border-r-[0.5px] border-b-[0.5px] border-l-[0.5px] border-t-white/7 border-r-white/7 border-b-white/3 border-l-white/7">
    <div className="space-y-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          variant="ghost"
          className={`w-full h-8 rounded-lg font-lay-grotesk text-sm font-medium transition-all duration-200 text-left px-3 ${
            activeTab === tab.id
              ? 'white-purple-gradient text-black'
              : 'text-white hover:text-white/80'
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  </div>
));

StackedTabs.displayName = "StackedTabs";

const FAQCard = memo(({ item, index, isOpen, onClick }: FAQCardProps) => (
  <div 
    className={`cursor-pointer transition-all duration-200 w-full rounded-[10px] ${
      isOpen 
        ? 'bg-gradient-to-b from-white to-blue' 
        : 'bg-gradient-to-b from-gray-400/10 to-gray-900/2 border border-white/10'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between h-[51px] p-3 sm:p-4 gap-2 sm:gap-5">
      <span 
        className={`font-creato-display font-medium text-[16px] leading-[100%] tracking-[-2%] ${isOpen ? 'text-black' : 'text-white'} ${isOpen ? '' : 'whitespace-nowrap'}`}
      >
        {index + 1}. {item.question}
      </span>
      <ChevronDownIcon 
        className={`${isOpen ? 'text-black' : 'text-white'}`}
        isOpen={isOpen}
      />
    </div>
    
    {isOpen && (
      <div className="px-3 sm:px-4 pb-4">
        <p className="text-black font-creato-display font-medium text-[14px] leading-[100%] tracking-[-1%]">
          {item.answer}
        </p>
      </div>
    )}
  </div>
));

FAQCard.displayName = "FAQCard";

const SearchBar = memo(() => (
  <div className="flex items-center rounded-lg w-full border border-white/10 search-bar-gradient h-[38px] px-[14px]">
    <Search className="text-white w-[18px] h-[18px] opacity-50" />
    <Input
      placeholder="Search help articles..."
      className="bg-transparent border-none outline-none shadow-none !ring-0 placeholder:text-white/70 ml-2 font-creato-display font-normal text-[14px] leading-[100%] tracking-[0%] text-white"
    />
  </div>
));

SearchBar.displayName = "SearchBar";

const ContactCard = memo(() => (
  <div className="flex justify-center">
    <div 
      className="relative overflow-hidden bg-gradient-to-b from-white to-blue rounded-[14px]"
      style={{
        width: '520px',
        height: '175px',
        padding: '20px',
        gap: '16px',
      }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h3 
          className="font-creato-display font-bold text-[20px] leading-[100%] tracking-[0%] text-center"
        >
          Still Have Questions?
        </h3>
        <p 
          className="font-creato-display font-medium text-[16px] leading-[100%] tracking-[-1%] text-center"
        >
          Our team is ready to help. Write to <span className="font-creato-display font-bold text-[16px] leading-[100%] tracking-[-1%] text-center underline">support@propafund.com</span> and we&apos;ll respond as soon as possible.
        </p>
        <button 
          className="font-creato-display font-medium text-[14px] leading-[100%] tracking-[0%] text-black bg-white border border-[#00000029] rounded-lg hover:bg-white/90 flex items-center justify-center whitespace-nowrap"
          style={{
            width: '107px',
            height: '41px',
            paddingTop: '4px',
            paddingRight: '12px',
            paddingBottom: '4px',
            paddingLeft: '12px',
            gap: '7.57px',
          }}
        >
          Contact Now
        </button>
      </div>
    </div>
  </div>
));

ContactCard.displayName = "ContactCard";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = memo(({ isOpen, onClose }: HelpModalProps) => {
  const [activeTab, setActiveTab] = useState("general-questions");
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleTabChange = (id: string) => setActiveTab(id);
  const handleCardToggle = (index: number) => setOpenCard(openCard === index ? null : index);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
        style={{
          background: '#09090B',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderRightColor: '#4EB2E4',
          borderBottomColor: '#4EB2E4',
          borderLeftColor: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between pb-6 pt-10 px-10 ">
          <h2 className="font-creato-display font-medium text-[26px] leading-[100%] tracking-[0%] text-white">
            Help
          </h2>
          <button
            onClick={onClose}
          >
            <Image 
              src={closeBtn} 
              alt="Close" 
              width={18} 
              height={18}
              className="w-[18px] h-[18px]"
            />
          </button>
        </div>

        <div className="px-10 pb-10 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          <div 
            className="space-y-6 p-6 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(110, 110, 110, 0.1) 0%, rgba(19, 19, 21, 0.02) 100%)',
              border: '1px solid #FFFFFF1A'
            }}
          >
            <div className="flex justify-center">
              <SearchBar />
            </div>

            <div className="hidden sm:block">
              <Tabs
                tabs={HELP_TABS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                variant="certificate"
                size="lg"
                containerClassName="!pl-0"
              />
            </div>
              
            <div className="block sm:hidden">
              <StackedTabs
                tabs={HELP_TABS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            
            <div className="space-y-[10px]">
              {FAQ_ITEMS.map((item, index) => (
                <FAQCard
                  key={index}
                  item={item}
                  index={index}
                  isOpen={openCard === index}
                  onClick={() => handleCardToggle(index)}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ContactCard />
          </div>
        </div>
      </div>
    </div>
  );
});

HelpModal.displayName = "HelpModal";

export default HelpModal;
