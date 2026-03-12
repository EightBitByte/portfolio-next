import type { FilterCategory } from "@/utils/types";
import FilterButton from "./filter-button";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox"

interface FilterListProps {
  categories: FilterCategory[];
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export function DesktopFilterList({
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

export function MobileFilterList({
  categories,
  activeFilters,
  onFilterToggle
}: FilterListProps) {
  return (
    <Combobox items={categories}>
      <ComboboxInput placeholder="Filter by tags" />
      <ComboboxContent>
        <ComboboxEmpty>No tags found.</ComboboxEmpty>
        <ComboboxList>
          {group => (
            <ComboboxGroup key={group.title} items={group.tags}>
              <ComboboxLabel>{group.title}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item.title} value={item.title}>
                    {item.title}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}