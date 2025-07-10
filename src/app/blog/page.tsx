import { getSortedPostsData } from '@/app/utils/posts'
import BlogEntry from "../components/ui/blog-entry";

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="flex flex-row px-24 flex-wrap gap-12 justify-center">
      {allPostsData.map((post) => 
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
    </div>
  )
}