import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { AspectRatio } from "./components/ui/aspect-ratio";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <AspectRatio ratio={16 / 9} className="mb-4">
        <Image
          className="w-full rounded-lg object-cover"
          fill
          {...(props as ImageProps)}
        />
      </AspectRatio>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mt-6 mb-2 dark:text-zinc-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-4 mb-2 dark:text-zinc-200">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mb-2 text-lg leading-8 dark:text-zinc-300">{children}</p>
    ),
    a: ({ children, href }) => (
      <a href={href} className="underline font-bold dark:text-zinc-200">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pl-4 border-l-4 italic mb-2">
        {children}
      </blockquote>
    ),
    ol: ({ children }) => (
      <ol className="pl-8 dark:text-zinc-200">{children}</ol>
    ),
    li: ({ children }) => <li className="list-decimal pl-2">{children}</li>,
    code: ({ children }) => (
      <code className="text-md dark:text-zinc-200">{children}</code>
    ),
    ...components,
  };
}
