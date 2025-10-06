"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import DataTable from "@/components/common/data-table";
import CertificateTabs from "@/components/common/certificate-tabs";
import FilterDropdown from "@/components/common/filter-dropdown";
import { economicCalendarData, economicCalendarColumns } from "@/lib/data/economic-calendar";
import { getTabConfig, ECONOMIC_CALENDAR_STYLES } from "@/constants/common-tabs";
import { getEconomicCalendarFilterGroups } from "../../../../lib/utils/economic-calendar-filters";
import { EconomicCalendarTabId, EconomicCalendarFilterState } from "../../../../types/economic-calendar";
import IconFilter from "@/public/assets/filter-icon.svg";

export default function EconomicCalender() {
  const [activeTab, setActiveTab] = useState<EconomicCalendarTabId>("today");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [filterState, setFilterState] = useState<EconomicCalendarFilterState>({
    selectedCurrency: "all",
    selectedImpact: "all",
  });

  const filteredData = useMemo(() => {
    let filtered = economicCalendarData;

    if (filterState.selectedCurrency !== "all") {
      filtered = filtered.filter(event => event.currency === filterState.selectedCurrency);
    }

    if (filterState.selectedImpact !== "all") {
      filtered = filtered.filter(event => event.impact === filterState.selectedImpact);
    }

    return filtered;
  }, [filterState]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as EconomicCalendarTabId);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setActiveTab("calendar");
      setIsCalendarOpen(false);
    }
  };

  const handleCalendarToggle = () => {
    setActiveTab("calendar");
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCalendarOpen) {
        const target = event.target as Element;
        // Check if click is outside calendar container and not on calendar tab button
        if (!target.closest('.calendar-container') && !target.closest('[data-calendar-tab]')) {
          setIsCalendarOpen(false);
        }
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isCalendarOpen]);

  const handleFilterChange = (groupId: string, value: string | string[] | boolean) => {
    setFilterState(prev => ({
      ...prev,
      [groupId]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilterState({
      selectedCurrency: "all",
      selectedImpact: "all",
    });
  };

  return (
    <DashboardPageContainer>
      <div className={ECONOMIC_CALENDAR_STYLES.container.inner}>
        <div className={ECONOMIC_CALENDAR_STYLES.layout.content}>
          <div className={ECONOMIC_CALENDAR_STYLES.layout.tabsAndFilters}>
            <div className={ECONOMIC_CALENDAR_STYLES.layout.tabsContainer}>
              <CertificateTabs
                tabs={getTabConfig("economic-calendar").map(tab => ({
                  ...tab,
                  onCalendarDateSelect: tab.isCalendar ? handleDateSelect : undefined,
                  onCalendarToggle: tab.isCalendar ? handleCalendarToggle : undefined,
                  selectedDate: tab.isCalendar ? selectedDate : undefined,
                  isCalendarOpen: tab.isCalendar ? isCalendarOpen : undefined,
                }))}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            <FilterDropdown
              filterGroups={getEconomicCalendarFilterGroups()}
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onClearAllFilters={handleClearAllFilters}
              triggerLabel="Filters"
              triggerIcon={IconFilter}
              className=""
            />
          </div>
        </div>
        <div className={ECONOMIC_CALENDAR_STYLES.layout.tableContainer}>
          <DataTable
            data={filteredData}
            columns={economicCalendarColumns}
            className="economic-calendar-table"
            responsive={true}
            showDateHeaders={true}
          />
        </div>
      </div>
    </DashboardPageContainer>
  );
}
