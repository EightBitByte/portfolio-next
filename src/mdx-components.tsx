import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { AspectRatio } from './app/components/ui/aspect-ratio'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <AspectRatio ratio={16/9}>
        <Image
          className='w-full rounded-lg object-cover'
          fill
          {...(props as ImageProps)}
        />
      </AspectRatio>
    ),
    ...components,
  }
}