export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  // biome-ignore lint/suspicious/noExplicitAny: Posts are typically a text string, but we can't guarantee that due to the way MDXRemote handles posts.
  [key: string]: any;
}


export interface FilterCategory {
  title: string;
  tags: string[];
}


export type NeighborPosts = {
  next?: PostData,
  prev?: PostData,
}