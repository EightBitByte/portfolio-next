import type { FilterCategory } from "@/utils/types";
import FilterButton from "./filter-button";

interface FilterListProps {
  categories: FilterCategory[];
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export default function FilterList({
  categories,
  activeFilters,
  onFilterToggle,
}: FilterListProps) {
  return (
    <div className="pl-4 border-l w-2xs">
      {categories.map((category) => (
        <div key={category.title}>
          <h1 className="text-xl font-bold mb-1 select-none">
            {category.title}
          </h1>
          <div className="grid grid-cols-1 pl-2 gap-1 mb-2">
            {category.tags.map((filter) => (
              <FilterButton
                key={filter.title}
                title={filter.title}
                numPosts={filter.numPosts}
                isActive={activeFilters.includes(filter.title)}
                onToggle={() => onFilterToggle(filter.title)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
