import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FilterCategory, NeighborPosts, PostData, Tag } from "./types";
import { toTitleCase } from "./utils";

const postsDirectory = path.join(process.cwd(), "src/app/content");

export class Posts {
  private posts: PostData[] = [];
  private tagCount: Map<string, number> = new Map<string, number>();
  private tagCategories: string[] = [];

  constructor() {
    this.loadPosts();
  }

  private loadPosts(): void {
    const fileNames = fs.readdirSync(postsDirectory);
    const uniqueTagCategories = new Set<string>();
    const tagCount = new Map<string, number>();
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { content, data } = matter(fileContents);

        return {
          slug,
          content,
          ...(data as {
            title: string;
            date: string;
            description: string;
            image: string;
            imageAlt: string;
            tags: string[];
          }),
        };
      });

    // Sort posts by date
    this.posts = allPostsData.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });

    // Add all tags to the tag set
    this.posts.forEach((post) =>
      post.tags.forEach((tag) => {
        uniqueTagCategories.add(tag.split("/")[0]);
        tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
      }),
    );

    this.tagCount = tagCount;
    this.tagCategories = Array.from(uniqueTagCategories.keys());
  }

  /**
   * Returns all posts ordered by date.
   */
  public getPosts(): PostData[] {
    return this.posts.sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Returns the posts with the tag(s) specified, sorted by date
   */
  public getPostsByTag(activeFilters: string[]): PostData[] {
    return this.posts
      .filter((post) =>
        activeFilters.every((filter) => post.tags.includes(filter)),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  private getTagsByCategory(category: string): Tag[] {
    return Array.from(this.tagCount.keys())
      .filter((tag) => tag.startsWith(category))
      .map((tag) => ({
        title: tag,
        numPosts: this.tagCount.get(tag) ?? 0,
      }));
  }

  public getTagCategories(): FilterCategory[] {
    return this.tagCategories.map((category) => ({
      title: toTitleCase(category),
      tags: this.getTagsByCategory(category),
    }));
  }

  public getNeighborPosts(slug: string): NeighborPosts {
    const postIdx = this.posts.findIndex((post) => post.slug === slug);

    const nextPost = this.posts.at(postIdx + 1);
    const prevPost = this.posts.at(
      postIdx === 0 ? this.posts.length : postIdx - 1,
    );

    return { next: nextPost, idx: postIdx, prev: prevPost };
  }

  public getPost(slug: string): PostData | undefined {
    return this.posts.find((post) => post.slug === slug);
  }

  public getNumPosts(): number {
    return this.posts.length;
  }
}

export const posts = new Posts();
