"use client";

import { useState, useMemo } from "react";
import FilterDropdown from "@/components/common/filter-dropdown";
import CertificateTabs from "@/components/common/certificate-tabs";
import VideoGrid from "@/components/academy-components/video-grid";
import Pagination from "@/components/academy-components/pagination";
import { VIDEOS, COURSE_TABS } from "@/lib/data/academy";
import { CourseTabId, AcademyFilterState } from "@/types/academy";
import { getAcademyFilterGroups } from "@/lib/utils/academy-filters";
import IconFilter from "@/public/assets/filter-icon.svg";

export default function Academy() {
  const [activeTab, setActiveTab] = useState<CourseTabId>("forex-trading");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filterState, setFilterState] = useState<AcademyFilterState>({
    selectedDifficulty: "all",
    selectedType: "all",
    selectedFeatured: false,
  });

  const { filteredVideos, totalPages } = useMemo(() => {
    const filtered = VIDEOS.filter((video) => {
      if (video.category !== activeTab) return false;
      if (filterState.selectedDifficulty !== "all" && video.difficulty !== filterState.selectedDifficulty) {
        return false;
      }
      if (filterState.selectedType !== "all" && video.type !== filterState.selectedType) {
        return false;
      }
      if (filterState.selectedFeatured && !video.featured) {
        return false;
      }
      return true;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVideos = filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredVideos: paginatedVideos,
      totalPages,
    };
  }, [activeTab, filterState, currentPage, itemsPerPage]);

  const handleFilterChange = (groupId: string, value: string | string[] | boolean) => {
    setFilterState((prev) => ({
      ...prev,
      [groupId]: value,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilterState({
      selectedDifficulty: "all",
      selectedType: "all",
      selectedFeatured: false,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as CourseTabId);
  };

  return (
    <div className="p-3 md:p-6 md:pb-4 space-y-5 xl:h-[85vh] overflow-auto relative">
    <div className="h-fit overflow-hidden pb-10 md:pb-0">
        <div className="space-y-6">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <CertificateTabs
                tabs={COURSE_TABS.map((tab) => ({
                  id: tab.id,
                  label: tab.label,
                }))}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            <FilterDropdown
              filterGroups={getAcademyFilterGroups()}
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onClearAllFilters={clearAllFilters}
              triggerIcon={IconFilter}
            />
          </div>
          <VideoGrid videos={filteredVideos} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        </div>
    </div>
    </div>
  );
}
