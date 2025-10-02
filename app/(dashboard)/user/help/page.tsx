"use client";

import { memo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/common/tabs";
import { HELP_TABS, FAQ_ITEMS } from "@/constants/help";
import { StackedTabsProps, FAQCardProps } from "@/types/help";
import { ChevronDownIcon } from "@/components/common/chevron-down-icon";

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
        ? 'bg-gradient-to-b from-white to-blue border border-purple-500/30' 
        : 'bg-gradient-to-b from-gray-400/10 to-gray-900/2 border border-white/10'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between h-[51px] p-3 sm:p-4 gap-2 sm:gap-5">
      <span 
        className={`font-lay-grotesk font-medium text-sm sm:text-base leading-none tracking-[-2%] ${isOpen ? 'text-black' : 'text-white'} ${isOpen ? '' : 'whitespace-nowrap'}`}
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
        <p className="text-black font-lay-grotesk font-medium text-sm leading-none tracking-[-1%]">
          {item.answer}
        </p>
      </div>
    )}
  </div>
));

FAQCard.displayName = "FAQCard";

const SearchBar = memo(() => (
  <div className="flex h-10 items-center border-2 border-white/10 rounded-lg w-full max-w-[756px] px-2 light-white-gradient">
    <Search className="w-4 h-4 text-white/80" />
    <Input
      placeholder="Search help articles..."
      className="bg-transparent border-none outline-none shadow-none !ring-0 placeholder:text-white font-lay-grotesk"
    />
  </div>
));

SearchBar.displayName = "SearchBar";

const ContactCard = memo(() => (
  <div className="border rounded-[20px] p-4 sm:p-6 relative overflow-hidden white-purple-gradient border-t-[#FFFFFF] border-b-[#4EB2E4] border-l-[#4eb2e483] border-r-[#4eb2e483] w-full">
    <div className="space-y-4">
      <h3 className="font-lay-grotesk font-medium text-lg sm:text-[20px] leading-none tracking-normal">
        Still Have Questions?
      </h3>
      <p className="font-lay-grotesk font-medium text-sm sm:text-[16px] leading-none tracking-[-1%]">
        Our team is ready to help. Write to <span className="font-bold">support@fxutopia.com</span> and we&apos;ll respond as soon as possible.
      </p>
      <Button className="font-lay-grotesk whitespace-nowrap w-full sm:w-[105px] h-[41px] text-black border border-black/17 rounded-lg bg-white font-medium text-sm leading-none tracking-normal px-3 py-1 hover:bg-white/90">
        Contact Now
      </Button>
    </div>
  </div>
));

ContactCard.displayName = "ContactCard";


const HelpPage = memo(() => {
  const [activeTab, setActiveTab] = useState("general-questions");
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleTabChange = (id: string) => setActiveTab(id);
  const handleCardToggle = (index: number) => setOpenCard(openCard === index ? null : index);

  return (
    <div className="h-fit overflow-hidden pb-10 md:pb-0">
      
      <div className="p-3 md:p-6 md:pb-4 space-y-5">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-white">Welcome to the FXUtopia Help Center</h1>
          <div className="mt-5">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="p-3 md:p-6 md:pb-4 space-y-5">
        <div className="mt-2">
          <div className="hidden sm:block">
            <Tabs
              tabs={HELP_TABS}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              variant="leaderboard"
              size="lg"
            />
          </div>
          
          <div className="block sm:hidden">
            <StackedTabs
              tabs={HELP_TABS}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
        
        <div className="space-y-[10px] mt-5">
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

      <div className="p-3 md:p-6 md:pb-4 space-y-5">
        <ContactCard />
      </div>
    </div>
  );
});

HelpPage.displayName = "HelpPage";

export default HelpPage;
