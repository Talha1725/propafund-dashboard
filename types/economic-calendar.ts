export interface EconomicEvent {
  id: number;
  time: string;
  currency: string;
  country: string;
  event: string;
  actual: string;
  forecast: string;
  previous: string;
  impact: "high" | "medium" | "low";
}

export interface EconomicCalendarData {
  events: EconomicEvent[];
}

export interface EconomicCalendarTab {
  key: string;
  label: string;
  count?: number;
}

export type EconomicCalendarTabId = "yesterday" | "today" | "tomorrow" | "thisWeek" | "nextWeek" | "calendar";

export interface EconomicCalendarPageProps {
  className?: string;
}

export interface EconomicCalendarTableColumn {
  key: keyof EconomicEvent;
  label: string;
  sortable: boolean;
  render: (value: any, row: EconomicEvent) => React.ReactElement;
}

export interface EconomicCalendarFilterState {
  selectedCurrency: string;
  selectedImpact: string;
  [key: string]: string | string[] | boolean;
}
