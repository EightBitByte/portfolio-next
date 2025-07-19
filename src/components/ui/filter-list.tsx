import type { FilterCategory } from "@/utils/types";
import FilterButton from "./filter-button";

interface FilterListProps {
  categories: FilterCategory[];
}

export default function FilterList({categories} : FilterListProps) {
  return (
    <div className="pl-4 border-l w-2xs">
      {categories.map((category) => 
        <div key={category.title}>
          <h1 className="text-xl font-bold mb-1">{category.title}</h1>
          <div className="grid grid-cols-1 pl-2 gap-1 mb-2">
            {category.tags.map((filter) =>
              <FilterButton
                key={filter}
                title={filter}
                numPosts={0}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}