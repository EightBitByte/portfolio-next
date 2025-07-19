import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { FilterCategory, NeighborPosts, PostData } from './types';
import { toTitleCase } from './utils';

const postsDirectory = path.join(process.cwd(), 'src/app/content');

export class Posts {
  private posts: PostData[] = [];
  private tags: string[] = [];
  private tagCategories: string[] = [];

  constructor() {
    this.loadPosts();
  }

  private loadPosts(): void {
    const fileNames = fs.readdirSync(postsDirectory);
    const uniqueTagCategories = new Set<string>();
    const uniqueTags = new Set<string>();
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
          slug,
          ...(matterResult.data as {
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
    this.posts.forEach(post => 
      post.tags.forEach(tag => {
        uniqueTagCategories.add(tag.split('/')[0])
        uniqueTags.add(tag)
      })
    );

    this.tags = uniqueTags.keys().toArray();
    this.tagCategories = uniqueTagCategories.keys().toArray();
  }

  /**
   * Returns all posts ordered by date.
   */
  public getPosts(): PostData[] {
    return this.posts
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  /**
   * Returns the posts with the tag specified, sorted by date
   */
  public getPostsByTag(tag: string): PostData[] {
    return this.posts
      .filter(post => post.tags.includes(tag))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  private getTagsByCategory(category: string): string[] {
    return this.tags
      .filter(tag => tag.startsWith(category))
      .map(tag => 
          toTitleCase(tag.substring(tag.indexOf('/') + 1).replaceAll('-', ' '))
      );
  }

  public getTagCategories(): FilterCategory[] {
    return this.tagCategories.map((category) => ({
        title: toTitleCase(category),
        tags: this.getTagsByCategory(category)
    }));
  }

  public getNeighborPosts(slug: string): NeighborPosts {
    const postIdx = this.posts.findIndex((post) => post.slug === slug);

    const nextPost = this.posts.at(postIdx + 1);
    const prevPost = this.posts.at(postIdx === 0 ? this.posts.length : postIdx - 1);

    console.log("posts: ", this.posts)
    console.log("current idx: ", postIdx)

    return {next: nextPost, prev: prevPost};
  }
}