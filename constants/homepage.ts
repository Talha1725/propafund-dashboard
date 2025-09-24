export interface FaqItem {
  q: string;
  a: string;
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


