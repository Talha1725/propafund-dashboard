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
  orderNumber: string;
  createdAt: string;
  challenge: string;
  addons: string;
  platform: string;
  amount: number;
  status: "Paid" | "Unpaid";
  balance: number;
  trackId: string;
  method?: string;
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
