export interface FaqItem {
  q: string;
  a: string;
}

export type StatItem = { heading: string; content: string };

export interface TestimonialCardPropsType {
  quote: string;
  isActive?: boolean;
  bottomMode: "author" | "stats";
  authorName?: string;
  authorMeta?: string;
  stats?: StatItem[];
}

export const QUESTION_CLASS =
  "font-romanica font-normal text-[20px] leading-[1] tracking-[0] uppercase";

export const ORACLE_FAQ_ITEMS: FaqItem[] = [
  {
    q: "What are the rules for getting funded?",
    a:
      "To secure funding, follow these steps:\n\n1) Complete a trading evaluation.\n2) Keep a minimum account balance.\n3) Follow risk management rules, like risking no more than 1% per trade.\n4) Show consistent profits over time.\n5) Submit necessary documents for verification.",
  },
  {
    q: "How long does the challenge last?",
    a:
      "The challenge duration depends on the plan you select and continues until rules are met or violated.",
  },
  {
    q: "What platforms do you support?",
    a: "We support leading platforms and brokers. Exact options are shown during signup.",
  },
  {
    q: "How are profits paid?",
    a: "Payouts are processed according to your agreement via supported payment methods.",
  },
];

export interface TestimonialItem {
  quote: string;
  author: string;
  variant: "primary" | "dark";
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "I was impressed with the transparency of Propafund. Their resources helped me reach new heights in my trading career.",
    author: "Liam S., Experienced Trader",
    variant: "dark",
  },
  {
    quote:
      "Propafund's unique approach made trading accessible and rewarding. I've never felt more confident in my strategies!",
    author: "Ava R., Novice Trader",
    variant: "primary",
  },
  {
    quote:
      "The community at Propafund is incredibly supportive. I learned so much and saw my account grow rapidly!",
    author: "Noah W., Engaged Trader",
    variant: "dark",
  },
];

import toolCardImage from "@/public/assets/tool-card-1.svg";
import toolCardImage2 from "@/public/assets/tool-card-2.svg";
import toolCardImage3 from "@/public/assets/tool-card-3.svg";
import metaTrader from "@/public/assets/meta-trade-icon.svg";
import cTrader from "@/public/assets/cTrade-icon.svg";
import traderIcon from "@/public/assets/trader-icon.svg";

export type ToolCardConfig = {
  title: string;
  description: string;
  icon: any;
  image: any;
  blobClass: string;
  imageWrapperClass: string;
};

export const TOOLS_CARDS: ToolCardConfig[] = [
  {
    title: "SCALING PROGRAM",
    description:
      "Chart like a pro, automate your strategies, and trade with precision.",
    icon: metaTrader,
    image: toolCardImage,
    blobClass:
      "bg-gradient-to-t from-purple rounded-full to-blue h-[400px] -rotate-135 w-[100px] blur-[150px] -top-[250px] right-0 absolute",
    imageWrapperClass:
      "w-[80%] translate-x-[30%] translate-y-[17%] mt-[-50px] sm:mt-[-20px] lg:mt-[-50px]",
  },
  {
    title: "CTRADER",
    description: "Speedy execution and slick layouts for traders who move fast.",
    icon: cTrader,
    image: toolCardImage2,
    blobClass:
      "bg-gradient-to-t from-purple rounded-full to-blue h-[400px] -rotate-135 w-[100px] blur-[150px] -top-[200px] left-0 absolute",
    imageWrapperClass:
      "w-[80%] translate-x-[30%] translate-y-[17%] mt-[-50px] sm:mt-[-20px] lg:mt-[-50px]",
  },
  {
    title: "MATCH TRADER",
    description: "Clean, intuitive, and perfect for any skill level.",
    icon: traderIcon,
    image: toolCardImage3,
    blobClass:
      "bg-gradient-to-t from-purple rounded-full to-blue h-[400px] -rotate-135 w-[100px] blur-[150px] -top-[300px] left-[-100px] absolute",
    imageWrapperClass:
      "w-[80%] translate-x-[30%] translate-y-[17%] mt-[-60px] sm:mt-[-20px] lg:mt-[-50px]",
  },
];

// Titan Trader cards
import marbleHand from "@/public/assets/marble-hand.svg";
import marbleClock from "@/public/assets/marble-clock.svg";
import marbleCoin from "@/public/assets/marble-coin.svg";
import marbleStairs from "@/public/assets/marble-stairs.svg";
import marbleBlocks from "@/public/assets/marble-blocks.svg";

export type TitanCardConfig = { title: string; img: any };

export const TITAN_LEFT_CARDS: TitanCardConfig[] = [
  { title: "NO TIME LIMITS", img: marbleClock },
  { title: "COMPETITIVE PRICING", img: marbleCoin },
];

export const TITAN_MIDDLE_CARD: TitanCardConfig = {
  title: "",
  img: marbleHand,
};

export const TITAN_RIGHT_CARDS: TitanCardConfig[] = [
  { title: "SCALING PROGRAM", img: marbleStairs },
  { title: "REAL-TIME FEEDBACK", img: marbleBlocks },
];


