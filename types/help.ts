export interface Tab {
  id: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StackedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export interface FAQCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}
