"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import DataTable from "@/components/common/data-table";
import CertificateTabs from "@/components/common/certificate-tabs";
import FilterDropdown from "@/components/common/filter-dropdown";
import { billingData, billingColumns } from "@/lib/data/billing";
import { getTabConfig, BILLING_STYLES } from "@/constants/common-tabs";
import { getBillingFilterGroups } from "@/lib/utils/billing-filters";
import { BillingTabId, BillingFilterState } from "@/types/billing";
import IconFilter from "@/public/assets/filter-icon.svg";
import { Spinner } from "@/components/ui/spinner";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<BillingTabId>("all");
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState<BillingFilterState>({
    selectedStatus: "all",
    selectedPlatform: "all",
    selectedAmount: "all",
    selectedDate: "all",
  });

  // Simulate loading for billing data
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    let filtered = billingData;

    if (activeTab !== "all") {
      filtered = filtered.filter(order => 
        activeTab === "paid" ? order.status === "Paid" : order.status === "Unpaid"
      );
    }

    if (filterState.selectedStatus !== "all") {
      filtered = filtered.filter(order => order.status === filterState.selectedStatus);
    }

    if (filterState.selectedPlatform !== "all") {
      filtered = filtered.filter(order => order.platform === filterState.selectedPlatform);
    }

    if (filterState.selectedAmount !== "all") {
      filtered = filtered.filter(order => {
        const amount = order.amount;
        switch (filterState.selectedAmount) {
          case "under-100":
            return amount < 100;
          case "100-150":
            return amount >= 100 && amount <= 150;
          case "over-150":
            return amount > 150;
          default:
            return true;
        }
      });
    }

    if (filterState.selectedDate !== "all") {
      filtered = filtered.filter(() => {
        return true;
      });
    }

    return filtered;
  }, [activeTab, filterState]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as BillingTabId);
  };

  const handleFilterChange = (groupId: string, value: string | string[] | boolean) => {
    setFilterState(prev => ({
      ...prev,
      [groupId]: value
    }));
  };

  const handleClearAllFilters = () => {
    setFilterState({
      selectedStatus: "all",
      selectedPlatform: "all",
      selectedAmount: "all",
      selectedDate: "all",
    });
  };

  if (loading) {
    return (
      <div className="h-screen overflow-hidden pb-10 md:pb-0">
        <DashboardPageContainer>
          <div className="h-full flex items-center justify-center">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        </DashboardPageContainer>
      </div>
    );
  }

  return (
    <DashboardPageContainer>
          <div className={BILLING_STYLES.container.inner}>
          <div className={BILLING_STYLES.layout.content}>

            <div className={BILLING_STYLES.layout.tabsAndFilters}>
              <div className={BILLING_STYLES.layout.tabsContainer}>
                <CertificateTabs
                  tabs={getTabConfig("billing")}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
              <FilterDropdown
                filterGroups={getBillingFilterGroups()}
                filterState={filterState}
                onFilterChange={handleFilterChange}
                onClearAllFilters={handleClearAllFilters}
                triggerLabel="Filters"
                triggerIcon={IconFilter}
                className=""
              />
            </div>
            </div>
            <div className={BILLING_STYLES.layout.tableContainer}>
              <DataTable
                data={filteredData}
                columns={billingColumns}
                className="billing-table"
                responsive={true}
              />
            </div>
          </div>
    </DashboardPageContainer>
  );
}
