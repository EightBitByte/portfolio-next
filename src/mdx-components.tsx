import type { MDXComponents } from "mdx/types";
import {FancyImage} from "./components/ui/fancy-image";
import type { ImageProps } from "next/image";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <FancyImage props={props}/>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mt-6 mb-4 dark:text-zinc-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-4 mb-4 dark:text-zinc-200">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-lg leading-8 dark:text-zinc-300">{children}</p>
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
      <code className="text-md text-foreground/60 text-wrap">{children}</code>
    ),
    ...components,
  };
}
