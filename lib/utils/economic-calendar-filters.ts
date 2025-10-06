import { FilterGroup } from "@/types/filter";

export const getEconomicCalendarFilterGroups = (): FilterGroup[] => [
  {
    id: "selectedCurrency",
    label: "Currency",
    type: "radio",
    options: [
      { id: "all", label: "All Currencies" },
      { id: "USD", label: "USD" },
      { id: "EUR", label: "EUR" },
      { id: "GBP", label: "GBP" },
      { id: "JPY", label: "JPY" },
      { id: "CAD", label: "CAD" },
      { id: "AUD", label: "AUD" },
      { id: "SGD", label: "SGD" },
      { id: "ZAR", label: "ZAR" },
    ]
  },
  {
    id: "selectedImpact",
    label: "Impact",
    type: "radio",
    options: [
      { id: "all", label: "All Impact" },
      { id: "high", label: "High" },
      { id: "medium", label: "Medium" },
      { id: "low", label: "Low" }
    ]
  }
];
