import { promises as fs } from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import matter from 'gray-matter';
import rehypeUnwrapImages from 'rehype-unwrap-images'
import BlogFooter from '@/components/ui/blog-footer'
import remarkGfm from 'remark-gfm'
import { Posts } from '@/utils/posts'


type PostMetadata = {
  title: string,
  date: string,
  tags: string[],
  author?: string,
  description?: string,
}


type Post = {
  content: string,
  meta: PostMetadata
}


async function getPostBySlug(slug: string): Promise<Post | null> {
  const contentDirectory = path.join(process.cwd(), 'src/app/content')
  const filePath = path.join(contentDirectory, `${slug}.mdx`)

  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(fileContents);
    return { content: content, meta: data as PostMetadata }
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const posts = new Posts();
  const {prev, next} = posts.getNeighborPosts(slug);

  // Get the components from mdx-components.tsx file
  const components = useMDXComponents({})

  return (
    <main className="max-w-3xl m-auto">
      <h1 className={`${post.meta.title.length <= 20 ? "text-4xl" : "text-3xl"} font-bold dark:text-zinc-300`}>{post.meta.title}</h1>
      <h2 className="text-xl mb-2 dark:text-zinc-400">{post.meta.date} • {post.meta.author}</h2>
      <MDXRemote 
        source={post.content} 
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeUnwrapImages]
          }
        }}
      />
      {(prev || next) &&
        <BlogFooter
        prevSlug={prev?.slug}
        nextSlug={next?.slug}
      />}
      <p className="mb-2 text-zinc-500 dark:text-zinc-400">jacobmoy.com • {new Date().getFullYear()}</p>
    </main>
  )
}
 
export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'src/app/content')
  const filenames = await fs.readdir(contentDirectory)
  const mdxFiles = filenames.filter((file) => file.endsWith('.mdx'))
  return mdxFiles.map((file) => ({
    slug: file.replace('.mdx', ''),
  }))
}
 
export const dynamicParams = false