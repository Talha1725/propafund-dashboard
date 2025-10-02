import { FilterGroup } from "@/types/filter";

export const getAcademyFilterGroups = (): FilterGroup[] => [
  {
    id: "selectedDifficulty",
    label: "Difficulty",
    type: "radio",
    options: [
      { id: "all", label: "All Levels" },
      { id: "beginner", label: "Beginner" },
      { id: "intermediate", label: "Intermediate" },
      { id: "advanced", label: "Advanced" }
    ]
  },
  {
    id: "selectedType",
    label: "Type",
    type: "radio",
    options: [
      { id: "all", label: "All Types" },
      { id: "course", label: "Course" },
      { id: "tutorial", label: "Tutorial" },
      { id: "guide", label: "Guide" }
    ]
  },
  {
    id: "selectedFeatured",
    label: "Featured",
    type: "checkbox",
    options: [
      { id: "featured", label: "Featured Only" }
    ]
  }
];
