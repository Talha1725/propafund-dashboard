import React from "react";
import { BillingOrder, BillingTableColumn, BillingItem } from "@/types/billing";

export const billingData: BillingOrder[] = [
  {
    id: "1",
    orderNumber: "#102934",
    date: "11 Sep 2025",
    challenge: "Evaluation Challenge",
    addons: "VIP Support Upgrade",
    platform: "MT5",
    amount: 149.00,
    status: "Paid",
    action: "View Invoice"
  },
  {
    id: "2",
    orderNumber: "#102934",
    date: "08 Sep 2025",
    challenge: "Evaluation Challenge",
    addons: "Unlimited Retakes",
    platform: "Tradelocker",
    amount: 119.00,
    status: "Paid",
    action: "View Invoice"
  },
  {
    id: "3",
    orderNumber: "#102934",
    date: "03 Sep 2025",
    challenge: "Evaluation Challenge",
    addons: "None",
    platform: "MT4",
    amount: 99.00,
    status: "Paid",
    action: "View Invoice"
  },
  {
    id: "4",
    orderNumber: "#102934",
    date: "28 Aug 2025",
    challenge: "Evaluation Challenge",
    addons: "Extension (14 Days)",
    platform: "MT5",
    amount: 149.00,
    status: "Unpaid",
    action: "Pay Now"
  },
  {
    id: "5",
    orderNumber: "#102934",
    date: "20 Aug 2025",
    challenge: "Evaluation Challenge",
    addons: "None",
    platform: "MT5",
    amount: 99.00,
    status: "Paid",
    action: "View Invoice"
  }
];

const createTableCell = (className: string, children: React.ReactNode) => 
  React.createElement('span', { className: `font-creato-display font-normal text-sm ${className}` }, children);

const createActionButton = (value: string, onClick: () => void) =>
  React.createElement('button', {
    className: "w-[132px] h-[33px] px-[28px] py-2 bg-gradient-to-b from-white to-blue text-black rounded-md font-creato-display font-medium text-sm leading-none transition-colors flex items-center justify-center gap-[10px] hover:opacity-90",
    onClick
  }, value);

// Updated columns for new BillingItem structure
export const billingColumns: BillingTableColumn[] = [
  {
    key: "orderNumber",
    label: "Order Number",
    sortable: true,
    render: (value: string) => createTableCell("text-white", value)
  },
  {
    key: "challenge",
    label: "Challenge",
    sortable: true,
    render: (value: string) => createTableCell("text-white", value)
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => {
      const statusClass = value === "paid" 
        ? "bg-gradient-to-b from-[#00EB6E] to-[#00853E] bg-clip-text text-transparent"
        : "bg-gradient-to-b from-[#FF0633] to-[#C40023] bg-clip-text text-transparent";
      
      return createTableCell(statusClass, value.toUpperCase());
    }
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
    render: (value: string) => createTableCell("text-white", value)
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    render: (value: string) => createTableCell("text-white", value)
  },
  {
    key: "platform",
    label: "Platform",
    sortable: true,
    render: (value: string) => createTableCell("text-white", value)
  },
  {
    key: "action",
    label: "Action",
    sortable: false,
    render: (value: unknown, row: BillingItem) => {
      const actionText = row.status === "paid" ? "View Invoice" : "Pay Now";
      return createActionButton(actionText, () => {
        if (actionText === "View Invoice") {
          console.log("View Invoice clicked for:", row.id);
        } else if (actionText === "Pay Now") {
          console.log("Pay Now clicked for:", row.id);
        }
      });
    }
  }
];
