export interface PromoOffer {
  title: string;
  description: string;
  buttonText: string;
  image: any;
}

export const PROMO_OFFERS: PromoOffer[] = [
  {
    title:
      "SECURE A TREASURY OF 50,000 DENARII - BE GRANTED ANOTHER IN TRIBUTE",
    description:
      "Expand your trading power at no additional cost. For a limited time, when you purchase a $50K funded account with PropaFund, you'll receive a second $50K account free —instantly added to your dashboard.",
    buttonText: "Get Offer Now",
    image: "/assets/chest-1.svg",
  },
  {
    title: "CLAIM 7% TRIBUTE ON ALL INSTANT FUNDING TREASURIES",
    description:
      "For a limited time, PropaFund gives you instant savings across all funding accounts. Grow your capital, reduce your risk, and trade with confidence.",
    buttonText: "Explore Accounts",
    image: "/assets/chest-2.svg",
  },
  {
    title: "CLAIM VICTORY WITH $50,000 IN TRADING CAPITAL",
    description:
      "Join our trading challenge and showcase your skills. The best performers will receive fully funded accounts and cash rewards — no entry fee required.",
    buttonText: "Register Now",
    image: "/assets/chest-3.svg",
  },
];


