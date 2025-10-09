export interface BillingOrder {
  id: string;
  orderNumber: string;
  date: string;
  challenge: string;
  addons: string;
  platform: string;
  amount: number;
  status: "Paid" | "Unpaid";
  action: "View Invoice" | "Pay Now";
}

// API Types
export interface PaymentHistoryItem {
  id: number;
  trackId: string;
  amount: number;
  currency: string | null;
  status: "Paid" | "pending";
  method: string;
  platform: string;
  balance: number;
  challenge: string;
  accountId: string | null;
  createdAt: string;
  addOns: {
    totalAddons: number;
    addonDetails: any[];
    secondAccount: boolean;
    accountProtection: boolean;
  } | null;
  user: {
    email: string;
    name: string;
  };
  mtAccount: {
    accountId: string;
    accountName: string;
    brokerName: string;
    platform: string;
    server: string;
    login: string;
    balance: number;
    challengeType: string;
    status: string;
    challengePhase: number | null;
  } | null;
}

export interface PaymentHistoryFilters {
  status?: string[];
  platform?: string[];
  method?: string[];
  challenge?: string[];
  [key: string]: string[] | undefined;
}

export interface PaymentHistoryRequest {
  userId?: string;
  page?: number;
  size?: number;
  filters?: PaymentHistoryFilters;
}

export interface PaymentHistoryResponse {
  success: boolean;
  data: {
    list: PaymentHistoryItem[];
    meta: {
      page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  };
  message: string;
}

// Transformed UI Types
export interface BillingItem {
  id: string;
  orderNumber: string;
  challenge: string;
  status: "paid" | "unpaid";
  date: string;
  amount: string;
  platform: string;
  action?: string; // Optional action field for table rendering
}

export interface BillingData {
  orders: BillingOrder[];
}

export interface BillingTab {
  key: string;
  label: string;
  count?: number;
}

export type BillingTabId = "all" | "paid" | "unpaid";

export interface BillingPageProps {
  className?: string;
}

export interface BillingTableColumn {
  key: keyof BillingItem;
  label: string;
  sortable: boolean;
  render: (value: any, row: BillingItem) => React.ReactElement;
}

export interface BillingFilterState {
  selectedStatus: string;
  selectedPlatform: string;
  selectedAmount: string;
  selectedDate: string;
  [key: string]: string | string[] | boolean;
}
