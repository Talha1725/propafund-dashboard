export type CourseTabId = "forex-trading" | "crypto-trading";

export interface CourseTab {
  id: CourseTabId;
  label: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: CourseTabId;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'course' | 'tutorial' | 'guide';
  featured: boolean;
}

export interface AcademyFilterState {
  selectedDifficulty: string;
  selectedType: string;
  selectedFeatured: boolean;
  [key: string]: string | string[] | boolean;
}

export interface VideoGridProps {
  videos: Video[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}
