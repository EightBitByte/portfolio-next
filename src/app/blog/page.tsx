import { Posts } from '@/utils/posts'
import BlogList from '@/components/ui/blog-list';

export default function Blog() {
  const posts = new Posts();
  const allPosts = posts.getPosts();
  const allCategories = posts.getTagCategories();

  return <BlogList posts={allPosts} categories={allCategories} />;
}