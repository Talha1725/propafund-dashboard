export interface FilterOption {
  id: string;
  label: string;
  color?: string;
  icon?: string;
  countryCode?: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'radio' | 'checkbox';
  options: FilterOption[];
}

export interface FilterState {
  [key: string]: string | string[] | boolean;
}

export interface FilterDropdownProps {
  filterGroups: FilterGroup[];
  filterState: FilterState;
  onFilterChange: (groupId: string, value: string | string[] | boolean) => void;
  onClearAllFilters: () => void;
  triggerLabel?: string;
  triggerIcon?: string;
  className?: string;
}
