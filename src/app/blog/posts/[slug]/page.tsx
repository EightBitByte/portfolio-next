import { promises as fs } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import BlogFooter from "@/components/ui/blog-footer";
import { getMDXComponents } from "@/mdx-components";
import { posts } from "@/utils/posts";
import rehypeSlug from "rehype-slug";
import BlogPostTracker from "@/components/blog-post-tracker";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = posts.getPost(slug);

  if (!post) {
    notFound();
  }

  const { prev, idx, next } = posts.getNeighborPosts(slug);

  // Get the components from mdx-components.tsx file
  const components = getMDXComponents({});

  return (
    <main className="max-w-3xl m-auto">
      <BlogPostTracker postId={idx}/>
      <h1
        className={`${post.title.length <= 20 ? "text-4xl" : "text-3xl"} font-bold dark:text-zinc-300`}
      >
        {post.title}
      </h1>
      <h2 className="text-xl mb-2 dark:text-zinc-400">
        {post.date} • {post.author}
      </h2>
      <MDXRemote
        source={post.content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeUnwrapImages, rehypeSlug],
          },
        }}
      />
      {(prev || next) && (
        <BlogFooter prevSlug={prev?.slug} nextSlug={next?.slug} />
      )}
      <p className="mb-2 text-zinc-500 dark:text-zinc-400">
        jacobmoy.com • {new Date().getFullYear()}
      </p>
    </main>
  );
}

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/app/content");
  const filenames = await fs.readdir(contentDirectory);
  const mdxFiles = filenames.filter((file) => file.endsWith(".mdx"));
  return mdxFiles.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export const dynamicParams = false;
