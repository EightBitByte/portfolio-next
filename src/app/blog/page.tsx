import { Posts } from '@/utils/posts'
import BlogEntry from "@/components/ui/blog-entry";
import FilterList from '@/components/ui/filter-list';

export default function Blog() {
  const posts = new Posts();

  // const tagsMap = getTags(allPostsData);

  return (
    <div className="flex flex-row px-24 flex-wrap gap-12 justify-center">
      {posts.getPosts().map((post) => 
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
      categories={posts.getTagCategories()}
    />
    </div>

  )
}