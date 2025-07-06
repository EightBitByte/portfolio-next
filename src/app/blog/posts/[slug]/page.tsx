import { promises as fs } from 'fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import matter from 'gray-matter';
import rehypeUnwrapImages from 'rehype-unwrap-images'


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

  // Get the components from mdx-components.tsx file
  const components = useMDXComponents({})

  return (
    <main>
      <h1>{post.meta.title}</h1>
      <MDXRemote 
        source={post.content} 
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeUnwrapImages]
          }
        }}
      />
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