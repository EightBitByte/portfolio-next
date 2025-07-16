import fs from 'fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/app/content');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  // biome-ignore lint/suspicious/noExplicitAny: Posts are typically a text string, but we can't guarantee that.
  [key: string]: any;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
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
        }),
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}