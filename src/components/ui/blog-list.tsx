"use client";

import { cn } from "@/utils/utils";
import { useMemo, useState } from "react";
import { DesktopFilterList } from "@/components/ui/filter-list";
import type { FilterCategory, PostData } from "@/utils/types";
import { Grid2X2, List } from "lucide-react";
import BlogEntry from "./blog-entry";

interface BlogListProps {
  posts: PostData[];
  categories: FilterCategory[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSimplified, setIsSimplified] = useState<boolean>(true);

  function handleFilterToggle(filter: string) {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  }

  const filteredPosts =
    activeFilters.length === 0
      ? posts
      : posts.filter((post) =>
        activeFilters.every((filter) => post.tags.includes(filter)),
      );

  const dynamicCategories = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      tags: category.tags.map((tag) => {
        // From the currently visible posts, count how many also have this tag.
        const count = filteredPosts.filter((post) =>
          post.tags.includes(tag.title),
        ).length;
        return { ...tag, numPosts: count };
      }),
    }));
  }, [categories, filteredPosts]);

  return (
    <div className="flex flex-col items-center px-4 md:px-0 gap-6">
      {/* Layout toggle + filter row */}
      <div className="flex items-center justify-between w-full md:w-[51rem]">
        <p className="text-sm text-foreground/50">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setIsSimplified((v) => !v)}
          aria-label={isSimplified ? "Switch to full layout" : "Switch to simplified layout"}
          className="flex justify-center items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors duration-150"
        >
          {isSimplified ? <Grid2X2 size={18} /> : <List size={18} />}
          <p className="text-center h-fit">
            {isSimplified ? "Grid" : "List"}
          </p>
        </button>
      </div>

      {/* Posts + sidebar */}
      <div className="flex flex-row justify-center items-start gap-12">
        <div className={cn(
          !isSimplified && "grid grid-cols-1 w-fit gap-12 md:grid-cols-2",
          isSimplified && "flex flex-col w-full md:w-[51rem]"
        )}>
          {posts.map((post) => (
            <BlogEntry
              key={post.slug}
              title={post.title}
              slug={post.slug}
              prevImgSrc={post.img}
              alt={post.imgAlt}
              shortDesc={post.shortDesc}
              createdAt={new Date(post.date)}
              variant={isSimplified ? "simplified" : "full"}
              tags={post.tags}
            />
          ))}
        </div>
        <div className="h-fit sticky top-24 w-0 xl:block hidden">
          <DesktopFilterList
            categories={dynamicCategories}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
          />
        </div>
      </div>
    </div>
  );
}
