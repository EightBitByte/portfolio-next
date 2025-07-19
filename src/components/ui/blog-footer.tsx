import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toTitleCase } from "@/utils/utils";

interface BlogFooterProps {
  prevSlug: string | undefined,
  nextSlug: string | undefined,
}

export default function BlogFooter({
  prevSlug,
  nextSlug,
} : BlogFooterProps) {
  return (
    <div className="w-full flex flex-row justify-between mt-12 mb-8">
      {prevSlug && <Link href={`/blog/posts/${prevSlug}`} className="flex flex-row items-center gap-2">
        <ArrowLeft/>
        <p>{toTitleCase(prevSlug.replaceAll('-', ' '))}</p>
      </Link>}
      {!prevSlug && <div/>}
      {nextSlug && <Link href={`/blog/posts/${nextSlug}`} className="flex flex-row items-center gap-2">
        <p>{toTitleCase(nextSlug.replaceAll('-', ' '))}</p>
        <ArrowRight/>
      </Link>}
      {!nextSlug && <div/>}
    </div>
  )
}