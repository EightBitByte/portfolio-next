import type { MDXComponents } from "mdx/types";
import {FancyImage} from "./components/ui/fancy-image";
import type { ImageProps } from "next/image";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <FancyImage {...{props}}/>,
    h1: ({ children }) =>
      <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
    h2: ({ children }) => 
      <h2 className="text-xl font-bold mt-4 mb-4">{children}</h2>,
    p: ({ children }) =>
      <p className="mb-4 text-lg leading-8">{children}</p>,
    a: ({ children, href }) =>
      <a href={href} className="underline font-bold text-foreground">
        {children}
      </a>,
    blockquote: ({ children }) =>
      <blockquote className="pl-4 border-l-4 italic mb-2 text-foreground/60">
        {children}
      </blockquote>,
    ol: ({ children }) =>
      <ol className="pl-8">{children}</ol>,
    li: ({ children }) => <li className="list-decimal pl-2">{children}</li>,
    code: ({ children }) => 
      <code className="text-md text-foreground/70 text-wrap">{children}</code>,
    pre: ({ children }) => 
      <pre className="bg-foreground/10 px-4 py-6 rounded-xl">{children}</pre>,
    ...components,
  };
}
