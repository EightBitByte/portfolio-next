'use client';

import { useState } from 'react';
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
    console.log("toggle filter ", filter);

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
        categories={categories}
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
      />
    </div>
  );
}