import BlogList from "@/components/ui/blog-list";
import { posts } from "@/utils/posts";

export default function Blog() {
  const allPosts = posts.getPosts();
  const allCategories = posts.getTagCategories();

  return <BlogList posts={allPosts} categories={allCategories} />;
}
