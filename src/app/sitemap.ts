import type { MetadataRoute } from "next";
import { posts } from "@/utils/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = posts.getPosts();

  const blogs = allPosts.map((post) => ({
    url: `https://jacobmoy.com/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString().split("T")[0],
  }));

  const routes = ["", "/blog", "/quick-links"].map((route) => ({
    url: `https://jacobmoy.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
