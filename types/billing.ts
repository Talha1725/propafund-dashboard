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
  key: keyof BillingOrder;
  label: string;
  sortable: boolean;
  render: (value: any, row: BillingOrder) => React.ReactElement;
}

export interface BillingFilterState {
  selectedStatus: string;
  selectedPlatform: string;
  selectedAmount: string;
  selectedDate: string;
  [key: string]: string | string[] | boolean;
}
