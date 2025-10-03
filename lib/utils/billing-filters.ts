import { FilterGroup } from "@/types/filter";

export const getBillingFilterGroups = (): FilterGroup[] => [
  {
    id: "selectedStatus",
    label: "Status",
    type: "radio",
    options: [
      { id: "all", label: "All Status" },
      { id: "Paid", label: "Paid" },
      { id: "Unpaid", label: "Unpaid" }
    ]
  },
  {
    id: "selectedPlatform",
    label: "Platform",
    type: "radio",
    options: [
      { id: "all", label: "All Platforms" },
      { id: "MT5", label: "MT5" },
      { id: "MT4", label: "MT4" },
      { id: "Tradelocker", label: "Tradelocker" }
    ]
  },
  {
    id: "selectedAmount",
    label: "Amount Range",
    type: "radio",
    options: [
      { id: "all", label: "All Amounts" },
      { id: "under-100", label: "Under $100" },
      { id: "100-150", label: "$100 - $150" },
      { id: "over-150", label: "Over $150" }
    ]
  },
  {
    id: "selectedDate",
    label: "Date Range",
    type: "radio",
    options: [
      { id: "all", label: "All Dates" },
      { id: "last-7-days", label: "Last 7 Days" },
      { id: "last-30-days", label: "Last 30 Days" },
      { id: "last-90-days", label: "Last 90 Days" }
    ]
  }
];
