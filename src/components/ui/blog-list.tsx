'use client';

import { useState, useMemo } from 'react';
import type { PostData, FilterCategory } from '@/utils/types';
import BlogEntry from "@/components/ui/blog-entry";
import FilterList from '@/components/ui/filter-list';

interface BlogListProps {
  posts: PostData[];
  categories: FilterCategory[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  function handleFilterToggle(filter: string) {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  }

  const filteredPosts = activeFilters.length === 0
    ? posts
    : posts.filter(post =>
        activeFilters.every(filter => post.tags.includes(filter))
      );

  const dynamicCategories = useMemo(() => {
    return categories.map(category => ({
      ...category,
      tags: category.tags.map(tag => {
        // From the currently visible posts, count how many also have this tag.
        const count = filteredPosts.filter(post => post.tags.includes(tag.title)).length;
        return { ...tag, numPosts: count };
      })
    }));
  }, [categories, filteredPosts]);

  return (
    <div className="flex flex-row px-24 flex-wrap gap-12 justify-center">
      {filteredPosts.map((post) =>
        <BlogEntry
          key={post.slug}
          title={post.title}
          slug={post.slug}
          prevImgSrc={post.img}
          alt={post.imgAlt}
          shortDesc={post.shortDesc}
          createdAt={new Date(post.date)}
        />
      )}
      <FilterList
        categories={dynamicCategories}
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
      />
    </div>
  );
}