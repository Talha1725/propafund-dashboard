export interface Tab {
  id: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const HELP_TABS: Tab[] = [
  { id: "general-questions", label: "General Questions" },
  { id: "rules", label: "Rules" },
  { id: "platform", label: "Platform" },
  { id: "payouts", label: "Payouts" },
  { id: "rewards-offers", label: "Rewards and Offers" }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is FX Utopia?",
    answer: "FX Utopia is a proprietary trading firm that funds traders, providing them with capital to trade the financial markets while keeping a share of the profits."
  },
  {
    question: "How do I start trading?",
    answer: "To start trading, first complete the evaluation process by passing both Phase 1 and Phase 2 challenges. Once completed, you'll receive your trading account credentials and can begin live trading."
  },
  {
    question: "What is the evaluation process?",
    answer: "The evaluation process consists of two phases: Phase 1 focuses on risk management and consistency, while Phase 2 tests your ability to generate profits while maintaining discipline. Both phases must be completed to receive funding."
  },
  {
    question: "How do I withdraw my profits?",
    answer: "Profits can be withdrawn through the billing section. Withdrawals are processed according to your payout schedule. Make sure to maintain your trading performance to continue receiving payouts."
  },
  {
    question: "What are the trading rules?",
    answer: "Key trading rules include: maximum daily loss limits, maximum position sizes, no news trading during high-impact events, and maintaining consistent risk management practices. Full rules are available in your trading agreement."
  },
  {
    question: "How do I track my performance?",
    answer: "Your performance is tracked in real-time through the dashboard. You can view your profit/loss, drawdown, win rate, and other key metrics. The leaderboard also shows your ranking compared to other traders."
  },
  {
    question: "What happens if I violate trading rules?",
    answer: "Rule violations may result in account suspension or termination. Minor violations may result in warnings, while major violations can lead to immediate account closure. Always review and follow the trading guidelines."
  },
  {
    question: "How do I get support?",
    answer: "For technical support, contact our support team through the support section. For trading-related questions, refer to the academy materials or contact your account manager. Response times are typically within 24 hours."
  },
  {
    question: "What is the maximum allocation?",
    answer: "Maximum allocation depends on your performance and risk management. Starting allocations are typically $10,000, with potential increases up to $1,000,000 based on consistent profitable trading and adherence to risk parameters."
  }
];
