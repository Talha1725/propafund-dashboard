"use client";

import { useState, useMemo } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import DataTable from "@/components/common/data-table";
import CertificateTabs from "@/components/common/certificate-tabs";
import FilterDropdown from "@/components/common/filter-dropdown";
import { getTabConfig, BILLING_STYLES } from "@/constants/common-tabs";
import { getBillingFilterGroups } from "@/lib/utils/billing-filters";
import { BillingTabId, BillingFilterState, PaymentHistoryFilters, BillingItem } from "@/types/billing";
import IconFilter from "@/public/assets/filter-icon.svg";
import { Spinner } from "@/components/ui/spinner";
import { usePaymentHistory } from "@/lib/hooks/use-payment-history";
import { transformPaymentHistoryToBilling } from "@/lib/utils/payment-transform";
import BillingPagination from "@/components/billing/billing-pagination";
import { generateInvoicePDF } from "@/lib/utils/invoice-pdf";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import download from "@/public/assets/download.svg";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<BillingTabId>("all");
  const [filterState, setFilterState] = useState<BillingFilterState>({
    selectedStatus: "all",
    selectedPlatform: "all",
    selectedAmount: "all",
    selectedDate: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // Create dynamic columns with download invoice functionality
  const dynamicBillingColumns = useMemo(() => {
    return [
      {
        key: "orderNumber" as keyof BillingItem,
        label: "Order Number",
        sortable: true,
        render: (value: string) => (
          <div className="text-white">{value}</div>
        )
      },
      {
        key: "challenge" as keyof BillingItem,
        label: "Challenge",
        sortable: true,
        render: (value: string) => (
          <div className="text-white">{value}</div>
        )
      },
      {
        key: "status" as keyof BillingItem,
        label: "Status",
        sortable: true,
        render: (value: string) => {
          const statusClass = value === "paid" 
            ? "bg-gradient-to-b from-[#00EB6E] to-[#00853E] bg-clip-text text-transparent"
            : "bg-gradient-to-b from-[#FF0633] to-[#C40023] bg-clip-text text-transparent";
          
          return (
            <div className={statusClass}>
              {value.toUpperCase()}
            </div>
          );
        }
      },
      {
        key: "date" as keyof BillingItem,
        label: "Date",
        sortable: true,
        render: (value: string) => (
          <div className="text-white">{value}</div>
        )
      },
      {
        key: "amount" as keyof BillingItem,
        label: "Amount",
        sortable: true,
        render: (value: string) => (
          <div className="text-white">{value}</div>
        )
      },
      {
        key: "platform" as keyof BillingItem,
        label: "Platform",
        sortable: true,
        render: (value: string) => (
          <div className="text-white">{value}</div>
        )
      },
      {
        key: "action" as keyof BillingItem,
        label: "Action",
        sortable: false,
        render: (_: unknown, row: BillingItem) => {
          const isPaid = row.status === "paid";
          
          const handleDownloadInvoice = () => {
            // Find the original payment data using the billing ID
            const originalPayment = paymentHistory.find(p => p.id.toString() === row.id);
            if (originalPayment) {
              generateInvoicePDF(originalPayment);
            }
          };
          
          return (
            <Button
              variant="gradient"
              disabled={!isPaid}
              onClick={handleDownloadInvoice}
              className="sm:h-10 h-9 flex items-center justify-center rounded-lg hover:opacity-50 cursor-pointer relative overflow-visible px-2.5 xl:px-4"
            >
              <Image src={download} alt="download" className="w-4 h-4 filter brightness-0" />
              <p className="font-lay-grotesk lg:block hidden">
                Download Invoice
              </p>
            </Button>
          );
        }
      }
    ];
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

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Reset to first page when filters change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as BillingTabId);
    setCurrentPage(1);
  };

  const handleFilterChange = (groupId: string, value: string | string[] | boolean) => {
    setFilterState(prev => ({
      ...prev,
      [groupId]: value
    }));
    setCurrentPage(1); 
  };

  const handleClearAllFilters = () => {
    setFilterState({
      selectedStatus: "all",
      selectedPlatform: "all",
      selectedAmount: "all",
      selectedDate: "all",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
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
            
            {/* Table Section */}
            <div className={BILLING_STYLES.layout.tableContainer}>
              <DataTable
                data={paginatedData}
                columns={dynamicBillingColumns}
                className="billing-table"
                responsive={true}
              />
            </div>
          </div>
          
          {filteredData.length > 0 && (
            <div className="mt-6 px-4">
              <BillingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}
    </DashboardPageContainer>
  );
}
