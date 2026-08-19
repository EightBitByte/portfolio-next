import { posts } from "@/utils/posts";
import BlogEntry from "@/components/ui/blog/blog-entry";

export default function HomepageBlogList() {
  const allPosts = posts.getPosts();

  return (
    allPosts.slice(0, 3).map((post) => (
      <BlogEntry
        key={post.slug}
        title={post.title}
        slug={post.slug}
        prevImgSrc={post.img}
        alt={post.imgAlt}
        shortDesc={post.shortDesc}
        createdAt={new Date(post.date)}
        variant="simplified"
        tags={post.tags}
      />
    ))
  )
}
