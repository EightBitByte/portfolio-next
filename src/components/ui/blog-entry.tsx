"use client";

import Image from "next/image";
import { formatDate, toTitleCase } from "@/utils/utils";
import { useState } from "react";
import { cn } from "@/utils/utils";

export interface BlogEntryProps {
  title: string;
  slug: string;
  prevImgSrc: string;
  alt: string;
  shortDesc: string;
  createdAt: Date;
  tags?: string[];
  variant: "full" | "simplified";
}

export default function BlogEntry({
  title,
  slug,
  prevImgSrc,
  alt,
  shortDesc,
  createdAt,
  tags,
  variant,
}: BlogEntryProps) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <a
      className={cn(
        variant === "full" && "md:w-sm md:border-0 md:pb-0 w-full flex flex-col gap-2 border-b-2 pb-8 transition-opacity duration-200 h-fit",
        variant === "simplified" && "flex flex-row items-center gap-4 w-full border-b border-foreground/20 py-4 first:pt-0 last:border-0 transition-opacity duration-200",
      )}
      href={`blog/posts/${slug}`}
    >
      <div className={cn("relative shrink-0 rounded-md overflow-hidden",
        variant === "simplified" && "w-16 h-16",
        variant === "full" && "w-full h-48",
      )}>
        {imgLoading && (
          <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse z-10" />
        )}
        <Image
          src={prevImgSrc}
          fill
          alt={alt}
          unoptimized
          onLoad={() => setImgLoading(false)}
          className={cn(
            "w-full h-full rounded-lg object-cover transition-opacity duration-300",
            imgLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      <div
        className={cn("grid grid-cols-1 gap-1",
          variant === "simplified" && "flex flex-col",
        )}
      >
        <h1 className="md:text-2xl text-lg font-bold">
          {title}
        </h1>
        <div className="flex md:gap-2 gap-2">
          <h2 className="md:text-lg text-md pr-2">
            {formatDate(createdAt)}
          </h2>
          {variant === "simplified" && tags && tags.map((tag) =>
            <div className="rounded-2xl border border-foreground/50 w-fit h-fit md:py-0.5 md:px-4 px-2 text-center md:text-md text-sm" key={tag}>
              {toTitleCase(tag
                  .substring(tag.indexOf("/") + 1)
                  .replaceAll(/-./g, (m) => ` ${m[1].toUpperCase()}`)
                )
              }
            </div>)
          }
        </div>
        {variant === "full" && <p className="text-lg leading-snug">{shortDesc}</p>}
      </div>
    </a>
  );
}
