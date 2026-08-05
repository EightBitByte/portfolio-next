import type { MDXComponents } from "mdx/types";
import {FancyImage} from "./components/ui/fancy-image";
import type { ImageProps } from "next/image";
import {StatLink} from "./components/ui/stat-link";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <FancyImage {...{props}}/>,
    h1: ({ children }) =>
      <h1 className="text-2xl font-bold mt-12 mb-2">{children}</h1>,
    h2: ({ children }) => 
      <h2 className="text-xl font-bold mt-12 mb-2">{children}</h2>,
    p: ({ children }) =>
      <p className="mb-4 text-lg leading-8">{children}</p>,
    a: ({ children, href }) =>
      <StatLink href={href} className="underline font-bold text-foreground">
        {children}
      </StatLink>,
    blockquote: ({ children }) =>
      <blockquote className="pl-4 border-l-4 italic mb-2 text-foreground/70">
        {children}
      </blockquote>,
    ol: ({ children }) =>
      <ol className="pl-8">{children}</ol>,
    li: ({ children }) => <li className="list-decimal pl-2">{children}</li>,
    code: ({ children }) => 
      <code className="text-md text-background text-wrap bg-foreground/90 px-2 rounded-md">{children}</code>,
    pre: ({ children }) => 
      <pre className="bg-foreground/10 px-4 py-6 rounded-xl">{children}</pre>,
    ...components,
  };
}
