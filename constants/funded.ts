import { type FieldConfig } from "@/components/support/support-form";

export const productFields: FieldConfig[] = [
  { 
    type: "select", 
    name: "accountType", 
    label: "Account Type", 
    placeholder: "Select Account Type", 
    fullWidth: true, 
    options: [
      { label: "Elite ($50,000)", value: "elite-50k" },
      { label: "Pro ($100,000)", value: "pro-100k" },
      { label: "Master ($200,000)", value: "master-200k" },
    ]
  },
];

export const challengeTypeOptions = [
  { label: "Stage One", value: "stage-one" },
  { label: "Funded", value: "funded" },
];

export const platformOptions = [
  { label: "Platform 5", value: "platform-5" },
  { label: "TraderLocker", value: "traderlocker" },
  { label: "MatchTrader", value: "matchtrader" },
];

export const summaryDetails = [
  ["Challenge Type", "Regular"],
  ["Account Size", "$50,000"],
  ["Challenge Duration", "Unlimited"],
  ["Leverage", "1:100"],
  ["Minimum Trading Days", "1 Day"],
  ["Max Loss", "8%"],
  ["Daily Loss", "5%"],
  ["Weekend / Crypto Trading", "Yes"],
  ["EAs Enabled", "Yes"],
  ["Platform", "Platform 4"],
  ["Order Total", "$279.00"],
];

export const commonStyles = {
  sectionTitle: "font-romanica font-normal text-[32px] leading-[100%] tracking-[0%] uppercase text-white mb-5",
  label: "font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white",
  input: "w-full h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 placeholder:font-creato-display placeholder:font-medium placeholder:text-[18px] placeholder:leading-[100%] placeholder:tracking-[-5%] focus:border-white/30 focus:outline-none rounded-none",
  legalText: "text-white/70 font-creato-display font-normal text-[14px] leading-[1.4] space-y-4 my-4",
  button: "w-full h-[45px] px-[30px] py-[12px] gap-[15px]",
};

export const content = {
  hero: {
    titleLine1: "Trading",
    titleLine2: "Challenges",
    subtitle: "Choose your challenge type and get funded to start your trading journey.",
  },
  sections: {
    product: "Product Details",
    summary: "Summary",
  },
  button: "Complete Order",
};
