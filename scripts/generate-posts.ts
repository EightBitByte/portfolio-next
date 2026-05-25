/**
 * Build-time script: generates src/generated/posts-manifest.json
 * from all .mdx files in src/app/content.
 *
 * Run this before `next build` / `opennextjs-cloudflare build` so that
 * the Cloudflare Worker never needs fs.readdirSync at runtime.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const postsDirectory = path.join(root, "src/app/content");
const outputDir = path.join(root, "src/generated");
const outputFile = path.join(outputDir, "posts-manifest.json");

const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

const posts = fileNames.map((fileName) => {
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
      shortDesc: string;
      img: string;
      imgAlt: string;
      tags: string[];
      author: string;
    }),
  };
});

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), "utf8");

console.log(`✅ Generated posts manifest with ${posts.length} posts → ${outputFile}`);
