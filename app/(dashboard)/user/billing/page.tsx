"use client";

import { useState, useMemo } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import DataTable from "@/components/common/data-table";
import CertificateTabs from "@/components/common/certificate-tabs";
import FilterDropdown from "@/components/common/filter-dropdown";
import { billingColumns } from "@/lib/data/billing";
import { getTabConfig, BILLING_STYLES } from "@/constants/common-tabs";
import { getBillingFilterGroups } from "@/lib/utils/billing-filters";
import { BillingTabId, BillingFilterState, PaymentHistoryFilters } from "@/types/billing";
import IconFilter from "@/public/assets/filter-icon.svg";
import { Spinner } from "@/components/ui/spinner";
import { usePaymentHistory } from "@/lib/hooks/use-payment-history";
import { transformPaymentHistoryToBilling } from "@/lib/utils/payment-transform";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<BillingTabId>("all");
  const [filterState, setFilterState] = useState<BillingFilterState>({
    selectedStatus: "all",
    selectedPlatform: "all",
    selectedAmount: "all",
    selectedDate: "all",
  });

  // Convert filter state to API filters
  const apiFilters = useMemo((): PaymentHistoryFilters => {
    const filters: PaymentHistoryFilters = {};
    
    if (filterState.selectedStatus !== "all") {
      filters.status = [filterState.selectedStatus];
    }
    
    if (filterState.selectedPlatform !== "all") {
      filters.platform = [filterState.selectedPlatform];
    }
    
    return filters;
  }, [filterState]);

  // Fetch payment history data
  const { data: paymentHistory, loading, error, refetch } = usePaymentHistory({
    filters: apiFilters
  });

  // Transform API data to billing format
  const billingData = useMemo(() => {
    if (!paymentHistory) return [];
    return transformPaymentHistoryToBilling(paymentHistory);
  }, [paymentHistory]);

  // Apply tab filtering to transformed data
  const filteredData = useMemo(() => {
    let filtered = billingData;

    if (activeTab !== "all") {
      filtered = filtered.filter(order => 
        activeTab === "paid" ? order.status === "paid" : order.status === "unpaid"
      );
    }

    // Additional client-side filtering for amount ranges
    if (filterState.selectedAmount !== "all") {
      filtered = filtered.filter(order => {
        const amount = parseFloat(order.amount.replace('$', '').replace('Free', '0'));
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

    return filtered;
  }, [billingData, activeTab, filterState]);

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
        <DashboardPageContainer fullHeight={true}>
          <div className="h-full flex items-center justify-center">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        </DashboardPageContainer>
      </div>
    );
  }

  if (error) {
    return (
      <DashboardPageContainer>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load billing data: {error}</p>
            <button 
              onClick={refetch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardPageContainer>
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
